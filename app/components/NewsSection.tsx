'use client';

import { CSSProperties, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const styles: { [key: string]: CSSProperties } = {
    section: {
        padding: '4rem 3rem',
        background: '#FFFFFF',
    },
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '2.25rem',
        fontWeight: 700,
        color: '#212121',
    },
    viewAll: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#212121',
        fontSize: '0.95rem',
        textDecoration: 'none',
    },
    viewAllBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        background: '#C62828',
        borderRadius: '6px',
        color: 'white',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
    },
    // Featured card (left)
    featuredCard: {
        display: 'flex',
        flexDirection: 'column' as const,
        borderRadius: '12px',
        overflow: 'hidden',
        height: '100%',
        background: '#FFFFFF',
    },
    featuredImageWrapper: {
        position: 'relative' as const,
        width: '100%',
        height: '420px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    },
    featuredImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
    },
    featuredContent: {
        padding: '1.25rem 0',
    },
    featuredCategory: {
        display: 'inline-block',
        fontSize: '1.15rem',
        fontWeight: 600,
        color: '#C62828',
        textTransform: 'uppercase' as const,
        marginBottom: '0.5rem',
        letterSpacing: '0.5px',
    },
    featuredTitle: {
        fontSize: '1.4rem',
        fontWeight: 700,
        color: '#212121',
        lineHeight: 1.35,
        marginTop: '0.5rem',
    },
    // Right side list
    rightColumn: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
    },
    // Small news item
    newsItem: {
        display: 'flex',
        gap: '1rem',
        padding: '0.75rem',
        borderRadius: '8px',
        transition: 'background 0.2s ease',
    },
    newsThumb: {
        position: 'relative' as const,
        width: '140px',
        height: '95px',
        borderRadius: '0',
        overflow: 'hidden',
        flexShrink: 0,
    },
    newsContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
    },
    newsCategory: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#C62828',
        textTransform: 'uppercase' as const,
        marginBottom: '0.35rem',
        letterSpacing: '0.5px',
    },
    newsTitle: {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#212121',
        lineHeight: 1.4,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
    },
};

const newsItems = [
    {
        id: 1,
        category: 'Tuyển sinh',
        title: 'Trường Trung Cấp Miền Tây công bố thông tin tuyển sinh đại học chính quy 2026',
        image: '/slide-1.jpg',
        link: '/tin-tuc/tuyen-sinh-2026',
        featured: true,
    },
    {
        id: 2,
        category: 'Tuyển sinh',
        title: 'Trường Trung Cấp Miền Tây công bố thông tin tuyển sinh đại học chính quy 2026',
        image: '/slide-1.jpg',
        link: '/tin-tuc/tuyen-sinh-2026',
    },
    {
        id: 3,
        category: 'Phát triển bền vững',
        title: 'Dấu ấn sinh viên Miền Tây tại Giải thưởng "Cống hiến vì cộng đồng" 2025',
        image: '/slide-3.jpg',
        link: '/tin-tuc/giai-thuong-cong-dong',
    },
    {
        id: 4,
        category: 'Đảm bảo chất lượng',
        title: 'Sinh viên Miền Tây tiếp cận bức tranh thực tế của ngành điện ảnh cùng Beta...',
        image: '/slide (1).jpg',
        link: '/tin-tuc/thuc-te-dien-anh',
    },
    {
        id: 5,
        category: 'Nghiên cứu - Đổi mới sáng tạo',
        title: 'Trường Trung Cấp Miền Tây thúc đẩy nâng cao năng lực thống kê ứng dụng cho...',
        image: '/slide-1.jpg',
        link: '/tin-tuc/nang-luc-thong-ke',
    },
];

export default function NewsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const featuredItems = newsItems.slice(0, 3); // First 2 items for slideshow
    const sideNews = newsItems.slice(1, 6);

    // Auto-cycle slideshow
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredItems.length]);

    const currentFeatured = featuredItems[currentSlide];

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.title}>Tin tức & Sự kiện nổi bật</h2>
                    <Link href="/tin-tuc" style={styles.viewAll}>
                        <span>Xem toàn bộ Tin tức & Sự kiện</span>
                        <span style={styles.viewAllBtn}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </span>
                    </Link>
                </div>

                {/* Grid Layout */}
                <div style={styles.grid}>
                    {/* Featured Card - Slideshow */}
                    <div style={{ position: 'relative' }}>
                        <Link href={currentFeatured.link} style={{ textDecoration: 'none' }}>
                            <div style={styles.featuredCard}>
                                <div style={styles.featuredImageWrapper}>
                                    <Image
                                        src={currentFeatured.image}
                                        alt={currentFeatured.title}
                                        fill
                                        style={styles.featuredImage}
                                    />
                                </div>
                                <div style={styles.featuredContent}>
                                    <span style={styles.featuredCategory}>{currentFeatured.category}</span>
                                    <h3 style={styles.featuredTitle}>{currentFeatured.title}</h3>
                                </div>
                            </div>
                        </Link>
                        {/* Slideshow Dots */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginTop: '1rem',
                        }}>
                            {featuredItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    style={{
                                        width: index === currentSlide ? '24px' : '10px',
                                        height: '10px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        background: index === currentSlide ? '#C62828' : '#E0E0E0',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column - List */}
                    <div style={styles.rightColumn}>
                        {sideNews.map((news) => (
                            <Link key={news.id} href={news.link} style={{ textDecoration: 'none' }}>
                                <div style={styles.newsItem}>
                                    <div style={styles.newsThumb}>
                                        <Image
                                            src={news.image}
                                            alt={news.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={styles.newsContent}>
                                        <span style={styles.newsCategory}>{news.category}</span>
                                        <h4 style={styles.newsTitle}>{news.title}</h4>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
