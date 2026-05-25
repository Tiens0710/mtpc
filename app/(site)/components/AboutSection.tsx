'use client';

import { siteConfig } from '@/lib/site-config';

export default function AboutSection() {
    return (
        <section style={{
            padding: '4rem 2rem',
            background: 'linear-gradient(180deg, #f8fdf8 0%, #ffffff 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative background circles */}
            <div style={{
                position: 'absolute',
                top: '-80px',
                right: '-80px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(46, 125, 50, 0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-60px',
                left: '-60px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(46, 125, 50, 0.03) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
            }}>
                {/* Section Label */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                }}>
                    <div style={{
                        width: '40px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #2E7D32)',
                        borderRadius: '1px',
                    }} />
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#2E7D32',
                        letterSpacing: '2px',
                        textTransform: 'uppercase' as const,
                    }}>
                        Giới thiệu
                    </span>
                    <div style={{
                        width: '40px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #2E7D32, transparent)',
                        borderRadius: '1px',
                    }} />
                </div>

                {/* Description — plain text, no card */}
                <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.9,
                    color: '#374151',
                    textAlign: 'justify' as const,
                    margin: '0 auto',
                    maxWidth: '750px',
                }}>
                    Trường Trung cấp Miền Tây được thành lập theo{' '}
                    <span style={{ fontWeight: 600, color: '#2E7D32' }}>
                        {siteConfig.legal.foundingDecree}
                    </span>
                    ; {siteConfig.legal.amendmentDecree}. Trải qua hơn{' '}
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.1rem 0.5rem',
                        background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                        borderRadius: '6px',
                        fontWeight: 700,
                        color: '#2E7D32',
                        fontSize: '0.95rem',
                    }}>
                        {siteConfig.legal.yearsOfOperation()} năm
                    </span>
                    {' '}phát triển, trường đã không ngừng nỗ lực cung cấp cho học sinh, sinh viên các chương trình đào tạo chất lượng, trang bị kiến thức chuyên môn vững vàng và kỹ năng thực tiễn, đáp ứng nhu cầu ngày càng cao của xã hội.
                </p>

                {/* Tagline */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    marginTop: '1.25rem',
                }}>
                    <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#2E7D32',
                    }} />
                    <span style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#2E7D32',
                        fontStyle: 'italic',
                        letterSpacing: '0.3px',
                    }}>
                        {siteConfig.school.tagline}
                    </span>
                    <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#2E7D32',
                    }} />
                </div>
            </div>
        </section>
    );
}
