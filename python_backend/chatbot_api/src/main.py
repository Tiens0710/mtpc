import asyncio
import base64
import json
import logging
import os
import pathlib

from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from gemini_live import GeminiLive
from hybrid_rag import HybridRAG
from response_cache import ResponseCache
from google.genai import types as genai_types

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define directories
# Cố gắng tìm thư mục gốc chứa dataset
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__)) # chatbot_api/src
CHATBOT_API_DIR = os.path.dirname(CURRENT_DIR) # chatbot_api

# Ưu tiên tìm trong chatbot_api/corpus trước (để tương thích Docker)
CORPUS_DIR = os.path.join(CHATBOT_API_DIR, "corpus")
if not os.path.exists(CORPUS_DIR):
    os.makedirs(CORPUS_DIR, exist_ok=True)

# Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = os.getenv("MODEL", "gemini-3.1-flash-live-preview")

# Initialize HybridRAG for MTPC

try:
    # Trỏ đúng vào thư mục chroma_db nằm trong chatbot_api (nơi user vừa train)
    chroma_path = os.path.join(CHATBOT_API_DIR, "chroma_db")

    rag = HybridRAG(
        gemini_api_key=GEMINI_API_KEY,
        chroma_path=chroma_path
    )
    
    # Danh sách các file cần nạp (MTPC Knowledge Base)
    # Tìm trong folder data/mtpc_knowledge_base
    PYTHON_BACKEND_DIR = os.path.dirname(CHATBOT_API_DIR)
    PROJECT_ROOT = os.path.dirname(PYTHON_BACKEND_DIR)
    DATA_DIR = os.path.join(PROJECT_ROOT, "data", "mtpc_knowledge_base")
    
    datasets = [
        os.path.join(DATA_DIR, "mtpc_data_structured.json"),
        os.path.join(DATA_DIR, "intent_mapping.jsonl"),
    ]
    
    # Kiểm tra file tồn tại trước khi nạp
    existing_datasets = [d for d in datasets if os.path.exists(d)]
    logger.info(f"Found {len(existing_datasets)} dataset files to load.")
    
    if not existing_datasets:
        logger.error("No dataset files found! Please check paths.")
        rag = None
    else:
        rag.load_datasets(existing_datasets)
        logger.info("MTPC HybridRAG initialized successfully.")
except Exception as e:
    import traceback
    logger.error(f"Failed to initialize HybridRAG: {e}")
    logger.error(traceback.format_exc()) # In toàn bộ lỗi ra để xem bị ở đâu
    rag = None

cache = ResponseCache()
cache.clear()

# ── Conversation Memory ────────────────────────────────────────────────────────
from collections import deque
from typing import Dict

class ConversationMemory:
    """Lưu lịch sử hội thoại để AI tham chiếu ngữ cảnh trước đó."""
    def __init__(self, max_turns: int = 6):
        self.max_turns = max_turns
        self._history: deque = deque(maxlen=max_turns * 2)

    def add_user(self, text: str):
        self._history.append({"role": "user", "text": text.strip()})

    def add_assistant(self, text: str):
        if text.strip():
            self._history.append({"role": "assistant", "text": text.strip()})

    # Các câu ngắn mơ hồ cần tham chiếu ngữ cảnh trước
    AMBIGUOUS_PHRASES = {
        "giới thiệu nhé", "giới thiệu đi", "kể thêm đi", "nói thêm đi",
        "hướng dẫn tôi", "hướng dẫn đi", "hướng dẫn nhé", "ok", "oke", "okay",
        "được", "ừ", "ừm", "vậy à", "thế à", "tiếp tục", "tiếp đi", "tiếp nhé",
        "có không", "bao nhiêu", "giá bao nhiêu", "dùng như thế nào",
        "sao dùng vậy", "cách dùng", "link đâu", "cho link đi",
    }

    def _is_ambiguous(self, msg: str) -> bool:
        """Kiểm tra câu có phải câu ngắn mơ hồ cần tham chiếu ngữ cảnh không."""
        normalized = msg.strip().lower().rstrip("!?.ạ")
        return normalized in self.AMBIGUOUS_PHRASES or len(msg.strip()) <= 25

    def _get_last_assistant_topic(self) -> str:
        """Lấy nội dung câu trả lời cuối của assistant để làm anchor chủ đề."""
        for turn in reversed(self._history):
            if turn["role"] == "assistant":
                # Trả về 200 ký tự đầu của câu trả lời cuối
                return turn["text"][:200]
        return ""

    def build_context_prefix(self, current_user_msg: str) -> str:
        """Tạo đoạn context đính kèm vào đầu tin nhắn gửi Gemini."""
        if not self._history:
            return current_user_msg

        lines = ["[LỊCH SỬ HỘI THOẠI — ĐỌC KỸ TRƯỚC KHI TRẢ LỜI]"]
        for turn in self._history:
            label = "Người dùng" if turn["role"] == "user" else "Duky AI"
            lines.append(f'{label}: "{turn["text"][:300]}"')
        lines.append("")

        # Nếu câu hiện tại mơ hồ, thêm instruction cứng
        if self._is_ambiguous(current_user_msg):
            last_topic = self._get_last_assistant_topic()
            lines.append(
                f'[HƯỚNG DẪN XỬ LÝ]: Người dùng vừa nói "{current_user_msg}" — ' +
                f'đây là câu TIẾP NỐI chủ đề đang nói. ' +
                f'Chủ đề đang nói là: "{last_topic}". ' +
                f'KHÔNG hỏi lại, KHÔNG giới thiệu bản thân. Hãy tiếp tục chủ đề đó ngay.'
            )
        else:
            lines.append(f"[Câu hỏi hiện tại]: {current_user_msg}")

        return "\n".join(lines)

    def clear(self):
        self._history.clear()

