import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Login | MTPC',
    description: 'Trang đăng nhập quản trị viên',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
