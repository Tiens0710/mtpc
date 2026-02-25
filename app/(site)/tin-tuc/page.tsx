'use client';

import { CSSProperties, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Category tabs data
const categories = [
    { id: 'all', label: 'Tất cả tin tức' },
    { id: 'tuyen-sinh', label: 'Tuyển sinh' },
    { id: 'su-kien', label: 'Sự kiện' },
    { id: 'thong-bao', label: 'Thông báo' },
    { id: 'dao-tao', label: 'Đào tạo' },
];

// News data
const newsData = [
    {
        id: 1,
        category: 'tuyen-sinh',
        categoryLabel: 'Tuyển sinh',
        title: 'Trường Trung Cấp Miền Tây công bố thông tin tuyển sinh năm học 2026',
        description: 'Năm học mới sắp đến, trường Trung Cấp Miền Tây chính thức công bố thông tin tuyển sinh với nhiều ngành học mới, đáp ứng nhu cầu thị trường lao động.',
        image: '/slide-1.jpg',
        link: '/tin-tuc/tuyen-sinh-2026',
        featured: true,
    },
    {
        id: 2,
        category: 'su-kien',
        categoryLabel: 'Sự kiện',
        title: 'Lễ tốt nghiệp khóa 2025 - Kết quả học tập ấn tượng',
        description: 'Lễ tốt nghiệp năm nay ghi nhận nhiều sinh viên xuất sắc với thành tích học tập và rèn luyện vượt trội.',
        image: '/slide-3.jpg',
        link: '/tin-tuc/le-tot-nghiep-2025',
    },
    {
        id: 3,
        category: 'dao-tao',
        categoryLabel: 'Đào tạo',
        title: 'Ra mắt chương trình đào tạo liên kết quốc tế mới',
        description: 'Hợp tác với các đối tác quốc tế để mang đến cơ hội học tập chất lượng cao cho sinh viên.',
        image: '/slide (1).jpg',
        link: '/tin-tuc/dao-tao-quoc-te',
    },
    {
        id: 4,
        category: 'thong-bao',
        categoryLabel: 'Thông báo',
        title: 'Thông báo lịch nghỉ Tết Nguyên Đán 2026',
        description: 'Nhà trường thông báo lịch nghỉ Tết và các hoạt động đón xuân cho sinh viên và cán bộ.',
        image: '/slide-1.jpg',
        link: '/tin-tuc/lich-nghi-tet-2026',
    },
    {
        id: 5,
        category: 'su-kien',
        categoryLabel: 'Sự kiện',
        title: 'Hội thảo khoa học công nghệ lần thứ V',
        description: 'Sự kiện quy tụ các chuyên gia đầu ngành chia sẻ kiến thức và xu hướng công nghệ mới nhất.',
        image: '/slide-3.jpg',
        link: '/tin-tuc/hoi-thao-khcn',
    },
];

const styles: { [key: string]: CSSProperties } = {
    page: {
        minHeight: '100vh',
        background: '#FFFFFF',
    },
    // Hero Banner - Clean & Simple
    heroBanner: {
        position: 'relative' as const,
        width: '100%',
        height: '100vh',
        minHeight: '320px',
        maxHeight: '600px',
        overflow: 'hidden' as const,
    },
    heroBannerImage: {
        objectFit: 'cover' as const,
    },
    heroBannerOverlay: {
        position: 'absolute' as const,
        inset: 0,
        background: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center' as const,
        padding: '2rem',
    },
    heroBannerTitle: {
        marginTop: '300px',
        fontSize: '3rem',
        fontWeight: 700,
        color: '#ffffff',
        marginBottom: '1rem',
        letterSpacing: '2px',
    },
    heroBannerSubtitle: {
        fontSize: '1.1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 1.6,
        maxWidth: '600px',
    },
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
    },
    // Category Tabs
    tabsWrapper: {
        borderBottom: '1px solid #E0E0E0',
        marginBottom: '1.5rem',
    },
    tabs: {
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto' as const,
        position: 'relative' as const,
    },
    tabIndicator: {
        position: 'absolute' as const,
        bottom: 0,
        height: '3px',
        background: '#1B5E20',
        transition: 'left 0.3s ease, width 0.3s ease',
        borderRadius: '2px 2px 0 0',
    },
    tab: {
        padding: '1rem 1.5rem',
        fontSize: '0.95rem',
        fontWeight: 500,
        color: '#666',
        background: 'transparent',
        border: 'none',
        borderBottom: '3px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap' as const,
    },
    tabActive: {
        color: '#212121',
        fontWeight: 600,
    },
    // Featured Section
    featuredSection: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '2rem',
        marginBottom: '3rem',
    },
    featuredImageWrapper: {
        position: 'relative' as const,
        width: '100%',
        height: '450px',
        overflow: 'hidden',
    },
    featuredImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
    },
    featuredContent: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        padding: '1rem 0',
    },
    featuredTitle: {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#212121',
        lineHeight: 1.3,
        marginBottom: '1rem',
    },
    featuredDescription: {
        fontSize: '1rem',
        color: '#555',
        lineHeight: 1.6,
        marginBottom: '1.5rem',
    },
    featuredCategory: {
        fontSize: '0.9rem',
        color: '#C62828',
        fontWeight: 500,
    },
    // News Grid
    newsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        paddingBottom: '4rem',
    },
    newsCard: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    newsImageWrapper: {
        position: 'relative' as const,
        width: '100%',
        height: '220px',
        marginBottom: '1rem',
        overflow: 'hidden',
    },
    newsImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
    },
    newsTitle: {
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#212121',
        lineHeight: 1.4,
        marginBottom: '0.5rem',
    },
    newsDescription: {
        fontSize: '0.9rem',
        color: '#666',
        lineHeight: 1.5,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
    },
};

