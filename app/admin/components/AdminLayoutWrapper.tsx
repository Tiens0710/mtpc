'use client';

import { usePathname } from 'next/navigation';
import AdminHeader from './AdminHeader';

/**
 * Wrapper component cho Admin Layout
 * Xử lý việc hiển thị Header tùy theo đường dẫn (không hiển thị ở trang login)
 */
export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Kiểm tra nếu là trang đăng nhập (đường dẫn là /admin)
    const isLoginPage = pathname === '/admin';

    return (
        <>
            {!isLoginPage && <AdminHeader />}
            {children}
        </>
    );
}
