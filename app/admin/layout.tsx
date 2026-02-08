import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Admin Login | MTPC',
    description: 'Trang đăng nhập quản trị viên',
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <body>
                {children}
            </body>
        </html>
    );
}