export default function TinTucPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Update indicator position when active tab changes
    useEffect(() => {
        const activeIndex = categories.findIndex(cat => cat.id === activeCategory);
        const activeTab = tabRefs.current[activeIndex];
        const tabsContainer = tabsRef.current;

        if (activeTab && tabsContainer) {
            const containerRect = tabsContainer.getBoundingClientRect();
            const tabRect = activeTab.getBoundingClientRect();
            setIndicatorStyle({
                left: tabRect.left - containerRect.left,
                width: tabRect.width,
            });
        }
    }, [activeCategory]);

    const filteredNews = activeCategory === 'all'
        ? newsData
        : newsData.filter(news => news.category === activeCategory);

    const featuredNews = filteredNews[0];
    const gridNews = filteredNews.slice(1, 4);

    return (
        <main style={styles.page}>
            {/* Hero Banner */}
            <div style={styles.heroBanner}>
                <Image
                    src="/tintuc.png"
                    alt="Tin tức & Sự kiện"
                    fill
                    priority
                    style={styles.heroBannerImage}
                />
                <div style={styles.heroBannerOverlay}>
                    <h1 style={styles.heroBannerTitle}>
                        TIN TỨC & SỰ KIỆN
                    </h1>
                    <p style={styles.heroBannerSubtitle}>
                        Cập nhật thông tin mới nhất về hoạt động đào tạo và sự kiện tại Trường Trung cấp Miền Tây
                    </p>
                </div>
            </div>

            <div style={styles.container}>
                {/* Category Tabs */}
                <div style={styles.tabsWrapper}>
                    <div style={styles.tabs} ref={tabsRef}>
                        {categories.map((cat, index) => (
                            <button
                                key={cat.id}
                                ref={(el) => { tabRefs.current[index] = el; }}
                                style={{
                                    ...styles.tab,
                                    ...(activeCategory === cat.id ? styles.tabActive : {}),
                                }}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                        {/* Sliding Indicator */}
                        <div
                            style={{
                                ...styles.tabIndicator,
                                left: `${indicatorStyle.left}px`,
                                width: `${indicatorStyle.width}px`,
                            }}
                        />
                    </div>
                </div>

                {/* Featured Section */}
                {featuredNews && (
                    <div style={styles.featuredSection}>
                        <Link href={featuredNews.link} style={{ textDecoration: 'none' }}>
                            <div style={styles.featuredImageWrapper}>
                                <Image
                                    src={featuredNews.image}
                                    alt={featuredNews.title}
                                    fill
                                    style={styles.featuredImage}
                                />
                            </div>
                        </Link>
                        <div style={styles.featuredContent}>
                            <h1 style={styles.featuredTitle}>{featuredNews.title}</h1>
                            <p style={styles.featuredDescription}>{featuredNews.description}</p>
                            <span style={styles.featuredCategory}>{featuredNews.categoryLabel}</span>
                        </div>
                    </div>
                )}

                {/* News Grid */}
                <div style={styles.newsGrid}>
                    {gridNews.map((news) => (
                        <Link key={news.id} href={news.link} style={{ textDecoration: 'none' }}>
                            <div style={styles.newsCard}>
                                <div style={styles.newsImageWrapper}>
                                    <Image
                                        src={news.image}
                                        alt={news.title}
                                        fill
                                        style={styles.newsImage}
                                    />
                                </div>
                                <h3 style={styles.newsTitle}>{news.title}</h3>
                                <p style={styles.newsDescription}>{news.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
