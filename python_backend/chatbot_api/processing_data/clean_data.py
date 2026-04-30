import argparse
import asyncio
import glob
import json
import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

DELAY_SECONDS = 62
MAX_CONCURRENT = 8

SCHEMA = {
    "type": "object",
    "properties": {
        "ma_thu_tuc":           {"type": "string"},
        "ten_thu_tuc":          {"type": "string"},
        "trinh_tu": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "truong_hop": {"type": "string"},
                    "buoc":       {"type": "array", "items": {"type": "string"}},
                },
                "required": ["truong_hop", "buoc"],
            },
        },
        "thoi_han_giai_quyet": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "hinh_thuc":      {"type": "string"},
                    "thoi_gian":      {"type": "string"},
                    "mo_ta_chi_tiet": {"type": "string"},
                },
                "required": ["hinh_thuc", "thoi_gian", "mo_ta_chi_tiet"],
            },
        },
        "le_phi":               {"type": "array", "items": {"type": "string"}},
        "thanh_phan_ho_so": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "truong_hop": {"type": "string"},
                    "ho_so":      {"type": "array", "items": {"type": "string"}},
                },
                "required": ["truong_hop", "ho_so"],
            },
        },
        "co_quan_thuc_hien":    {"type": "array", "items": {"type": "string"}},
        "cac_dieu_kien": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "truong_hop": {"type": "string"},
                    "dieu_kien":  {"type": "array", "items": {"type": "string"}},
                },
                "required": ["truong_hop", "dieu_kien"],
            },
        },
        "thu_tuc_lien_quan":    {"type": "array", "items": {"type": "string"}},
        "phan_loai":            {"type": "string"},
        "cap_thuc_hien":        {"type": "string"},
        "co_quan_ban_hanh":     {"type": "string"},
    },
    "required": [
        "ma_thu_tuc", "ten_thu_tuc", "trinh_tu", "thoi_han_giai_quyet",
        "le_phi", "thanh_phan_ho_so", "co_quan_thuc_hien", "cac_dieu_kien",
        "thu_tuc_lien_quan", "phan_loai", "cap_thuc_hien", "co_quan_ban_hanh",
    ],
}

SYSTEM_PROMPT = """Bạn là chuyên gia trích xuất thông tin thủ tục hành chính Việt Nam.
Đọc nội dung markdown và trích xuất đầy đủ thông tin theo đúng schema JSON được yêu cầu, không được bịa thông tin.

Lưu ý:
- ma_thu_tuc: lấy chính xác từ tên trong file được cung cấp
- trinh_tu.truong_hop: nếu trong trình tự thực hiện có các trường hợp thì tách riêng, nếu không thì ghi "Chung"
- trinh_tu.buoc: list các hành động/mô tả trong trường hợp đó
- thoi_han_giai_quyet: tách theo hình thức nộp (trực tiếp/trực tuyến/bưu chính) là một phần tử nếu có nhiều mô tả cho từng hình thức nộp, nếu không thì ghi (trực tiếp/trực tuyến/bưu chính) vào cùng một phần tử
- le_phi: list các loại phí, nếu không có thì ["liên hệ trực tiếp với cán bộ"]
- thanh_phan_ho_so.truong_hop: nếu trong thành phần hồ sơ có các trường hợp thì tách riêng, nếu không thì ghi "Chung"
- thanh_phan_ho_so.ho_so: list các tài liệu cần thiết và số lượng trong trường hợp đó
- cac_dieu_kien.truong_hop: nếu trong điều kiện thực hiện có các trường hợp thì tách riêng, nếu không thì ghi "Chung"
- cac_dieu_kien.dieu_kien: list các điều kiện cần thiết trong trường hợp đó
- thu_tuc_lien_quan: tên các thủ tục liên quan, nếu không có thì ["không có"]
- phan_loai: luôn là "Thủ tục"
- cap_thuc_hien: luôn là "Cấp xã"
- co_quan_ban_hanh: mặc định "UBND TPCT"

Trình bày thống nhất:
- trinh_tu.buoc: bắt đầu bằng số thứ tự, ví dụ "1. Chuẩn bị hồ sơ", "2. Nộp hồ sơ", "3. Nhận kết quả"
"""

async def convert_one(filepath: str, semaphore: asyncio.Semaphore) -> dict:
    async with semaphore:
        print(f"  → Đang xử lý: {filepath}")
        ma_thu_tuc = Path(filepath).stem
        content = Path(filepath).read_text(encoding="utf-8")
        prompt = f"Tên file (mã thủ tục): {ma_thu_tuc}\n\nNội dung markdown:\n{content}"

        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: client.models.generate_content(
                model="gemini-3.1-flash-lite-preview",
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    thinking_config=types.ThinkingConfig(thinking_level="low"),
                    response_mime_type="application/json",
                    response_schema=SCHEMA,
                ),
            ),
        )

        data = json.loads(response.text)
        await asyncio.sleep(DELAY_SECONDS)
        return data


async def process_batch(batch: list[tuple[int, str]], semaphore: asyncio.Semaphore) -> list[dict | None]:
    """Chạy song song một batch file, trả về list kết quả (None nếu lỗi)."""

    async def safe_convert(idx: int, filepath: str) -> tuple[int, str, dict | None, Exception | None]:
        try:
            data = await convert_one(filepath, semaphore)
            print(f"  ✓  [{idx}] {filepath}")
            return idx, filepath, data, None
        except Exception as e:
            print(f"  ✗  [{idx}] {filepath}  —  Lỗi: {e}")
            return idx, filepath, None, e

    tasks = [safe_convert(idx, fp) for idx, fp in batch]
    return await asyncio.gather(*tasks)


async def batch_convert(pattern: str = "data/*.md", output_file: str = "tthc_all.json"):
    files = sorted(glob.glob(pattern))
    if not files:
        print(f"Không tìm thấy file nào với pattern: '{pattern}'")
        return

    total = len(files)
    print(f"Tìm thấy {total} file — batch size: {MAX_CONCURRENT}\n")

    semaphore = asyncio.Semaphore(MAX_CONCURRENT)

    # Chia thành từng batch MAX_CONCURRENT file
    batches = [
        list(enumerate(files[i : i + MAX_CONCURRENT], start=i + 1))
        for i in range(0, total, MAX_CONCURRENT)
    ]

    results_map: dict[int, dict] = {}
    ok, err = 0, 0

    for batch_no, batch in enumerate(batches, start=1):
        print(f"\n── Batch {batch_no}/{len(batches)} ({len(batch)} file) ──")
        batch_results = await process_batch(batch, semaphore)

        for idx, filepath, data, error in batch_results:
            if error is None:
                results_map[idx] = data
                ok += 1
            else:
                err += 1

    # Giữ đúng thứ tự file gốc
    results = [results_map[i] for i in range(1, total + 1) if i in results_map]

    Path(output_file).write_text(
        json.dumps(results, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"\nHoàn thành: {ok} thành công, {err} lỗi → '{output_file}'")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Chuyển .md TTHC → .json dùng Gemini API")
    parser.add_argument("--input",  default="data/summarized/*.md",  help="Glob pattern file .md")
    parser.add_argument("--output", default="data/tthc_all.json",   help="Tên file JSON đầu ra")
    args = parser.parse_args()

    asyncio.run(batch_convert(pattern=args.input, output_file=args.output))