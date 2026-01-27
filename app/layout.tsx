import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trường Trung cấp Miền Tây - MTPC",
  description: "Trường Trung cấp Miền Tây - Chất lượng là nền tảng. Đào tạo các ngành: Y sĩ đa khoa, Dược sĩ, Điều dưỡng, Công nghệ thông tin, Thương mại điện tử.",
  keywords: "MTPC, Trường Trung cấp Miền Tây, tuyển sinh, đào tạo, y sĩ, dược sĩ, điều dưỡng, CNTT",
  authors: [{ name: "Trường Trung cấp Miền Tây" }],
  openGraph: {
    title: "Trường Trung cấp Miền Tây - MTPC",
    description: "Chất lượng là nền tảng - Đào tạo chuyên nghiệp các ngành y tế và công nghệ",
    url: "https://www.mtpc.edu.vn",
    siteName: "MTPC",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
