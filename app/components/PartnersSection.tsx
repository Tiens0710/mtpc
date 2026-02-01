'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PartnersSection() {
    const [offset, setOffset] = useState(0);

    // Danh sách logo đối tác
    const partners = [
        { src: '/ctump.jpg', alt: 'Trường Đại học Y Dược Cần Thơ', name: 'Trường Đại học Y Dược Cần Thơ' },
        { src: '/ctump.jpg', alt: 'Đối tác 2', name: 'Đối tác 2' },
        { src: '/ctump.jpg', alt: 'Đối tác 3', name: 'Đối tác 3' },
    ];

    // Duplicate for infinite scroll effect
    const extendedPartners = [...partners, ...partners];

    // Auto scroll từng logo
    useEffect(() => {
        const timer = setInterval(() => {
            setOffset((prev) => {
                const next = prev + 1;
                // Reset về đầu khi đã scroll hết danh sách gốc
                if (next >= partners.length) {
                    return 0;
                }
                return next;
            });
        }, 2500);
        return () => clearInterval(timer);
    }, [partners.length]);

    const logoWidth = 220; // width của mỗi logo item (bao gồm gap)

    const styles = {
        section: {
            padding: '3rem 2rem',
            background: 'linear-gradient(180deg, #f8fafa 0%, #ffffff 100%)',
            position: 'relative' as const,
            overflow: 'hidden' as const,
        },
        waveTop: {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: '80px',
            background: 'linear-gradient(180deg, rgba(46, 125, 50, 0.03) 0%, transparent 100%)',
            pointerEvents: 'none' as const,
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative' as const,
            zIndex: 10,
        },
        header: {
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '3rem',
            alignItems: 'start',
            marginBottom: '4rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(46, 125, 50, 0.1)',
        },
        titleWrapper: {
            position: 'relative' as const,
        },
        title: {
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#1e2b58',
            margin: 0,
            lineHeight: 1.3,
            fontStyle: 'italic',
        },
        titleDecor: {
            position: 'absolute' as const,
            left: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '4px',
            height: '60%',
            background: 'linear-gradient(180deg, #2E7D32, #81C784)',
            borderRadius: '2px',
        },
        description: {
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.8',
            margin: 0,
        },
        highlight: {
            color: '#2E7D32',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
        },
        carouselContainer: {
            overflow: 'hidden' as const,
            position: 'relative' as const,
            margin: '0 -2rem',
            padding: '0 2rem',
        },
        carouselTrack: {
            display: 'flex',
            gap: '4rem',
            transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
            transform: `translateX(-${offset * logoWidth}px)`,
        },
        logoItem: {
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            width: '160px',
        },
        logoName: {
            fontSize: '0.85rem',
            color: '#4b5563',
            textAlign: 'center' as const,
            maxWidth: '160px',
            lineHeight: 1.4,
        },
        dots: {
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '3rem',
        },
    };

    return (
        <section style={styles.section}>
            <div style={styles.waveTop} />

            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.titleWrapper}>
                        <div style={styles.titleDecor} />
                        <h2 style={styles.title}>Các đối tác chiến lược</h2>
                    </div>
                    <p style={styles.description}>
                        Trường tự hào là đối tác của các đại học, viện nghiên cứu, doanh nghiệp, tập đoàn hàng đầu thế giới. Những mối quan hệ đối tác đa dạng <span style={styles.highlight}>nhiều lĩnh vực</span> mở ra <span style={styles.highlight}>nhiều cơ hội</span> cho người học làm giàu thêm kiến thức và trải nghiệm toàn cầu của chính <span style={styles.highlight}>mình</span>.
                    </p>
                </div>

                {/* Carousel */}
                <div style={styles.carouselContainer}>
                    <div style={styles.carouselTrack}>
                        {extendedPartners.map((partner, index) => (
                            <div key={index} style={styles.logoItem}>
                                <Image
                                    src={partner.src}
                                    alt={partner.alt}
                                    width={120}
                                    height={120}
                                    style={{
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                    }}
                                />
                                <span style={styles.logoName}>{partner.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Navigation */}
                <div style={styles.dots}>
                    {partners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setOffset(index)}
                            style={{
                                width: index === offset % partners.length ? '24px' : '10px',
                                height: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                background: index === offset % partners.length ? '#2E7D32' : '#E0E0E0',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            aria-label={`Logo ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
