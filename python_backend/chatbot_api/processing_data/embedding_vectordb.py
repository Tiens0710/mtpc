import argparse
import json
import time
import hashlib
from pathlib import Path
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
import chromadb

# ── Cấu hình ──────────────────────────────────────────────────────────────────
load_dotenv()

API_KEY        = os.getenv("GEMINI_API_KEY")
EMBED_MODEL    = "gemini-embedding-001"
DEFAULT_COLLECTION = "mtpc_knowledge"
DEFAULT_CHROMA_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "chroma_db")
BATCH_SIZE     = 30 
DELAY_SECONDS  = 10 

client = genai.Client(api_key=API_KEY)

# ── Helpers ──────────────────────────────────────────────────────────────────
def sanitize_metadata(meta: dict) -> dict:
    """Chỉ giữ lại các giá trị kiểu str, int, float, bool cho ChromaDB."""
    if not isinstance(meta, dict): return {}
    sanitized = {}
    for k, v in meta.items():
        if isinstance(v, (str, int, float, bool)): sanitized[k] = v
        elif isinstance(v, list): sanitized[k] = ", ".join(str(x) for x in v)
        elif v is not None: sanitized[k] = str(v)
    return sanitized

def get_stable_id(content: str, prefix: str = "doc") -> str:
    """Tạo ID ổn định dựa trên nội dung văn bản."""
    m = hashlib.md5()
    m.update(content.encode('utf-8'))
    return f"{prefix}_{m.hexdigest()}"

def embed_batch(texts: list[str]) -> list[list[float]]:
    """Gửi một batch text lên Gemini Embedding API."""
    response = client.models.embed_content(
        model=EMBED_MODEL,
        contents=texts,
        config=types.EmbedContentConfig(
            task_type="RETRIEVAL_DOCUMENT",
            output_dimensionality=768,
        ),
    )
    return [e.values for e in response.embeddings]

def load_data(file_path: str) -> list[dict]:
    """Đọc file JSON/JSONL và chuẩn hóa sang format chung cho ChromaDB."""
    data = []
    if not os.path.exists(file_path): 
        print(f"  ⚠️ Warning: File not found {file_path}")
        return []
    
    try:
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            if file_path.endswith('.json'):
                raw_data = json.load(f)
                if not isinstance(raw_data, list): raw_data = [raw_data]
            else:
                raw_data = [json.loads(line) for line in f if line.strip()]

            for item in raw_data:
                # Schema 1: FAQ
                if "messages" in item:
                    content = f"Q: {item['messages'][0]['content']}\nA: {item['messages'][1]['content']}"
                    meta = {"source": "faq", "category": "faq"}
                    doc_id = item.get("id") or get_stable_id(content, "faq")
                
                # Schema 2: Intent V2
                elif "utterance" in item:
                    content = item["utterance"]
                    meta = {
                        "source": "intent", 
                        "intent": item.get("intent", ""), 
                        "category": "intent"
                    }
                    # Flatten entities vào metadata
                    if "entities" in item and isinstance(item["entities"], dict):
                        for k, v in item["entities"].items():
                            meta[f"entity_{k}"] = str(v)
                    doc_id = item.get("id") or get_stable_id(content, "intent")
                
                # Schema 3: MTPC Structured JSON V2
                elif "content" in item and "title" in item:
                    content = item["content"]
                    meta = {
                        "source": "structured_json",
                        "title": item.get("title", ""),
                        "category": item.get("category", ""),
                        "url": item.get("url", ""),
                        "major_id": item.get("major_id") or "",
                        "last_updated": item.get("last_updated", "")
                    }
                    if item.get("target_audience"):
                        meta["target_audience"] = ", ".join(item.get("target_audience"))

                    doc_id = item.get("id") or item.get("title") or get_stable_id(content, "mtpc")
                
                # Schema 4: RAG Chunks thông thường
                else:
                    content = item.get("content", "")
                    meta = item.get("metadata", {})
                    meta["source"] = "rag_chunks"
                    doc_id = item.get("id") or get_stable_id(content, "chunk")
                
                safe_meta = sanitize_metadata(meta)
                data.append({"id": str(doc_id), "content": content, "metadata": safe_meta})
    except Exception as e:
        print(f"  ❌ Lỗi khi xử lý file {file_path}: {e}")
    
    return data

# ── Main ──────────────────────────────────────────────────────────────────────
def main(input_files: list[str], chroma_path: str, collection_name: str, reset: bool):
    global DELAY_SECONDS
    chroma_client = chromadb.PersistentClient(path=chroma_path)
    
    if reset and collection_name in [c.name for c in chroma_client.list_collections()]:
        chroma_client.delete_collection(collection_name)
        print(f"  -> Đã reset collection '{collection_name}'")

    collection = chroma_client.get_or_create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"},
    )
    print(f"Khởi tạo collection: {collection_name}")
    print(f"  -> Trạng thái: '{collection_name}' đang có {collection.count()} docs.\n")

    # Loại bỏ đường dẫn trùng lặp
    unique_paths = list(dict.fromkeys([os.path.abspath(p) for p in input_files]))

    for file_path in unique_paths:
        print(f"[->] Đang xử lý: {file_path}")
        chunks = load_data(file_path)
        if not chunks: continue
            
        total = len(chunks)
        batches = [chunks[i : i + BATCH_SIZE] for i in range(0, total, BATCH_SIZE)]
        ok = 0

        for batch_no, batch in enumerate(batches, start=1):
            texts = [c["content"] for c in batch]
            ids = [c["id"] for c in batch]
            metadatas = [c["metadata"] for c in batch]

            embeddings = None
            for attempt in range(1, 6):
                try:
                    embeddings = embed_batch(texts)
                    break
                except Exception as e:
                    err_msg = str(e)
                    if "429" in err_msg or "RESOURCE_EXHAUSTED" in err_msg:
                        wait_time = 30 * attempt
                        print(f"  ⚠ Quá tải API. Nghỉ {wait_time}s rồi thử lại... (Lần {attempt}/5)")
                        time.sleep(wait_time)
                        DELAY_SECONDS = min(DELAY_SECONDS + 5, 60) 
                    else:
                        print(f"  ✗ Lỗi không xác định: {err_msg}")
                        break

            if embeddings:
                collection.upsert(ids=ids, embeddings=embeddings, documents=texts, metadatas=metadatas)
                ok += len(batch)
                print(f"  ✓ Batch {batch_no}/{len(batches)}: {ok}/{total} hoàn tất")
            else:
                print(f"  ✗ Bỏ qua Batch {batch_no} do lỗi API kéo dài.")
            
            time.sleep(DELAY_SECONDS)

    print(f"\n[✓] HOÀN TẤT: Hiện có {collection.count()} documents trong ChromaDB.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", nargs="+")
    parser.add_argument("--chroma", default=DEFAULT_CHROMA_PATH)
    parser.add_argument("--collection", default=DEFAULT_COLLECTION)
    parser.add_argument("--reset", action="store_true")
    args = parser.parse_args()

    if not args.input:
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 
        PYTHON_BACKEND = os.path.dirname(BASE_DIR) 
        PROJECT_ROOT = os.path.dirname(PYTHON_BACKEND) 
        
        # Sử dụng các file gốc
        args.input = [
            os.path.join(PROJECT_ROOT, "data", "mtpc_knowledge_base", "mtpc_data_structured.json"),
            os.path.join(PROJECT_ROOT, "data", "mtpc_knowledge_base", "intent_mapping.jsonl")
        ]

    main(args.input, args.chroma, args.collection, args.reset)