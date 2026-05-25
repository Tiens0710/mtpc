# MTPC Website — Migration Checklist (Giai đoạn 1: Fix nội dung)

> Bộ file này là **single source of truth** mới cho website MTPC.
> Mục tiêu: loại bỏ toàn bộ nội dung sai/placeholder mà người dùng đang
> nhìn thấy trên mtpc-one.vercel.app, không động vào logic frontend/backend.

---

## 📦 Nội dung bộ patch

```
lib/
├── site-config.ts          # Cấu hình trường (tên, địa chỉ, contact, vision)
├── programs.ts             # 5 ngành đào tạo + chương trình sơ cấp
├── chatbot-config.ts       # Cấu hình chatbot "Nhi" + system prompt
├── partners.ts             # Danh sách đối tác (đã loại placeholder)
└── stats.ts                # Số liệu có nguồn (auto-hide nếu chưa có data)

.env.example                # Template biến môi trường
MIGRATION-CHECKLIST.md      # File này
```

---

## 🚀 Cách tích hợp

### Bước 0: Backup
```bash
cd <repo mtpc>
git checkout -b feat/content-fix-phase1
git status   # đảm bảo working tree sạch
```

### Bước 1: Copy file vào repo
Copy nguyên 5 file trong thư mục `lib/` vào `<repo>/lib/`.
Nếu các file cùng tên đã tồn tại → đọc kỹ và merge thủ công, không đè.

### Bước 2: Cập nhật `.gitignore` (nếu chưa có)
```gitignore
# Environment files (NEVER commit)
.env
.env.local
.env.development.local
.env.production.local
!.env.example
```

### Bước 3: Tìm & Thay (Find & Replace toàn repo)

Mở repo trong VS Code, dùng `Cmd/Ctrl + Shift + H` để find & replace toàn dự án.

| # | Tìm (regex/text) | Thay bằng | Lý do |
|---|---|---|---|
| 1 | `Cao đẳng` | `Trung cấp` | Sai loại hình trường |
| 2 | `Mien Tay Professional College` | `Mien Tay Vocational College` | Tên EN đúng |
| 3 | `Trường Cao đẳng uy tín` | `Trường Trung cấp uy tín` | Footer slogan |
| 4 | `123 Đường 3/2` | (xóa, dùng `siteConfig.address.full`) | Sai địa chỉ |
| 5 | `(0292) 3 888 999` | (xóa, dùng `siteConfig.contact.phoneMain`) | SĐT placeholder |
| 6 | `(0292) 222 55 77` | (xóa, dùng `siteConfig.contact.phoneAdmissions`) | SĐT placeholder |
| 7 | `tuyensinh@mtpc.edu.vn` | (xóa, dùng `siteConfig.contact.email.admissions`) | Hardcode |
| 8 | `Đối tác 2`, `Đối tác 3` | (xóa, dùng `partners` từ `lib/partners.ts`) | Placeholder |
| 9 | `https://facebook.com"` (link rỗng) | `siteConfig.social.facebook` | Link không thật |
| 10 | `https://youtube.com"` | `siteConfig.social.youtube` | Link không thật |
| 11 | `https://tiktok.com"` | `siteConfig.social.tiktok` | Link không thật |
| 12 | `Tiến — Tư vấn MTPC` | `chatbotConfig.persona.fullTitle` | Tên chatbot rối |
| 13 | `"Tôi là Nhi"` (hardcoded) | `chatbotConfig.greeting` | Tách greeting ra config |

### Bước 4: Refactor các component sử dụng data

#### Trang chủ (`app/page.tsx`)
```tsx
// THÊM IMPORT
import { siteConfig } from '@/lib/site-config';
import { stats, visibleStats } from '@/lib/stats';
import { partners, shouldShowPartnersSection } from '@/lib/partners';

// SECTION "Tại sao chọn MTPC?" 
// CŨ: hardcode 4 ô 20+, 98%, 200+, ISO
// MỚI: map từ visibleStats - nếu chưa có data thật, section auto-hide
{visibleStats.length > 0 && (
  <section>
    {visibleStats.map(stat => (
      <StatCard key={stat.key} {...stat} />
    ))}
  </section>
)}

// SECTION "Đối tác chiến lược"
// CŨ: hardcode 6 entries (3 entries × 2 carousel loop), placeholder
// MỚI:
{shouldShowPartnersSection && (
  <section>
    {partners.map(p => <PartnerLogo key={p.id} {...p} />)}
  </section>
)}
```

#### Footer (component dùng chung)
```tsx
import { siteConfig } from '@/lib/site-config';

<footer>
  <p>{siteConfig.school.description}</p>
  <address>
    📍 {siteConfig.address.full}<br/>
    📞 <a href={`tel:${siteConfig.contact.phoneMain}`}>{siteConfig.contact.phoneMain}</a><br/>
    📧 <a href={`mailto:${siteConfig.contact.email.admissions}`}>{siteConfig.contact.email.admissions}</a><br/>
    🕐 {siteConfig.contact.workingHours.weekday}
  </address>
  <p>{siteConfig.copyright.text()}</p>
</footer>
```

#### Trang Tuyển sinh (`app/tuyen-sinh/page.tsx`)
```tsx
import { programs, formatTuition } from '@/lib/programs';

// Danh sách ngành - render từ programs[] thay vì hardcode
{programs.map(p => (
  <ProgramCard
    key={p.slug}
    name={p.name}
    code={p.code}
    duration={p.duration}
    enrollment={p.enrollment}
    certificate={p.certificate}
    image={p.image}
    href={`/dao-tao/${p.slug}`}  // ← thay vì href="#"
  />
))}

// Bảng học phí
{programs.map(p => (
  <tr key={p.slug}>
    <td>{p.name}</td>
    <td>{formatTuition(p.tuitionPerYear)}/năm</td>
    <td>{p.tuitionNote || '-'}</td>
  </tr>
))}

// Dropdown ngành trong form
<select name="nguyenVong">
  <option value="">-- Chọn ngành đăng ký --</option>
  {programs.map(p => (
    <option key={p.slug} value={p.slug}>{p.name}</option>
  ))}
</select>
```

