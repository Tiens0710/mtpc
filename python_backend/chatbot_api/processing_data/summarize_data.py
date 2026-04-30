import asyncio
import glob
import os
from pathlib import Path
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """Bạn là trợ lý tóm tắt thủ tục hành chính thông minh.
    Tóm tắt thủ tục hành chính theo yêu cầu sau:
    - Tóm tắt nội dung theo từng heading
    - Không bịa đặt nội dung
    - Viết ngắn gọn, xúc tích, dễ hiểu
    - Dạng gạch đầu dòng

    Yêu cầu của từng heading:
    - Heading 1: là tên của thủ tục, không cần tóm tắt
    - Heading 2 cách thức thực hiện: trình bày bao gồm các hình thức nộp, thời gian giải quyết, lệ phí, mô tả
    - Heading 2 thành phần hồ sơ: liệt kê gồm các hồ sơ cần có, số lượng bản sao và bản chính cần có, mẫu đơn (nếu có)
    - Heading 2 trình tự thực hiện: liệt kê các bước để thực hiện làm thủ tục
    - Heading 2 cơ quan thực hiện: liệt kê các cơ quan có thể thực hiện làm thủ tục
    - Heading 2 yêu cầu, điều kiện: liệt kê các điều kiện cần có để thực hiện làm thủ tục
    - Heading 2 thủ tục hành chính liên quan: liệt kê các tên thủ tục hành chính liên quan
"""

MAX_CONCURRENT = 10
DELAY_SECONDS = 65
 
async def summarize_one(filepath: str, semaphore: asyncio.Semaphore) -> dict:
    async with semaphore:
        print(f"  → Đang xử lý: {filepath}")
        content = Path(filepath).read_text(encoding="utf-8")
 
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: client.models.generate_content(
                model="gemini-3.1-flash-lite-preview",
                contents=content,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    thinking_config=types.ThinkingConfig(thinking_level="high"),  # low=nhanh, high=chính xác hơn
                ),
            ),
        )
        print(f"  ⏳ Chờ {DELAY_SECONDS}s trước request tiếp theo...")
        await asyncio.sleep(DELAY_SECONDS)
        return {"file": filepath, "summary": response.text}
 
 
async def batch_summarize(pattern: str = "data/*.md"):
    files = sorted(glob.glob(pattern))[4:]
    if not files:
        print(f"Không tìm thấy file nào với pattern: {pattern}")
        return
 
    print(f"Tìm thấy {len(files)} file, xử lý tối đa {MAX_CONCURRENT} song song...\n")
 
    semaphore = asyncio.Semaphore(MAX_CONCURRENT)
    tasks = [summarize_one(f, semaphore) for f in files]
    results = await asyncio.gather(*tasks)
 
    output_dir = Path(r"C:\Chatbot\summarized")
    output_dir.mkdir(exist_ok=True)
 
    for r in results:
        filename = Path(r["file"]).stem + ".md"
        output_path = output_dir / filename
        output_path.write_text(r["summary"], encoding="utf-8")
        print(f"  ✓ Đã lưu: {output_path}")
 
    print(f"\n✓ Hoàn thành! Đã lưu {len(results)} file vào thư mục '{output_dir}'")
    return results


if __name__ == "__main__":
    asyncio.run(batch_summarize(r"C:\Chatbot\data\md_content\*.md"))  # Đổi pattern cho đúng thư mục