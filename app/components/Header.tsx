'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="header">
            {/* Logo */}
            <div className="header-logo">
                <Image
                    src="/logo.png"
                    alt="Logo MTPC"
                    width={180}
                    height={160}
                    className="header-logo-icon"
                    style={{ objectFit: 'contain', height: 'auto' }}
                />
            </div>

            {/* Navigation */}
            <nav className="header-nav">
                <Link href="/" className="nav-link active">Trang Chủ</Link>
                <Link href="/tuyen-sinh" className="nav-link">Tuyển Sinh ▾</Link>
                <Link href="/tin-tuc" className="nav-link">Tin Tức</Link>
                <Link href="/dao-tao" className="nav-link">Đào Tạo</Link>
                <Link href="/lien-he" className="nav-link">Liên Hệ</Link>
            </nav>

            {/* Actions */}
            <div className="header-actions">
                <button className="search-btn" aria-label="Tìm kiếm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                </button>
                <button className="lang-btn">
                    Tiến ▾
                </button>
                <button className="contact-btn">
                    Liên hệ
                </button>
            </div>
        </header>
    );
}
