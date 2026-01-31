'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Trang Chủ', href: '/', hasDropdown: false },
        {
            label: 'Tuyển Sinh',
            href: '/tuyen-sinh',
            hasDropdown: true,
            dropdownItems: [
                { label: 'Thông tin tuyển sinh', href: '/tuyen-sinh/thong-tin' },
                { label: 'Ngành đào tạo', href: '/tuyen-sinh/nganh-dao-tao' },
                { label: 'Đăng ký trực tuyến', href: '/tuyen-sinh/dang-ky' },
            ]
        },
        { label: 'Tin Tức', href: '/tin-tuc', hasDropdown: false },
        { label: 'Đào Tạo', href: '/dao-tao', hasDropdown: false },
        { label: 'Liên Hệ', href: '/lien-he', hasDropdown: false },
    ];

    return (
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
                <nav className="header-nav-modern">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className="nav-item-wrapper"
                            onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className={`nav-link-modern ${item.href === '/' ? 'active' : ''}`}
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
                                <span className="nav-indicator"></span>
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
                                                <span className="dropdown-icon">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M9 18l6-6-6-6" />
                                                    </svg>
                                                </span>
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
                    <button className="search-btn-modern" aria-label="Tìm kiếm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                    </button>

                    <div className="lang-selector">
                        <button className="lang-btn-modern">
                            <span className="lang-flag">🇻🇳</span>
                            <span className="lang-text">VI</span>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <Link href="/lien-he" className="contact-btn-modern">
                        <span className="btn-text">Liên hệ ngay</span>
                        <span className="btn-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
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
                            className="mobile-nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/lien-he" className="mobile-contact-btn" onClick={() => setIsMobileMenuOpen(false)}>
                        Liên hệ ngay
                    </Link>
                </nav>
            </div>
        </header>
    );
}
