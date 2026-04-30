import argparse
import json
from pathlib import Path


THANH_PHAN_MAP = {
    "trinh_tu":             "Trình tự thực hiện",
    "thoi_han_giai_quyet":  "Thời hạn giải quyết",
    "le_phi":               "Lệ phí",
    "thanh_phan_ho_so":     "Thành phần hồ sơ",
    "co_quan_thuc_hien":    "Cơ quan thực hiện",
    "cac_dieu_kien":        "Điều kiện thực hiện",
    "thu_tuc_lien_quan":    "Thủ tục liên quan",
}

# Các field có cấu trúc [{truong_hop, <list_key>}, ...]
CASE_FIELDS = {
    "trinh_tu":          "buoc",
    "thanh_phan_ho_so":  "ho_so",
    "cac_dieu_kien":     "dieu_kien",
}


# ── Formatters cho field KHÔNG có truong_hop ──────────────────────────────────

def format_thoi_han(items: list) -> str:
    lines = []
    for item in items:
        lines.append(f"Hình thức: {item.get('hinh_thuc', '')}")
        lines.append(f"  Thời gian: {item.get('thoi_gian', '')}")
        lines.append(f"  Mô tả: {item.get('mo_ta_chi_tiet', '')}")
    return "\n".join(lines)


def format_le_phi(items: list) -> str:
    return "\n".join(f"- {p}" for p in items)


def format_co_quan_thuc_hien(items: list) -> str:
    return "\n".join(f"- {cq}" for cq in items)


def format_thu_tuc_lien_quan(items: list) -> str:
    return "\n".join(f"- {tt}" for tt in items)


SIMPLE_FORMATTERS = {
    "thoi_han_giai_quyet":  format_thoi_han,
    "le_phi":               format_le_phi,
    "co_quan_thuc_hien":    format_co_quan_thuc_hien,
    "thu_tuc_lien_quan":    format_thu_tuc_lien_quan,
}


# ── Tạo chunk ─────────────────────────────────────────────────────────────────

def make_chunk(context: str, ma_thu_tuc: str, ten_thanh_phan: str,
               cap_thuc_hien: str, co_quan_ban_hanh: str, phan_loai: str) -> dict:
    return {
        "context": context,
        "metadata": {
            "ma_thu_tuc":       ma_thu_tuc,
            "thanh_phan":       ten_thanh_phan,
            "cap_thuc_hien":    cap_thuc_hien,
            "co_quan_ban_hanh": co_quan_ban_hanh,
            "phan_loai":        phan_loai,
        },
    }


def tthc_to_chunks(record: dict) -> list[dict]:
    chunks = []

    ma_thu_tuc       = record.get("ma_thu_tuc", "")
    ten_thu_tuc      = record.get("ten_thu_tuc", "")
    cap_thuc_hien    = record.get("cap_thuc_hien", "")
    co_quan_ban_hanh = record.get("co_quan_ban_hanh", "")
    phan_loai        = record.get("phan_loai", "")

    header = f"Thủ tục: {ten_thu_tuc}\n"

    for field, ten_thanh_phan in THANH_PHAN_MAP.items():
        data = record.get(field)
        if data is None:
            continue

        # ── Field có cấu trúc truong_hop ──────────────────────────────────────
        if field in CASE_FIELDS:
            list_key = CASE_FIELDS[field]
            is_single_chung = (
                len(data) == 1 and data[0].get("truong_hop", "").strip() == "Chung"
            )

            if is_single_chung:
                # 1 trường hợp "Chung" → 1 chunk, không hiển thị label trường hợp
                items_text = "\n".join(f"  {item}" for item in data[0].get(list_key, []))
                context = f"{header}{ten_thanh_phan}:\n{items_text}"
                chunks.append(make_chunk(
                    context, ma_thu_tuc, ten_thanh_phan,
                    cap_thuc_hien, co_quan_ban_hanh, phan_loai,
                ))
            else:
                # Nhiều trường hợp → mỗi trường hợp 1 chunk
                for case in data:
                    truong_hop = case.get("truong_hop", "")
                    items_text = "\n".join(f"  {item}" for item in case.get(list_key, []))
                    context = (
                        f"{header}{ten_thanh_phan}:\n"
                        f"Trường hợp: {truong_hop}\n"
                        f"{items_text}"
                    )
                    chunks.append(make_chunk(
                        context, ma_thu_tuc, ten_thanh_phan,
                        cap_thuc_hien, co_quan_ban_hanh, phan_loai,
                    ))

        # ── Field đơn giản (không có truong_hop) ──────────────────────────────
        else:
            formatter = SIMPLE_FORMATTERS[field]
            noi_dung  = formatter(data)
            context   = f"{header}{ten_thanh_phan}:\n{noi_dung}"
            chunks.append(make_chunk(
                context, ma_thu_tuc, ten_thanh_phan,
                cap_thuc_hien, co_quan_ban_hanh, phan_loai,
            ))

    return chunks


# ── Main ──────────────────────────────────────────────────────────────────────

def main(input_file: str, output_file: str):
    records = json.loads(Path(input_file).read_text(encoding="utf-8"))
    if isinstance(records, dict):
        records = [records]

    all_chunks = []
    for record in records:
        all_chunks.extend(tthc_to_chunks(record))

    Path(output_file).write_text(
        json.dumps(all_chunks, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"✓ {len(records)} thủ tục → {len(all_chunks)} chunks → '{output_file}'")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Chia TTHC JSON → chunks")
    parser.add_argument("--input",  default="data/tthc_all.json",    help="File JSON đầu vào")
    parser.add_argument("--output", default="data/tthc_chunks.json", help="File JSON đầu ra")
    args = parser.parse_args()

    main(args.input, args.output)