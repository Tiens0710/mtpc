/**
 * AdminSidebar Component
 * 
 * Component hiển thị sidebar navigation cho admin panel
 * Bao gồm:
 * - Header với avatar và thông tin admin
 * - Menu navigation với các mục chính và sub-menu
 * - Active state highlighting dựa trên current path
 * - Logout button ở footer
 * 
 * @component Client Component - cần access pathname từ Next.js router
 */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const ADMIN_USER_KEY = 'mtpc_admin_user';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export default function AdminSidebar() {
    // Lấy pathname hiện tại để highlight menu item đang active
    const pathname = usePathname();
    const router = useRouter();

    /**
     * Cấu hình menu items cho sidebar navigation
     * 
     * Cấu trúc mỗi item:
     * - title: Tên hiển thị của menu item
     * - path: Đường dẫn navigate khi click
     * - icon: Material Symbols icon name
     * - children (optional): Array các sub-menu items
     * 
     * Menu có hierarchical structure với support cho nested items.
     * Item "Tuyển sinh" có children để group các trang liên quan.
     */
    const menuItems = [
        {
            title: 'Tổng quan',  // Dashboard tổng quan
            path: '/admin/index',
            icon: 'dashboard',
        },
        {
            title: 'Chương trình đào tạo',  // Quản lý các chương trình học
            path: '/admin/programs',
            icon: 'school',
        },
        {
            title: 'Tin tức & Sự kiện',  // Quản lý tin tức và sự kiện
            path: '/admin/news',
            icon: 'newspaper',
        },
        {
            title: 'Tuyển sinh',  // Parent item cho các trang tuyển sinh
            path: '/admin/admissions',
            icon: 'how_to_reg',
            children: [  // Sub-menu items
                { title: 'Hỏi đáp (FAQ)', path: '/admin/admissions/faqs', icon: 'quiz' },
            ]
        },
        {
            title: 'Danh sách đăng ký',  // Xem các inquiry/đăng ký từ form
            path: '/admin/inquiries',
            icon: 'list_alt',
        },
    ];

    /**
     * Kiểm tra xem một menu path có đang active không
     * 
     * Logic hoạt động:
     * 1. Đối với trang index (/admin/index):
     *    - Chỉ active khi pathname chính xác là '/admin/index'
     *    - Tránh highlight khi đang ở các trang khác
     * 
     * 2. Đối với các trang khác:
     *    - Active khi pathname bắt đầu với path
     *    - VD: '/admin/programs/create' sẽ highlight menu 'Chương trình đào tạo'
     * 
     * @param path - Đường dẫn của menu item cần kiểm tra
     * @returns true nếu menu item đang active
     */
    const isActive = (path: string) => {
        // Special case cho index page
        if (path === '/admin/index' && pathname === '/admin/index') return true;
        // Các trang khác: check prefix
        if (path !== '/admin/index' && pathname.startsWith(path)) return true;
        return false;
    };

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch {
            // Ignore network errors here; local logout still happens.
        }

        localStorage.removeItem(ADMIN_USER_KEY);
        router.push('/admin');
    };

    return (
        <aside className="admin-sidebar">
            {/* ===== HEADER SECTION ===== */}
            {/* Hiển thị thông tin admin với avatar và title */}
            <div className="sidebar-header">
                <div className="profile-avatar">
                    <span className="material-symbols-outlined">account_circle</span>
                </div>
                <div className="sidebar-header-text">
                    <span className="sidebar-title">MTPC Admin</span>
                    <span className="sidebar-subtitle">Quản trị viên</span>
                </div>
            </div>

            {/* ===== NAVIGATION SECTION ===== */}
            {/* Main menu với support cho nested sub-menu */}
            <nav className="sidebar-nav">
                <ul className="sidebar-list">
                    {menuItems.map((item, index) => (
                        <li key={index} className="sidebar-item">
                            {/* Kiểm tra nếu item có children (sub-menu) */}
                            {item.children ? (
                                <>
                                    {/* Parent item - clickable link */}
                                    <Link
                                        href={item.path}
                                        className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                                    >
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                        <span>{item.title}</span>
                                    </Link>

                                    {/* Sub-menu list - indented children items */}
                                    <ul className="sidebar-sublist">
                                        {item.children.map((child, cIndex) => (
                                            <li key={cIndex}>
                                                <Link
                                                    href={child.path}
                                                    className={`sidebar-link ${isActive(child.path) ? 'active' : ''}`}
                                                >
                                                    <span className="material-symbols-outlined icon-sm">{child.icon}</span>
                                                    {child.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                /* Single level item - không có children */
                                <Link
                                    href={item.path}
                                    className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                                >
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                    {item.title}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* ===== FOOTER SECTION ===== */}
            {/* Logout button - redirect về login page */}
            <div className="sidebar-footer">
                <button type="button" className="sidebar-link logout-btn" onClick={handleLogout}>
                    <span className="material-symbols-outlined">logout</span>
                    Đăng xuất
                </button>
            </div>
        </aside>
    );
}
