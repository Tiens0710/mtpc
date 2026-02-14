/**
 * AdminHeader Component
 * 
 * Component hiển thị header bar ở top của admin panel
 * Bao gồm:
 * - Breadcrumbs navigation: hiển thị đường dẫn hiện tại
 * - Search bar: tìm kiếm nhanh (UI only, chưa functional)
 * - Action icons: thông báo, cài đặt, trợ giúp
 * 
 * Header có position sticky để luôn hiển thị khi scroll
 * 
 * @component Client Component - sử dụng usePathname hook
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminHeader() {
    // Lấy pathname hiện tại để generate breadcrumbs
    const pathname = usePathname();

    /**
     * Generate breadcrumb items dựa trên pathname hiện tại
     * 
     * Logic: Parse pathname và tạo custom breadcrumb cho mỗi section
     * - Luôn có "Trang chủ" làm first breadcrumb
     * - Custom mapping cho: programs, news, admissions (fees/faqs), inquiries
     * - Thêm "Thêm mới" hoặc "Chi tiết" cho create/edit pages
     * 
     * @returns Array of breadcrumb objects {label, path}
     */
    const getBreadcrumbs = () => {
        const pathSegments = pathname.split('/').filter(Boolean);

        // Cấu hình labels và icons cho từng section chính
        const sectionConfig: Record<string, { label: string, icon: string, path: string }> = {
            'programs': { label: 'Chương trình đào tạo', icon: 'school', path: '/admin/programs' },
            'news': { label: 'Tin tức & Sự kiện', icon: 'newspaper', path: '/admin/news' },
            'admissions': { label: 'Tuyển sinh', icon: 'how_to_reg', path: '/admin/admissions' },
            'inquiries': { label: 'Danh sách đăng ký', icon: 'list_alt', path: '/admin/inquiries' },
        };

        let crumbs = [{ label: 'Trang chủ', path: '/admin/index', icon: 'home' }];

        if (pathname === '/admin/index' || pathname === '/admin') return crumbs;

        // Xác định section hiện tại
        const sectionKey = Object.keys(sectionConfig).find(key => pathname.includes(`/${key}`));

        if (sectionKey) {
            const config = sectionConfig[sectionKey];
            crumbs.push({ label: config.label, icon: config.icon, path: config.path });

            // Xử lý các trang con (create, edit, sub-sections)
            if (sectionKey === 'admissions') {
                if (pathname.includes('/fees')) {
                    crumbs.push({ label: 'Học phí', icon: 'payments', path: '/admin/admissions/fees' });
                    if (pathname.includes('/create')) crumbs.push({ label: 'Thêm mới', icon: 'add_circle', path: '#' });
                }
                else if (pathname.includes('/faqs')) {
                    crumbs.push({ label: 'Hỏi đáp (FAQ)', icon: 'quiz', path: '/admin/admissions/faqs' });
                    if (pathname.includes('/create')) crumbs.push({ label: 'Thêm mới', icon: 'add_circle', path: '#' });
                }
            } else {
                if (pathname.includes('/create')) {
                    crumbs.push({ label: 'Thêm mới', icon: 'add_circle', path: '#' });
                } else if (pathSegments.length > 2) {
                    crumbs.push({ label: 'Chỉnh sửa', icon: 'edit_note', path: '#' });
                }
            }
        }

        return crumbs;
    };

    // Generate breadcrumbs dựa trên pathname hiện tại
    const breadcrumbs = getBreadcrumbs();

    return (
        <header className="header-modern">
            <div className="header-layout">
                {/* LEFT: Contextual Breadcrumbs */}
                <div className="header-left">
                    <nav className="header-breadcrumbs" aria-label="Breadcrumb">
                        {breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <div key={index} className="breadcrumb-item">
                                    {index > 0 && (
                                        <span className="material-symbols-outlined breadcrumb-chevron" aria-hidden="true">
                                            chevron_right
                                        </span>
                                    )}
                                    <Link
                                        href={crumb.path}
                                        className={`breadcrumb-link ${isLast ? 'active' : ''}`}
                                        aria-current={isLast ? 'page' : undefined}
                                    >
                                        <span className="material-symbols-outlined breadcrumb-icon">
                                            {crumb.icon}
                                        </span>
                                        <span className="breadcrumb-text">{crumb.label}</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* RIGHT: Search & User Context */}
                <div className="header-right">
                    <div className="header-search-wrapper">
                        <span className="material-symbols-outlined search-icon">search</span>
                        <input
                            type="text"
                            placeholder="Tìm kiếm chức năng..."
                            className="search-input-modern"
                        />
                        <div className="search-badge">
                            <span className="search-badge-text">⌘ K</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