#### Chatbot component
```tsx
import { chatbotConfig } from '@/lib/chatbot-config';

// Header chatbot
<div className="chatbot-header">
  <Avatar src={chatbotConfig.persona.avatar} />
  <h3>{chatbotConfig.persona.fullTitle}</h3>
  <span className="status">{isConnected 
    ? chatbotConfig.status.connected 
    : chatbotConfig.status.connecting}
  </span>
</div>

// Tin nhắn chào đầu
const initialMessages = [
  { role: 'assistant', content: chatbotConfig.greeting }
];

// Quick replies
{chatbotConfig.quickReplies.map(q => (
  <QuickReplyButton key={q} onClick={() => sendMessage(q)}>
    {q}
  </QuickReplyButton>
))}

// Gửi system prompt vào Gemini API
const response = await gemini.generateContent({
  systemInstruction: chatbotConfig.systemPrompt,
  // ...
});
```

#### Layout (`app/layout.tsx`) — SEO
```tsx
import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.urls.canonical,
    siteName: siteConfig.school.nameShort,
    locale: siteConfig.seo.locale,
    type: 'website',
    images: [siteConfig.seo.ogImage],
  },
};
```

### Bước 5: Xóa nội dung không cần
- File `test.txt` ở root → xóa
- Slider images thừa: chuẩn hóa lại tên file, KHÔNG để khoảng trắng trong tên (`slide (1).jpg` → `slide-1.jpg`)
- Vision statement cũ ("trở thành trường được ngưỡng mộ nhất châu Á") → thay bằng `siteConfig.vision`

### Bước 6: Verify trước khi merge
```bash
# Build thử
npm run build

# Chạy lint
npm run lint

# Chạy dev và check các trang
npm run dev
# → kiểm tra: /, /tuyen-sinh, /dao-tao, /tin-tuc, /verify-certificate
# → đặc biệt: chatbot hiện "Nhi" thống nhất, không còn "Tiến"
```

### Bước 7: Commit & PR
```bash
git add lib/ .env.example MIGRATION-CHECKLIST.md
git commit -m "feat(content): fix toàn bộ nội dung sai/placeholder

- Thêm lib/site-config.ts làm single source of truth
- Sửa loại trường: Trung cấp (không phải Cao đẳng)
- Sửa địa chỉ: 192-194 Ngô Quyền
- Danh sách ngành đúng: Y sĩ, Dược, Điều dưỡng, Hộ sinh, CNTT-AI
- Thống nhất chatbot tên Nhi (loại bug 'Tiến' vs 'Nhi')
- Loại đối tác placeholder, partners section auto-hide khi <3
- Stats có nguồn, auto-hide khi chưa có data thật
- Thêm .env.example, cảnh báo về secrets"
```

---

## ✅ Checklist xác minh sau khi merge

Mở https://mtpc-one.vercel.app sau khi deploy và check:

### Định danh trường
- [ ] Footer KHÔNG còn chữ "Cao đẳng" (chỉ "Trung cấp")
- [ ] Footer copyright: "Trường Trung cấp Miền Tây" (không phải "Professional College")
- [ ] Hero trang Tuyển sinh ghi "Trung cấp" rõ ràng

### Địa chỉ & liên hệ
- [ ] Footer hiện địa chỉ 192-194 Ngô Quyền (không phải 123 Đường 3/2)
- [ ] Google Maps embed đúng vị trí trường thật
- [ ] SĐT thống nhất ở footer + form tuyển sinh

### Ngành đào tạo
- [ ] Trang Tuyển sinh chỉ hiện 5 ngành: Y sĩ, Dược, Điều dưỡng, Hộ sinh, CNTT-AI
- [ ] KHÔNG còn Cơ khí, Điện tử, Thương mại điện tử
- [ ] Trang Đào tạo khớp với Tuyển sinh
- [ ] Bảng học phí khớp với danh sách ngành
- [ ] Dropdown trong form khớp

### Chatbot
- [ ] Header widget ghi "Nhi — Trợ lý tuyển sinh MTPC"
- [ ] Greeting message ghi "Mình là Nhi..."
- [ ] KHÔNG còn chữ "Tiến" ở đâu

### Đối tác
- [ ] Section đối tác hoặc hiển thị đủ partner thật, hoặc ẩn hoàn toàn (không placeholder)

### Số liệu
- [ ] Stats section hoặc có số thật + nguồn, hoặc ẩn (không "20+, 98%, 200+")

### Social
- [ ] Link Facebook/YouTube/TikTok dẫn đến trang MTPC thật (hoặc ẩn icon)

### Bảo mật
- [ ] `.env.local` KHÔNG có trong git history (`git log --all -- .env.local` → empty)
- [ ] Đã rotate Gemini API key và Supabase service role key (sau vụ lộ env)

---

## 🔜 Giai đoạn 2 (Redesign UI) sẽ làm gì?

Sau khi giai đoạn 1 merge xong và ổn định, mình sẽ:
- Thiết kế lại layout trang chủ với hệ màu vibrant phù hợp với Gen Z
- Component library mới (Button, Card, Section) dựa trên design tokens
- Animation/interaction tinh tế hơn
- Mobile-first thật sự (hiện đang responsive thông thường)
- Component cho hero blockchain certificate verification

Khi nào Hiệp sẵn sàng vào giai đoạn 2, nhắn mình.
