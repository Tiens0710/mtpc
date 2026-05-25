# MTPC Website Update — Giai đoạn 1

Bộ patch sửa toàn bộ nội dung sai/placeholder của website
[mtpc-one.vercel.app](https://mtpc-one.vercel.app).

## TL;DR

5 file TypeScript trong `lib/` làm **single source of truth** mới:

| File | Mục đích |
|---|---|
| `site-config.ts` | Tên trường, địa chỉ, contact, vision, SEO |
| `programs.ts` | 5 ngành đào tạo + sơ cấp (đã loại Cơ khí, Điện tử, TMĐT sai) |
| `chatbot-config.ts` | Chatbot "Nhi" (sửa bug "Tiến" vs "Nhi") + system prompt |
| `partners.ts` | Đối tác (auto-hide section nếu chưa đủ 3 đối tác thật) |
| `stats.ts` | Số liệu có nguồn (auto-hide nếu chưa có data) |

## Sai sót đã sửa

✅ Trường là **Trung cấp**, không phải Cao đẳng (sai ở footer, hero)
✅ Địa chỉ **192-194 Ngô Quyền** (không phải 123 Đường 3/2 placeholder)
✅ 5 ngành đúng: Y sĩ, Dược, Điều dưỡng, Hộ sinh, CNTT-AI
✅ Chatbot thống nhất tên **Nhi** (trước đây header "Tiến" + greeting "Nhi")
✅ Loại placeholder đối tác "Đối tác 2", "Đối tác 3" với cùng 1 logo
✅ Loại số liệu "tô vẽ" 20+ năm, 98%, 200+ (không nguồn)
✅ Social links phải trỏ về page MTPC thật, không phải trang chủ FB/YT/TT
✅ SĐT thống nhất giữa footer & form (đang mâu thuẫn 2 số)
✅ Vision statement viết lại phù hợp thực tế ĐBSCL (không copy template VinUni)

## Còn `__TODO__` Hiệp cần điền

Search trong code các chỗ `__TODO__` để biết những giá trị cần Hiệp xác minh
trước khi deploy production:

- SĐT chính & SĐT phòng tuyển sinh của trường
- Email tuyển sinh chính thức
- Toạ độ địa lý chính xác cho Google Maps embed
- Link Facebook/YouTube/TikTok thật của MTPC
- Logo đối tác thật (cần xin phép trước khi dùng)
- Số liệu thật cho stats (tỷ lệ việc làm, số đối tác, số SV)
- Xác minh DNS mtpc.edu.vn đã trỏ chưa

## Cách dùng

Đọc `MIGRATION-CHECKLIST.md` để biết:
1. Copy file vào đâu
2. Find & replace toàn repo theo bảng
3. Refactor component dùng config mới
4. Verify checklist sau khi merge

## Tiếp theo

Sau khi merge giai đoạn 1 → nhắn để vào **Giai đoạn 2: Redesign UI**.
