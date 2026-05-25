'use client';

import { useIsMobile } from '../../hooks/useMediaQuery';

const highlights = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                <path d="M8 7h8M8 11h6" />
            </svg>
        ),
        title: 'Chương trình chất lượng',
        description: 'Đào tạo thực tiễn, sát thực tế',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        title: 'Đội ngũ tận tâm',
        description: 'Giảng viên giàu kinh nghiệm',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <path d="M9 22V12h6v10M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01" />
            </svg>
        ),
        title: 'Cơ sở vật chất hiện đại',
        description: 'Trang thiết bị tiên tiến',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                <path d="M7 11l3 3 7-7" />
            </svg>
        ),
        title: 'Hợp tác doanh nghiệp',
        description: 'Cơ hội thực tập và việc làm',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
            </svg>
        ),
        title: 'Hỗ trợ học viên',
        description: 'Đồng hành trong suốt quá trình học tập',
    },
];

export default function HighlightsSection() {
    const isMobile = useIsMobile();

    return (
        <section style={{
            padding: isMobile ? '1rem 0.75rem' : '1.5rem 2rem',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 50%, #ffffff 100%)',
            position: 'relative',
            zIndex: 10,
            marginTop: isMobile ? '-1.5rem' : '-2rem',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                borderRadius: '14px',
                boxShadow: '0 4px 20px rgba(46, 125, 50, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(46, 125, 50, 0.2)',
                padding: isMobile ? '1rem 0.75rem' : '1rem 1.5rem',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
                    gap: isMobile ? '1rem 0.75rem' : '0',
                }}>
                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: isMobile ? '0.4rem' : '0 0.75rem',
                                borderRight: !isMobile && index < highlights.length - 1
                                    ? '1px solid #e2e8f0'
                                    : 'none',
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '8px',
                                background: '#ffffff',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '0.4rem',
                            }}>
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#1a1a2e',
                                marginBottom: '0.15rem',
                                lineHeight: 1.3,
                            }}>
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                fontSize: '0.65rem',
                                color: '#64748b',
                                lineHeight: 1.3,
                                margin: 0,
                            }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}