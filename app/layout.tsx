import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin", "vietnamese"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-plus-jakarta",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Trường Trung cấp Miền Tây - MTPC",
        template: "%s | MTPC - Trường Trung cấp Miền Tây",
    },
    description: "Trường Trung cấp Miền Tây (MTPC) tại Cần Thơ - Đào tạo Y sĩ, Dược, Điều dưỡng, Hộ sinh, CNTT ứng dụng AI. Bằng cấp xác thực blockchain.",
    keywords: ["MTPC", "Trường Trung cấp Miền Tây", "tuyển sinh Cần Thơ", "y sĩ đa khoa", "dược sĩ", "điều dưỡng", "hộ sinh", "CNTT AI", "trường nghề Cần Thơ"],
    authors: [{ name: "Trường Trung cấp Miền Tây" }],
    icons: {
        icon: "/browser_logo.png",
    },
    openGraph: {
        title: "Trường Trung cấp Miền Tây - MTPC",
        description: "Chất lượng là nền tảng - Đào tạo chuyên nghiệp các ngành y tế và công nghệ tại Đồng bằng sông Cửu Long",
        url: "https://mtpc.edu.vn",
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
            <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
            </head>
            <body suppressHydrationWarning style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {children}
            </body>
        </html>
    );
}
