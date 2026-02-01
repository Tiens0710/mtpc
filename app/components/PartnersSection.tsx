'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PartnersSection() {
    const [currentSlide, setCurrentSlide] = useState(1);

    // Danh sách logo đối tác - thay bằng ảnh thực tế trong public/partners/
    const partners = [
        { src: '/partners/partner1.png', alt: 'Đối tác 1' },
        { src: '/partners/partner2.png', alt: 'Đối tác 2' },
        { src: '/partners/partner3.png', alt: 'Đối tác 3' },
    ];

    const styles = {
        section: {
            padding: '5rem 2rem',
            background: '#ffffff',
            borderTop: '1px solid #e5e7eb',
        },
        container: {
            maxWidth: '1100px',
            margin: '0 auto',
        },
        header: {
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '4rem',
            alignItems: 'start',
            marginBottom: '4rem',
        },
        titleWrapper: {
            position: 'relative' as const,
        },
        title: {
            fontSize: '2.25rem',
            fontWeight: 700,
            color: '#1e2b58',
            margin: 0,
            lineHeight: 1.3,
            fontStyle: 'italic',
        },
        description: {
            fontSize: '0.95rem',
            color: '#6b7280',
            lineHeight: '1.85',
            margin: 0,
        },
        logosWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            padding: '2rem 0',
        },
        logoItem: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
        },
        dots: {
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
        },
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.titleWrapper}>
                        <h2 style={styles.title}>Các đối tác chiến lược</h2>
                    </div>
                    <p style={styles.description}>
                        Trường tự hào là đối tác của các đại học, viện nghiên cứu, doanh nghiệp, tập đoàn hàng đầu thế giới. Những mối quan hệ đối tác đa dạng nhiều lĩnh vực mở ra nhiều cơ hội cho người học làm giàu thêm kiến thức và trải nghiệm toàn cầu của chính mình.
                    </p>
                </div>

                {/* Partner Logos */}
                <div style={styles.logosWrapper}>
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            style={styles.logoItem}
                        >
                            <Image
                                src={partner.src}
                                alt={partner.alt}
                                width={100}
                                height={60}
                                style={{
                                    objectFit: 'contain',
                                    opacity: 0.7,
                                    filter: 'grayscale(20%)',
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Dots Navigation */}
                <div style={styles.dots}>
                    {[0, 1, 2].map((index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            style={{
                                width: index === currentSlide ? '24px' : '10px',
                                height: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                background: index === currentSlide ? '#81C784' : '#E0E0E0',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