# Lưu memory theo websocket session
_ws_memory_store: dict = {}

# ── Persistent Session Manager (cho SSE) ─────────────────────────────────────
import uuid
import time

class PersistentSession:
    """Giữ một Gemini Live session sống liên tục. Frontend gửi text qua send_message()."""
    def __init__(self, session_id: str, voice_name: str):
        self.session_id = session_id
        self.voice_name = voice_name
        self.last_active = time.time()
        self.audio_input_queue = asyncio.Queue()
        self.text_input_queue = asyncio.Queue()
        self.video_input_queue = asyncio.Queue()
        self._response_queue: asyncio.Queue = asyncio.Queue()
        self._session_task: asyncio.Task = None
        self._reply_parts: list = []
        self.memory = ConversationMemory(max_turns=8)

    async def start(self):
        client = GeminiLive(
            api_key=GEMINI_API_KEY, model=MODEL, input_sample_rate=16000,
            tools=tools_config, tool_mapping=tool_mapping
        )
        async def audio_cb(data: bytes):
            b64 = base64.b64encode(data).decode()
            await self._response_queue.put({"type": "audio", "audio": b64})

        async def run():
            try:
                async for evt in client.start_session(
                    audio_input_queue=self.audio_input_queue,
                    text_input_queue=self.text_input_queue,
                    video_input_queue=self.video_input_queue,
                    audio_output_callback=audio_cb,
                    voice_name=self.voice_name,
                ):
                    if not evt:
                        continue
                    if evt.get("type") == "gemini" and evt.get("text"):
                        self._reply_parts.append(evt["text"])
                    elif evt.get("type") == "turn_complete":
                        full_reply = "".join(self._reply_parts).strip()
                        if full_reply:
                            self.memory.add_assistant(full_reply)
                        self._reply_parts.clear()
                    await self._response_queue.put(evt)
            except Exception as e:
                logger.error(f"PersistentSession {self.session_id} error: {e}")
                await self._response_queue.put({"type": "error", "error": str(e)})

        self._session_task = asyncio.create_task(run())
        logger.info(f"PersistentSession {self.session_id} started")

    async def send_message(self, text: str):
        self.last_active = time.time()
        self.memory.add_user(text)
        text_with_ctx = self.memory.build_context_prefix(text)
        await self.text_input_queue.put(text_with_ctx)

    async def iter_response(self):
        while True:
            evt = await self._response_queue.get()
            yield evt
            if evt.get("type") in ("turn_complete", "error"):
                break

    def is_alive(self):
        return self._session_task and not self._session_task.done()

    async def close(self):
        if self._session_task:
            self._session_task.cancel()
        logger.info(f"PersistentSession {self.session_id} closed")


class SessionManager:
    """Quản lý PersistentSession theo session_id, tự dọn session quá hạn."""
    def __init__(self, ttl_seconds: int = 1800):
        self._sessions: dict = {}
        self._ttl = ttl_seconds

    async def get_or_create(self, session_id: str, voice_name: str) -> PersistentSession:
        session = self._sessions.get(session_id)
        if session and session.is_alive():
            session.last_active = time.time()
            return session
        session = PersistentSession(session_id, voice_name)
        await session.start()
        self._sessions[session_id] = session
        logger.info(f"Created new persistent session: {session_id}")
        return session

    async def cleanup_expired(self):
        now = time.time()
        expired = [sid for sid, s in self._sessions.items()
                   if now - s.last_active > self._ttl or not s.is_alive()]
        for sid in expired:
            await self._sessions[sid].close()
            del self._sessions[sid]
            logger.info(f"Cleaned up expired session: {sid}")

