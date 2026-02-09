'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Component Header chung cho trang Admin
 * Hiển thị logo và link quay lại dashboard
 */
export default function AdminHeader() {
    return (
        <header className="header-modern" style={{ position: 'sticky', top: 0 }}>
            <div className="header-container">
                {/* Logo */}
                <Link href="/admin/index" className="header-logo-modern">
                    <div className="logo-wrapper">
                        <Image
                            src="/logo.png"
                            alt="MTPC Logo"
                            width={160}
                            height={140}
                            className="header-logo-image"
                            style={{ objectFit: 'contain', height: 'auto' }}
                            priority
                        />
                    </div>
                </Link>
            </div>
        </header>
    );
}
