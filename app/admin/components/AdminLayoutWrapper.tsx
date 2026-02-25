'use client';

import { usePathname } from 'next/navigation';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../styles/admin.css'; // Global admin styles

/**
 * Wrapper component cho Admin Layout
 * Xử lý việc hiển thị Header và Sidebar tùy theo đường dẫn (không hiển thị ở trang login)
 */
export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Kiểm tra nếu là trang đăng nhập (đường dẫn là /admin)
    const isLoginPage = pathname === '/admin';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                <AdminHeader />
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