session_manager = SessionManager(ttl_seconds=1800)

def search_mtpc_knowledge(query: str) -> str:
    """Tra cứu thông tin về Trường Trung cấp Miền Tây (MTPC): ngành học, học phí, tuyển sinh, liên hệ."""
    logger.info(f"Tool called: search_mtpc_knowledge with query: {query}")
    
    cached = cache.get(query)
    if cached:
        answer, _ = cached
        return answer
        
    if not rag:
        return "Xin lỗi, hệ thống tra cứu MTPC hiện đang bảo trì."
        
    # Tra cứu từ RAG
    context = rag.hybrid_rag(query, top_k=3)
    
    # Tạo câu trả lời có cấu trúc để AI hiểu rõ ngữ cảnh
    formatted_response = f"""Dưới đây là thông tin tri thức về '{query}' từ hệ thống Trường Trung cấp Miền Tây (MTPC):
{context}

Hãy sử dụng thông tin trên để trả lời người dùng một cách tự nhiên, thân thiện và đầy đủ nhất."""
    
    cache.set(query, answer=formatted_response, hits=[])
    return formatted_response

def navigate_to_page(url: str) -> str:
    """Tự động chuyển hướng người dùng đến một trang cụ thể trên website MTPC."""
    logger.info(f"Tool called: navigate_to_page with url: {url}")
    return f"Chuyển hướng thành công tới {url}"



def start_admission_registration(url: str = "https://www.mtpc.edu.vn/tuyen-sinh-/dang-ky-xet-tuyen.html") -> str:
    """Bắt đầu quá trình đăng ký xét tuyển trực tuyến cho người dùng."""
    logger.info(f"Tool called: start_admission_registration with url: {url}")
    return "Đã chuyển hướng người dùng tới trang đăng ký xét tuyển trực tuyến thành công."

tools_config = [
    genai_types.Tool(
        function_declarations=[
            genai_types.FunctionDeclaration(
                name="search_mtpc_knowledge",
                description="Tra cứu tri thức về Trường Trung cấp Miền Tây bao gồm: ngành học, học phí, thủ tục tuyển sinh và thông tin liên hệ.",
                parameters=genai_types.Schema(
                    type=genai_types.Type.OBJECT,
                    properties={
                        "query": genai_types.Schema(
                            type=genai_types.Type.STRING,
                            description="Câu hỏi hoặc từ khóa cần tìm kiếm"
                        )
                    },
                    required=["query"]
                )
            ),
            genai_types.FunctionDeclaration(
                name="navigate_to_page",
                description="Chuyển hướng người dùng đến một trang web cụ thể của trường MTPC. Chỉ gọi hàm này KHI người dùng đã đồng ý hoặc yêu cầu chuyển hướng.",
                parameters=genai_types.Schema(
                    type=genai_types.Type.OBJECT,
                    properties={
                        "url": genai_types.Schema(
                            type=genai_types.Type.STRING,
                            description="Đường dẫn URL đầy đủ của trang cần chuyển đến"
                        )
                    },
                    required=["url"]
                )
            ),
            genai_types.FunctionDeclaration(
                name="start_admission_registration",
                description="Gọi khi người dùng yêu cầu đăng ký nhập học hoặc xét tuyển trực tuyến.",
                parameters=genai_types.Schema(
                    type=genai_types.Type.OBJECT,
                    properties={
                        "url": genai_types.Schema(
                            type=genai_types.Type.STRING,
                            description="Đường link trang đăng ký (mặc định đã có)."
                        )
                    }
                )
            )
        ]
    )
]

tool_mapping = {
    "search_mtpc_knowledge": search_mtpc_knowledge,
    "navigate_to_page": navigate_to_page,
    "start_admission_registration": start_admission_registration
}


