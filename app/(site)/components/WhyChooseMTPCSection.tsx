'use client';

import { useIsMobile } from '../../hooks/useMediaQuery';

const features = [
    {
        badge: 'Thực hành',
        icon: (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
        ),
        title: '70% thực hành',
        description: 'Học đi đôi với làm, tăng cường kỹ năng nghề ngay trong quá trình học.',
        accent: '#2E7D32',
    },
    {
        badge: 'Việc làm',
        icon: (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        title: '98% có việc làm',
        description: 'Kết nối doanh nghiệp và cơ sở y tế, đồng hành cùng sinh viên sau tốt nghiệp.',
        accent: '#1565c0',
    },
    {
        badge: 'Học phí',
        icon: (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1v22" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        title: 'Học phí linh hoạt',
        description: 'Có lộ trình hỗ trợ phù hợp để giảm áp lực tài chính cho học viên.',
        accent: '#e65100',
    },
    {
        badge: 'Liên thông',
        icon: (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                <path d="M8 7h8M8 11h6" />
            </svg>
        ),
        title: 'Liên thông ĐH',
        description: 'Mở rộng cơ hội học lên bậc cao hơn sau khi hoàn thành chương trình trung cấp.',
        accent: '#6a1b9a',
    },
];

export default function WhyChooseMTPCSection() {
    const isMobile = useIsMobile();

    return (
        <section style={{
            padding: isMobile ? '3rem 1rem' : '5rem 2rem',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fdf8 45%, #ffffff 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute',
                top: '-120px',
                left: '-120px',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(46, 125, 50, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-100px',
                right: '-100px',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(21, 101, 192, 0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1220px', margin: '0 auto', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3rem' }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.45rem 1rem',
                        background: '#e8f5e9',
                        color: '#2E7D32',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        marginBottom: '1rem',
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>verified</span>
                        Lý do chọn MTPC
                    </span>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : '2.6rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        lineHeight: 1.2,
                        margin: 0,
                    }}>
                        Tại sao chọn <span style={{ color: '#2E7D32' }}>MTPC?</span>
                    </h2>
                    <p style={{
                        maxWidth: '720px',
                        margin: '0.9rem auto 0',
                        color: '#64748b',
                        fontSize: isMobile ? '0.98rem' : '1.05rem',
                        lineHeight: 1.7,
                    }}>
                        Những điểm nổi bật giúp học viên yên tâm theo học và sẵn sàng bước vào môi trường làm việc thực tế.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                    gap: isMobile ? '0.9rem' : '1rem',
                }}>
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            style={{
                                background: '#ffffff',
                                borderRadius: '20px',
                                padding: '1.35rem 1.35rem 1.4rem',
                                border: '1px solid rgba(46, 125, 50, 0.14)',
                                boxShadow: '0 10px 28px rgba(15, 23, 42, 0.05)',
                                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                                minHeight: isMobile ? 'auto' : '235px',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.transform = 'translateY(-5px)';
                                event.currentTarget.style.boxShadow = `0 18px 40px ${feature.accent}14`;
                                event.currentTarget.style.borderColor = `${feature.accent}33`;
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.transform = 'translateY(0)';
                                event.currentTarget.style.boxShadow = '0 10px 28px rgba(15, 23, 42, 0.05)';
                                event.currentTarget.style.borderColor = 'rgba(46, 125, 50, 0.14)';
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: `linear-gradient(90deg, ${feature.accent}, ${feature.accent}80)`,
                            }} />
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                padding: '0.28rem 0.7rem',
                                borderRadius: '999px',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                color: feature.accent,
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                letterSpacing: '0.02em',
                                marginTop: '0.3rem',
                                marginBottom: '1rem',
                                width: 'fit-content',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>verified</span>
                                {feature.badge}
                            </div>

                            <div style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '16px',
                                background: `${feature.accent}12`,
                                color: feature.accent,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.7)',
                                marginBottom: '1rem',
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.05rem',
                                fontWeight: 800,
                                color: '#0f172a',
                                marginBottom: '0.55rem',
                                lineHeight: 1.35,
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                fontSize: '0.92rem',
                                color: '#475569',
                                lineHeight: 1.7,
                                margin: 0,
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}