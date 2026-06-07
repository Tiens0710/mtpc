'use client';

import { useIsMobile } from '../../hooks/useMediaQuery';
import { siteConfig } from '@/lib/site-config';

export default function VisionMission() {
    const isMobile = useIsMobile();

    return (
        <section style={{
            padding: isMobile ? '2rem 1rem' : '2.5rem 2rem',
            background: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative background circles */}
            <div style={{
                position: 'absolute',
                top: '-120px',
                right: '-120px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(46,125,50,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-80px',
                left: '-80px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(46,125,50,0.03) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: 1100,
                margin: '0 auto',
                position: 'relative',
                transform: isMobile ? 'none' : 'translateX(50px)',
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.75rem' : '2.25rem',
                        fontWeight: 800,
                        color: '#1a1a1a',
                        lineHeight: 1.2,
                    }}>Tầm nhìn & Sứ mệnh</h2>
                    <p style={{
                        marginTop: '0.75rem',
                        color: '#64748b',
                        fontSize: '1rem',
                        maxWidth: 500,
                        margin: '0.75rem auto 0',
                    }}>
                        Định hướng tương lai và cam kết đào tạo của nhà trường
                    </p>
                </div>

                {/* Two-column layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '2rem',
                }}>
                    {/* Vision Card */}
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        border: '2px solid #c8e6c9',
                        padding: isMobile ? '2rem 1.5rem' : '2.5rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(76,175,80,0.12), 0 8px 24px rgba(46,125,50,0.1)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                        {/* Top accent bar — darkest green */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: 'linear-gradient(90deg, #1B5E20, #2E7D32, #4CAF50)',
                        }} />

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            marginBottom: '1.25rem',
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: '0 4px 12px rgba(27,94,32,0.2)',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.4rem', color: 'white' }}>visibility</span>
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: '#1B5E20',
                                margin: 0,
                            }}>
                                Tầm nhìn
                            </h3>
                        </div>

                        <p style={{
                            color: '#475569',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                        }}>
                            {siteConfig.vision}
                        </p>
                    </div>

                    {/* Mission Card */}
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        border: '2px solid #a5d6a7',
                        padding: isMobile ? '2rem 1.5rem' : '2.5rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(129,199,132,0.2), 0 8px 24px rgba(76,175,80,0.12)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                        {/* Top accent bar — lighter green */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: 'linear-gradient(90deg, #2E7D32, #4CAF50, #81C784)',
                        }} />

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            marginBottom: '1.25rem',
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: '0 4px 12px rgba(46,125,50,0.2)',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.4rem', color: 'white' }}>flag</span>
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: '#2E7D32',
                                margin: 0,
                            }}>
                                Sứ mệnh
                            </h3>
                        </div>

                        <p style={{
                            color: '#475569',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                        }}>
                            {siteConfig.mission}
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div style={{
                    marginTop: '3rem',
                    padding: isMobile ? '2rem 1.5rem' : '2.5rem',
                    background: 'linear-gradient(135deg, #1B5E20, #2E7D32, #4CAF50)',
                    borderRadius: '20px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Decorative circles */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        transform: 'translate(30%, -30%)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.03)',
                        transform: 'translate(-30%, 30%)',
                    }} />

                    <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '1.5rem',
                        position: 'relative',
                    }}>Giá trị cốt lõi</h3>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: isMobile ? '0.75rem' : '1rem',
                        position: 'relative',
                    }}>
                        {siteConfig.coreValues.map((value, i) => (
                            <div key={i} style={{
                                padding: '0.7rem 1.5rem',
                                background: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.25)',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                letterSpacing: '0.02em',
                            }}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}