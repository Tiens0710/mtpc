import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

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
    <html lang="vi" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body suppressHydrationWarning style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
        <Header />
        {children}
        <Footer />
        {/* Chatbot hỗ trợ - hiển thị trên tất cả các trang */}
        <Chatbot />
      </body>
    </html>
  );
}