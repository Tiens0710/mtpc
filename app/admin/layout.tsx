import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Login | MTPC',
    description: 'Trang đăng nhập quản trị viên',
};

import AdminLayoutWrapper from './components/AdminLayoutWrapper';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminLayoutWrapper>
            {children}
        </AdminLayoutWrapper>
    );
}