app = FastAPI(title="MTPC Chatbot API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "MTPC Chatbot API is running."}


@app.post("/api/chat/stream")
async def chat_stream_endpoint(request: Request):
    """
    SSE endpoint với Persistent Session.
    Frontend gửi: {"message": "...", "session_id": "...", "voice": "..."}
    - Nếu session_id chưa tồn tại hoặc đã hết hạn → tạo Gemini session mới
    - Nếu session_id đã có → dùng lại session cũ (ngữ cảnh được giữ nguyên)
    Response cuối trả về {"type": "done", "session_id": "...", "assistant_text": "..."}
    """
    data = await request.json()
    message = data.get("message", "")
    voice_name = data.get("voice", "Algenib")
    session_id = data.get("session_id") or str(uuid.uuid4())

    # Dọn session quá hạn (chạy ngầm, không block)
    asyncio.create_task(session_manager.cleanup_expired())

    # Lấy hoặc tạo persistent session
    session = await session_manager.get_or_create(session_id, voice_name)

    # Gửi message của user vào session
    await session.send_message(message)
    logger.info(f"SSE request: session={session_id}, msg={message[:60]}")

    async def sse_generate():
        try:
            async for evt in session.iter_response():
                type_ = evt.get("type")
                if type_ != "audio":
                    logger.info(f"SSE Event: {type_} | {evt.get('text', '')[:50]}")
                if type_ == "gemini":
                    yield "data: " + json.dumps({"type": "token", "text": evt["text"]}) + "\n\n"
                elif type_ == "audio":
                    yield "data: " + json.dumps({"type": "audio", "audio": evt["audio"]}) + "\n\n"
                elif type_ == "turn_complete":
                    yield "data: " + json.dumps({"type": "done", "session_id": session_id}) + "\n\n"
                    break
                elif type_ == "error":
                    yield "data: " + json.dumps({"type": "error", "error": evt.get("error")}) + "\n\n"
                    break
        except Exception as e:
            logger.error(f"SSE stream error: {e}")
            yield "data: " + json.dumps({"type": "error", "error": str(e)}) + "\n\n"
    return StreamingResponse(sse_generate(), media_type="text/event-stream")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    audio_input_queue = asyncio.Queue()
    video_input_queue = asyncio.Queue()
    text_input_queue = asyncio.Queue()

    # Tạo memory riêng cho session WebSocket này
    session_id = id(websocket)
    _ws_memory_store[session_id] = ConversationMemory(max_turns=6)
    memory = _ws_memory_store[session_id]

    async def audio_output_callback(data):
        await websocket.send_bytes(data)

    user_name = websocket.query_params.get("name", "Khách")
    user_credits = websocket.query_params.get("credits", "0")
    user_context = {"name": user_name, "credits": user_credits}

    gemini_client = GeminiLive(
        api_key=GEMINI_API_KEY, 
        model=MODEL, 
        input_sample_rate=16000,
        tools=tools_config,
        tool_mapping=tool_mapping,
        user_context=user_context
    )

    async def receive_from_client():
        try:
            while True:
                message = await websocket.receive()
                if message.get("bytes"):
                    await audio_input_queue.put(message["bytes"])
                elif message.get("text"):
                    text = message["text"]
                    try:
                        payload = json.loads(text)
                        p_type = payload.get("type")

                        if p_type == "image":
                            image_data = base64.b64decode(payload["data"])
                            # Bảo toàn mime_type từ frontend gửi lên
                            mime_type = payload.get("mime_type", "image/jpeg")
                            await video_input_queue.put({
                                "data": image_data, 
                                "mime_type": mime_type
                            })
                            continue
                        
                        elif p_type == "page_context":
                            memory.update_page_context(payload)
                            continue

                        elif p_type == "chat":
                            msg_text = payload.get("message", "")
                            # Xử lý context của Tool (Sync trạng thái)
                            tool_ctx = payload.get("tool_context")
                            if tool_ctx:
                                memory.update_tool_context(tool_ctx)
                            
                            text_with_context = memory.build_context_prefix(msg_text)
                            memory.add_user(msg_text)
                            await text_input_queue.put(text_with_context)
                            continue
                    except: pass
                    
                    # Fallback cho text thuần túy
                    text_with_context = memory.build_context_prefix(text)
                    memory.add_user(text)
                    await text_input_queue.put(text_with_context)
        except WebSocketDisconnect:
            logger.info("WebSocket disconnected")

    receive_task = asyncio.create_task(receive_from_client())
    voice_name = websocket.query_params.get("voice", "Algenib")
    assistant_reply_parts = []

    try:
        async for event in gemini_client.start_session(
            audio_input_queue=audio_input_queue,
            video_input_queue=video_input_queue,
            text_input_queue=text_input_queue,
            audio_output_callback=audio_output_callback,
            voice_name=voice_name
        ):
            if event:
                # Thu thập reply của assistant để lưu vào memory
                if event.get("type") == "gemini" and event.get("text"):
                    assistant_reply_parts.append(event["text"])
                elif event.get("type") == "turn_complete":
                    full_reply = "".join(assistant_reply_parts).strip()
                    if full_reply:
                        memory.add_assistant(full_reply)
                    assistant_reply_parts.clear()
                await websocket.send_json(event)
    except Exception as e:
        logger.error(f"Error in Gemini session: {e}")
    finally:
        receive_task.cancel()
        _ws_memory_store.pop(session_id, None)
        try: await websocket.close()
        except: pass

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)