import asyncio
import inspect
import logging
import traceback

logger = logging.getLogger(__name__)
from google import genai
from google.genai import types

class GeminiLive:
    """
    Handles the interaction with the Gemini Live API.
    """
    def __init__(self, api_key, model, input_sample_rate, tools=None, tool_mapping=None, user_context=None):
        self.api_key = api_key
        self.model = model
        self.input_sample_rate = input_sample_rate
        self.client = genai.Client(api_key=api_key)
        self.tools = tools or []
        self.tool_mapping = tool_mapping or {}
        self.user_context = user_context or {}

    async def start_session(self, audio_input_queue, text_input_queue, audio_output_callback, audio_interrupt_callback=None, video_input_queue=None, resumption_token=None, voice_name="Algenib"):
        assistant_name = "Thư" if voice_name == "Algenib" else "Nhi"
        personal_info = f"Bạn là {assistant_name}, tư vấn viên tuyển sinh của Trường Trung cấp Miền Tây (MTPC). Bạn chuyên giải đáp thắc mắc về các ngành học, học phí, thủ tục nhập học và các chính sách hỗ trợ sinh viên của trường."
        base_system_prompt = f"""{personal_info}
Người dùng sẽ hỏi bằng tiếng Việt, bạn LUÔN trả lời bằng tiếng Việt.

## QUY TẮC QUAN TRỌNG NHẤT: XỬ LÝ CÂU NGẮN MƠ HỒ

Khi người dùng gửi câu ngắn như: "giới thiệu nhé", "kể thêm đi", "hướng dẫn tôi", "ok", "được", "tiếp tục", "nói thêm đi", "ừ", "vậy à"...

→ TUYỆT ĐỐI KHÔNG hỏi lại "bạn muốn giới thiệu về gì?"
→ TUYỆT ĐỐI KHÔNG quay về chào hỏi ban đầu
→ PHẢI hiểu đây là yêu cầu TIẾP NỐI chủ đề đang nói (ví dụ đang nói về ngành Dược thì tiếp tục giới thiệu sâu hơn về ngành Dược).

Khi nhận được message có tiêu đề [LỊCH SỬ HỘI THOẠI], hãy đọc kỹ để biết chủ đề đang nói là gì, rồi xử lý câu hỏi hiện tại dựa trên ngữ cảnh đó.

## QUY TẮC VỀ NGỮ CẢNH TRANG WEB [TRANG HIỆN TẠI]
- Bạn luôn biết người dùng đang ở trang nào qua tiêu đề [TRANG HIỆN TẠI].
- Khi người dùng hỏi "trang này nói về gì", "hướng dẫn tôi":
  → BẮT BUỘC gọi tool `search_mtpc_knowledge`.
  → TRẢ LỜI: Ngắn gọn, súc tích. Dùng bullet points cho các thông tin liệt kê (ngành học, hồ sơ...).
  → TRÁNH viết đoạn văn dài dòng.

## QUY TẮC SỬ DỤNG DATASET (RAG)
- LUÔN dùng tool `search_mtpc_knowledge` khi người dùng hỏi về: ngành đào tạo, học phí, địa chỉ, số điện thoại, hồ sơ nhập học, hoặc bất kỳ thông tin chính thống nào của trường.
- Trích xuất thông tin CỐT LÕI từ dataset. Ví dụ: Nếu hỏi về hồ sơ, hãy liệt kê rõ các loại giấy tờ cần thiết.
- TUYỆT ĐỐI KHÔNG tự bịa thông tin. Nếu không thấy trong dataset, hãy hướng dẫn người dùng liên hệ hotline 0934 790 790 để được hỗ trợ chính xác nhất.
- Nếu người dùng đồng ý đăng ký nhập học, hãy gợi ý gọi tool `start_admission_registration` hoặc `navigate_to_page` tới trang đăng ký.

## CÁC QUY TẮC KHÁC
- LUÔN giữ thái độ chuyên nghiệp, thân thiện, tận tâm như một tư vấn viên thực thụ.
- TUYỆT ĐỐI KHÔNG sử dụng dấu sao đôi (**word**) để in đậm văn bản. Hãy trả lời bằng văn bản thuần túy (plain text)."""

        if self.user_context:
            user_name = self.user_context.get("name", "Khách")
            user_credits = self.user_context.get("credits", "0")
            base_system_prompt += f"\n\n## THÔNG TIN NGƯỜI DÙNG HIỆN TẠI\n- Tên người dùng: {user_name}\n- Số Credit hiện có: {user_credits}\n(Hãy xưng hô thân thiện bằng tên này và dùng số dư Credit để tư vấn dịch vụ cho phù hợp).\n"

        config = types.LiveConnectConfig(
            response_modalities=[types.Modality.AUDIO],
            speech_config=types.SpeechConfig(
                voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(
                        voice_name=voice_name
                    )
                )
            ),
            system_instruction=types.Content(parts=[types.Part(text=base_system_prompt)]),
            input_audio_transcription=types.AudioTranscriptionConfig(),
            output_audio_transcription=types.AudioTranscriptionConfig(),
            realtime_input_config=types.RealtimeInputConfig(
                turn_coverage="TURN_INCLUDES_ONLY_ACTIVITY",
            ),
            tools=self.tools,
            session_resumption=types.SessionResumptionConfig(handle=resumption_token) if resumption_token else None,
        )
        
        logger.info(f"Connecting to Gemini Live with model={self.model}")
        try:
          async with self.client.aio.live.connect(model=self.model, config=config) as session:
            logger.info("Gemini Live session opened successfully")
            
            async def send_audio():
                try:
                    while True:
                        chunk = await audio_input_queue.get()
                        await session.send_realtime_input(
                            audio=types.LiveClientRealtimeInputAudio(
                                data=chunk, mime_type=f"audio/pcm;rate={self.input_sample_rate}"
                            )
                        )
                except asyncio.CancelledError: pass
                except Exception as e:
                    logger.error(f"send_audio error: {e}")

            async def send_video():
                try:
                    if video_input_queue is None: 
                        return
                    while True:
                        item = await video_input_queue.get()
                        
                        # Sử dụng từ khóa video= (Chỉ chạy được trên bản SDK mới)
                        await session.send_realtime_input(
                            video=types.Blob(
                                data=item["data"], 
                                mime_type=item["mime_type"]
                            )
                        )
                except asyncio.CancelledError:
                    logger.debug("send_video task cancelled")
                except Exception as e:
                    logger.error(f"send_video error: {e}\n{traceback.format_exc()}")

            async def send_text():
                try:
                    while True:
                        text = await text_input_queue.get()
                        logger.info(f"Sending text to Gemini: {text}")
                        # Dùng realtime input cho text
                        await session.send_realtime_input(text=text)
                        # Bắt buộc báo kết thúc lượt để AI phản hồi
                        await session.send(input=None, end_of_turn=True)
                except asyncio.CancelledError:
                    logger.debug("send_text task cancelled")
                except Exception as e:
                    logger.error(f"send_text error: {e}\n{traceback.format_exc()}")

            event_queue = asyncio.Queue()

            async def receive_loop():
                try:
                    while True:
                        async for response in session.receive():
                            logger.debug(f"Received response from Gemini: {response}")
                            
                            # Log the raw response type for debugging
                            if response.go_away:
                                logger.warning(f"Received GoAway from Gemini: {response.go_away}")
                            if response.session_resumption_update:
                                handle = response.session_resumption_update.new_handle
                                logger.info(f"Session resumption update received: {handle}")
                                if handle:
                                    await event_queue.put({"type": "resumption_token", "token": handle})
                            
                            server_content = response.server_content
                            tool_call = response.tool_call
                            
                            if server_content:
                                if server_content.model_turn:
                                    for part in server_content.model_turn.parts:
                                        if part.inline_data:
                                            if inspect.iscoroutinefunction(audio_output_callback):
                                                await audio_output_callback(part.inline_data.data)
                                            else:
                                                audio_output_callback(part.inline_data.data)
                                        if part.text:
                                            await event_queue.put({"type": "gemini", "text": part.text})
                                
                                if server_content.input_transcription and server_content.input_transcription.text:
                                    await event_queue.put({"type": "user", "text": server_content.input_transcription.text})
                                
                                if server_content.output_transcription and server_content.output_transcription.text:
                                    await event_queue.put({"type": "gemini", "text": server_content.output_transcription.text})
                                
                                if server_content.turn_complete:
                                    await event_queue.put({"type": "turn_complete"})
                                
                                if server_content.interrupted:
                                    if audio_interrupt_callback:
                                        if inspect.iscoroutinefunction(audio_interrupt_callback):
                                            await audio_interrupt_callback()
                                        else:
                                            audio_interrupt_callback()
                                    await event_queue.put({"type": "interrupted"})

                            if tool_call:
                                function_responses = []
                                for fc in tool_call.function_calls:
                                    func_name = fc.name
                                    args = fc.args or {}
                                    
                                    if func_name in self.tool_mapping:
                                        try:
                                            tool_func = self.tool_mapping[func_name]
                                            if inspect.iscoroutinefunction(tool_func):
                                                result = await tool_func(**args)
                                            else:
                                                loop = asyncio.get_running_loop()
                                                result = await loop.run_in_executor(None, lambda a=args: tool_func(**a))
                                        except Exception as e:
                                            result = f"Error: {e}"
                                        
                                        function_responses.append(types.FunctionResponse(
                                            name=func_name,
                                            id=fc.id,
                                            response={"result": result}
                                        ))
                                        await event_queue.put({"type": "tool_call", "name": func_name, "args": args, "result": result})
                                
                                await session.send_tool_response(function_responses=function_responses)
                        
                        logger.debug("Gemini receive iterator completed, re-entering receive loop")

                except asyncio.CancelledError:
                    logger.debug("receive_loop task cancelled")
                except Exception as e:
                    logger.error(f"receive_loop error: {type(e).__name__}: {e}\n{traceback.format_exc()}")
                    await event_queue.put({"type": "error", "error": f"{type(e).__name__}: {e}"})
                finally:
                    logger.info("receive_loop exiting")
                    await event_queue.put(None)

            send_audio_task = asyncio.create_task(send_audio())
            send_video_task = asyncio.create_task(send_video()) if video_input_queue else None
            send_text_task = asyncio.create_task(send_text())
            receive_task = asyncio.create_task(receive_loop())

            try:
                while True:
                    event = await event_queue.get()
                    if event is None:
                        break
                    if isinstance(event, dict) and event.get("type") == "error":
                        yield event
                        break 
                    yield event
            finally:
                logger.info("Cleaning up Gemini Live session tasks")
                send_audio_task.cancel()
                if send_video_task: send_video_task.cancel()
                send_text_task.cancel()
                receive_task.cancel()
        except Exception as e:
            logger.error(f"Gemini Live session error: {type(e).__name__}: {e}\n{traceback.format_exc()}")
            raise
        finally:
            logger.info("Gemini Live session closed")