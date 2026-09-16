'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { searchContent } from '../../data/search';

type MenuLink = {
    label: string;
    href: string;
};

type MegaMenuSection = {
    title: string;
    icon: string;
    links: MenuLink[];
    more?: MenuLink;
};

type NavItem = {
    label: string;
    href: string;
    hasDropdown: boolean;
    megaMenu?: {
        title: string;
        sections: MegaMenuSection[];
    };
};

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const navRef = useRef<HTMLElement>(null);
    const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const megaCloseButtonRef = useRef<HTMLButtonElement>(null);

    // Search state
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    const navItems: NavItem[] = useMemo(() => [
        { label: 'Trang Chủ', href: '/', hasDropdown: false },
        {
            label: 'Giới thiệu',
            href: '/gioi-thieu',
            hasDropdown: false,
        },
        {
            label: 'Tuyển Sinh',
            href: '/tuyen-sinh',
            hasDropdown: true,
            megaMenu: {
                title: 'Tuyển sinh',
                sections: [
                    {
                        title: 'Bắt đầu hồ sơ',
                        icon: 'how_to_reg',
                        links: [
                            { label: 'Tổng quan tuyển sinh', href: '/tuyen-sinh' },
                            { label: 'Điều kiện và hồ sơ', href: '/tuyen-sinh#conditions' },
                            { label: 'Đăng ký xét tuyển', href: '/tuyen-sinh#dang-ky' },
                        ],
                        more: { label: 'Xem hướng dẫn tuyển sinh', href: '/tuyen-sinh' },
                    },
                    {
                        title: 'Thông tin cần biết',
                        icon: 'info',
                        links: [
                            { label: 'Các ngành đang tuyển', href: '/tuyen-sinh#majors' },
                            { label: 'Học phí và chính sách', href: '/tuyen-sinh#tuition' },
                            { label: 'Liên hệ tư vấn', href: '/lien-he' },
                        ],
                        more: { label: 'Liên hệ phòng tuyển sinh', href: '/lien-he' },
                    },
                ],
            },
        },
        {
            label: 'Ngành đào tạo',
            href: '/nganh-dao-tao',
            hasDropdown: true,
            megaMenu: {
                title: 'Ngành đào tạo',
                sections: [
                    {
                        title: 'Trung cấp chính quy',
                        icon: 'school',
                        links: [
                            { label: 'Y sĩ đa khoa', href: '/nganh-dao-tao/y-si-da-khoa' },
                            { label: 'Dược sĩ trung học', href: '/nganh-dao-tao/duoc-si-trung-hoc' },
                            { label: 'Điều dưỡng', href: '/nganh-dao-tao/dieu-duong' },
                            { label: 'Hộ sinh', href: '/nganh-dao-tao/ho-sinh' },
                            { label: 'CNTT, định hướng AI', href: '/nganh-dao-tao/cong-nghe-thong-tin-ung-dung-ai' },
                        ],
                        more: { label: 'Xem tất cả ngành đào tạo', href: '/nganh-dao-tao' },
                    },
                    {
                        title: 'Khóa học ngắn hạn',
                        icon: 'workspace_premium',
                        links: [
                            { label: 'Trợ thủ nha khoa', href: '/nganh-dao-tao/tro-thu-nha-khoa' },
                            { label: 'Xoa bóp vật lý trị liệu', href: '/nganh-dao-tao/xoa-bop-vat-ly-tri-lieu' },
                            { label: 'Điều dưỡng hồi sức cấp cứu', href: '/nganh-dao-tao/dieu-duong-hoi-suc-cap-cuu' },
                            { label: 'Thư ký y khoa', href: '/nganh-dao-tao/thu-ky-y-khoa' },
                        ],
                        more: { label: 'Xem tất cả khóa học ngắn hạn', href: '/nganh-dao-tao' },
                    },
                ],
            },
        },
        { label: 'Cập nhật kiến thức (CME)', href: '/cme', hasDropdown: false },
        { label: 'Tin tức', href: '/tin-tuc', hasDropdown: false },
        { label: 'Sinh viên', href: '/sinh-vien', hasDropdown: false },
    ], []);

    // Find current active index based on pathname
    const getActiveIndex = useCallback(() => {
        const index = navItems.findIndex(item => 
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        );
        return index;
    }, [navItems, pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update indicator position when hovering or when pathname changes
    useEffect(() => {
        const activeIndex = hoveredIndex !== null ? hoveredIndex : getActiveIndex();
        const activeItem = navItemRefs.current[activeIndex];
        const nav = navRef.current;

        if (activeItem && nav) {
            const navRect = nav.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            setIndicatorStyle({
                left: itemRect.left - navRect.left,
                width: itemRect.width,
                opacity: 1,
            });
        } else {
            setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        }
    }, [hoveredIndex, getActiveIndex]);

    // Search handlers
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Compute search results with useMemo to avoid setState in effect
    const computedResults = useMemo(() => searchContent(searchQuery), [searchQuery]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setActiveDropdown(null);
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    useEffect(() => {
        if (activeDropdown) megaCloseButtonRef.current?.focus();
    }, [activeDropdown]);

    useEffect(() => {
        const shouldLockScroll = Boolean(activeDropdown) || isMobileMenuOpen;
        if (!shouldLockScroll) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [activeDropdown, isMobileMenuOpen]);

    const handleSearchClick = (href: string) => {
        setIsSearchOpen(false);
        setSearchQuery('');
        router.push(href);
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'page': return 'Trang';
            case 'program': return 'Ngành học';
            case 'news': return 'Tin tức';
            default: return '';
        }
    };

    const activeMegaMenuItem = navItems.find((item) => item.label === activeDropdown);
    const activeMegaMenu = activeMegaMenuItem?.megaMenu;
    const activeMegaMenuIndex = activeMegaMenuItem ? navItems.indexOf(activeMegaMenuItem) : -1;

    return (
        <>
            <header className={`header-modern ${isScrolled ? 'header-scrolled' : ''}`}>
                <div className="header-container">
                    {/* Logo */}
                    <Link href="/" className="header-logo-modern">
                        <div className="logo-wrapper">
                            <Image
                                src="/logo.png"
                                alt="Logo MTPC"
                                width={160}
                                height={140}
                                className="header-logo-image"
                                style={{ objectFit: 'contain', height: 'auto' }}
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="header-nav-modern" ref={navRef}>
                        {/* Sliding Indicator */}
                        <div
                            className="nav-sliding-indicator"
                            style={{
                                left: `${indicatorStyle.left}px`,
                                width: `${indicatorStyle.width}px`,
                                opacity: indicatorStyle.opacity,
                            }}
                        />

                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                ref={(el) => { navItemRefs.current[index] = el; }}
                                className="nav-item-wrapper"
                                onMouseEnter={() => {
                                    setHoveredIndex(index);
                                }}
                                onMouseLeave={() => {
                                    setHoveredIndex(null);
                                }}
                            >
                                {item.hasDropdown ? (
                                    <button
                                        type="button"
                                        className={`nav-link-modern ${(item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)) ? 'active' : ''} ${activeDropdown === item.label ? 'menu-open' : ''}`}
                                        aria-expanded={activeDropdown === item.label}
                                        aria-controls={`mega-menu-${index}`}
                                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                                    >
                                        <span className="nav-text">{item.label}</span>
                                        <svg
                                            className={`dropdown-arrow ${activeDropdown === item.label ? 'rotate' : ''}`}
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`nav-link-modern ${(item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)) ? 'active' : ''}`}
                                    >
                                        <span className="nav-text">{item.label}</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="header-actions-modern">
                        <button
                            className="search-btn-modern"
                            aria-label="Tìm kiếm"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                        </button>

                        <div className="lang-selector">
                            <button className="lang-btn-modern">
                                <span className="lang-text">VI</span>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        <Link
                            href="/tuyen-sinh"
                            className="verify-btn-modern"
                        >
                            <span className="btn-text">Xét tuyển ngay</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>
                </div>

                {activeMegaMenu && activeMegaMenuItem && (
                    <div className="mega-menu-overlay" role="presentation">
                        <button
                            type="button"
                            className="mega-menu-backdrop"
                            aria-label="Đóng menu"
                            onClick={() => setActiveDropdown(null)}
                        />
                        <aside
                            id={`mega-menu-${activeMegaMenuIndex}`}
                            className="mega-menu-panel"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={`mega-menu-title-${activeMegaMenuIndex}`}
                        >
                            <div className="mega-menu-panel-header">
                                <div>
                                    <h2 id={`mega-menu-title-${activeMegaMenuIndex}`}>{activeMegaMenu.title}</h2>
                                </div>
                                <button
                                    ref={megaCloseButtonRef}
                                    type="button"
                                    className="mega-menu-close"
                                    aria-label="Đóng menu"
                                    onClick={() => setActiveDropdown(null)}
                                >
                                    <span className="material-symbols-outlined" aria-hidden="true">close</span>
                                </button>
                            </div>

                            <div className="mega-menu-overview">
                                <Link href={activeMegaMenuItem.href} onClick={() => setActiveDropdown(null)}>
                                    Tổng quan
                                    <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                                </Link>
                            </div>

                            <div className="mega-menu-sections">
                                {activeMegaMenu.sections.map((section) => (
                                    <section className="mega-menu-section" key={section.title}>
                                        <div className="mega-menu-section-heading">
                                            <span className="material-symbols-outlined" aria-hidden="true">{section.icon}</span>
                                            <h3>{section.title}</h3>
                                        </div>
                                        <div className="mega-menu-links">
                                            {section.links.map((link) => (
                                                <Link key={link.href} href={link.href} onClick={() => setActiveDropdown(null)}>
                                                    <span>{link.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                        {section.more && (
                                            <Link className="mega-menu-more" href={section.more.href} onClick={() => setActiveDropdown(null)}>
                                                <span>{section.more.label}</span>
                                            </Link>
                                        )}
                                    </section>
                                ))}
                            </div>
                        </aside>
                    </div>
                )}

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <nav className="mobile-nav">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`mobile-nav-link ${(item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)) ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link href="/tuyen-sinh" className="mobile-verify-btn" onClick={() => setIsMobileMenuOpen(false)}>
                            Xét tuyển ngay
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Search Modal */}
            {isSearchOpen && (
                <div className="search-modal-overlay" onClick={() => setIsSearchOpen(false)}>
                    <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="search-modal-header">
                            <div className="search-input-wrapper">
                                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    className="search-modal-input"
                                    placeholder="Tìm kiếm ngành học, thông tin tuyển sinh..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="search-close-btn" onClick={() => setIsSearchOpen(false)}>
                                    ESC
                                </button>
                            </div>
                        </div>

                        <div className="search-results">
                            {searchQuery && computedResults.length === 0 && (
                                <div className="search-no-results">
                                    <p>Không tìm thấy kết quả cho &quot;{searchQuery}&quot;</p>
                                </div>
                            )}

                            {computedResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="search-result-item"
                                    onClick={() => handleSearchClick(result.href)}
                                >
                                    <div className="search-result-content">
                                        <span className="search-result-category">{getCategoryLabel(result.category)}</span>
                                        <h4 className="search-result-title">{result.title}</h4>
                                        <p className="search-result-desc">{result.description}</p>
                                    </div>
                                    <svg className="search-result-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </div>
                            ))}

                            {!searchQuery && (
                                <div className="search-suggestions">
                                    <p className="search-suggestions-title">Gợi ý tìm kiếm:</p>
                                    <div className="search-tags">
                                        {['Tuyển sinh', 'Y sĩ', 'Điều dưỡng', 'Học phí', 'Đăng ký'].map((tag) => (
                                            <button
                                                key={tag}
                                                className="search-tag"
                                                onClick={() => setSearchQuery(tag)}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
