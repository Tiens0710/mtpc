'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { searchContent, SearchItem } from '../../data/search';

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

    // Search state
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const navItems = [
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
            dropdownItems: [
                { label: 'Thông tin tuyển sinh', href: '/tuyen-sinh' },
                { label: 'Đăng ký xét tuyển', href: '/tuyen-sinh#dang-ky' },
            ]
        },
        {
            label: 'Ngành đào tạo',
            href: '/nganh-dao-tao',
            hasDropdown: true,
            dropdownItems: [
                { label: 'Y sĩ đa khoa', href: '/nganh-dao-tao/y-si-da-khoa' },
                { label: 'Dược sĩ trung học', href: '/nganh-dao-tao/duoc-si-trung-hoc' },
                { label: 'Điều dưỡng', href: '/nganh-dao-tao/dieu-duong' },
                { label: 'Hộ sinh', href: '/nganh-dao-tao/ho-sinh' },
                { label: 'CNTT - Ứng dụng AI', href: '/nganh-dao-tao/cong-nghe-thong-tin-ung-dung-ai' },
            ]
        },
        { label: 'Tin tức', href: '/tin-tuc', hasDropdown: false },
        { label: 'Sinh viên', href: '/sinh-vien', hasDropdown: false },
    ];

    // Find current active index based on pathname
    const getActiveIndex = useCallback(() => {
        const index = navItems.findIndex(item => 
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        );
        return index;
    }, [pathname]);

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
    }, [hoveredIndex, pathname]);

    // Search handlers
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Compute search results with useMemo to avoid setState in effect
    const computedResults = useMemo(() => searchContent(searchQuery), [searchQuery]);
    useEffect(() => {
        setSearchResults(computedResults);
    }, [computedResults]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

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
                                    if (item.hasDropdown) setActiveDropdown(item.label);
                                }}
                                onMouseLeave={() => {
                                    setHoveredIndex(null);
                                    setActiveDropdown(null);
                                }}
                            >
                                <Link
                                    href={item.href}
                                    className={`nav-link-modern ${(item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)) ? 'active' : ''}`}
                                >
                                    <span className="nav-text">{item.label}</span>
                                    {item.hasDropdown && (
                                        <svg
                                            className={`dropdown-arrow ${activeDropdown === item.label ? 'rotate' : ''}`}
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                        >
                                            <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                {item.hasDropdown && item.dropdownItems && (
                                    <div className={`dropdown-menu ${activeDropdown === item.label ? 'show' : ''}`}>
                                        <div className="dropdown-content">
                                            {item.dropdownItems.map((dropItem, dropIndex) => (
                                                <Link
                                                    key={dropIndex}
                                                    href={dropItem.href}
                                                    className="dropdown-link"
                                                >
                                                    {dropItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
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
                            {searchQuery && searchResults.length === 0 && (
                                <div className="search-no-results">
                                    <p>Không tìm thấy kết quả cho &quot;{searchQuery}&quot;</p>
                                </div>
                            )}

                            {searchResults.map((result) => (
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
