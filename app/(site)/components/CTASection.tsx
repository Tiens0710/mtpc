'use client';

import Link from 'next/link';
import { useIsMobile } from '../../hooks/useMediaQuery';

export default function CTASection() {
    const isMobile = useIsMobile();

    return (
        <section style={{
            padding: isMobile ? '1rem 1rem' : '2rem 2rem',
            background: 'transparent',
            position: 'relative',
            overflow: 'visible',
        }}>
            <div style={{
                maxWidth: '1320px',
                margin: '0 auto',
                position: 'relative',
            }}>
                <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: isMobile ? '340px' : '460px',
                    backgroundImage: `url('/cta.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 30px 80px rgba(15,23,42,0.22)',
                }}>
                    {/* subtle overlay for button contrast only */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(27,94,32,0.18) 0%, rgba(27,94,32,0.08) 40%, rgba(27,94,32,0.02) 100%)' }} />

                    <div style={{
                        position: 'absolute',
                        left: isMobile ? '42%' : '250px',
                        top: isMobile ? '66%' : '62%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                    }}>
                        <Link href="/tuyen-sinh/dang-ky" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: isMobile ? '0.72rem 1.1rem' : '0.95rem 1.6rem', background: '#fff', color: '#1b5e20', borderRadius: '999px', fontWeight: 800, boxShadow: '0 10px 30px rgba(0,0,0,0.14)', textDecoration: 'none' }}>
                            Đăng ký ngay
                        </Link>
                        <Link href="/lien-he" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: isMobile ? '0.8rem 1.1rem' : '1rem 2.5rem',
                            background: '#ffffff',
                            color: '#2E7D32',
                            border: '3px solid #2E7D32',
                            borderRadius: '18px',
                            fontSize: isMobile ? '0.95rem' : '1rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.18s ease',
                        }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
                                <circle cx="12" cy="12" r="10" fill="#0068FF" />
                                <path d="M7 7h10L7 17h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Nhận tư vấn
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}