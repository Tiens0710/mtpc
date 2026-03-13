'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './tin-tuc.css';

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
        <main className="tin-tuc-page">
            {/* Hero Banner */}
            <div className="hero-banner">
                <Image
                    src="/tintuc.png"
                    alt="Tin tức & Sự kiện"
                    fill
                    priority
                    className="hero-banner-image"
                />
                <div className="hero-banner-overlay">
                    <h1 className="hero-banner-title">
                        TIN TỨC & SỰ KIỆN
                    </h1>
                    <p className="hero-banner-subtitle">
                        Cập nhật thông tin mới nhất về hoạt động đào tạo và sự kiện tại Trường Trung cấp Miền Tây
                    </p>
                </div>
            </div>

            <div className="tin-tuc-container">
                {/* Category Tabs */}
                <div className="tabs-wrapper">
                    <div className="tabs" ref={tabsRef}>
                        {categories.map((cat, index) => (
                            <button
                                key={cat.id}
                                ref={(el) => { tabRefs.current[index] = el; }}
                                className={`tab ${activeCategory === cat.id ? 'tab-active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                        {/* Sliding Indicator */}
                        <div
                            className="tab-indicator"
                            style={{
                                left: `${indicatorStyle.left}px`,
                                width: `${indicatorStyle.width}px`,
                            }}
                        />
                    </div>
                </div>

                {/* Featured Section */}
                {featuredNews && (
                    <div className="featured-section">
                        <Link href={featuredNews.link} className="no-underline-link">
                            <div className="featured-image-wrapper">
                                <Image
                                    src={featuredNews.image}
                                    alt={featuredNews.title}
                                    fill
                                    className="featured-image"
                                />
                            </div>
                        </Link>
                        <div className="featured-content">
                            <h1 className="featured-title">{featuredNews.title}</h1>
                            <p className="featured-description">{featuredNews.description}</p>
                            <span className="featured-category">{featuredNews.categoryLabel}</span>
                        </div>
                    </div>
                )}

                {/* News Grid */}
                <div className="news-grid">
                    {gridNews.map((news) => (
                        <Link key={news.id} href={news.link} className="no-underline-link">
                            <div className="news-card">
                                <div className="news-image-wrapper">
                                    <Image
                                        src={news.image}
                                        alt={news.title}
                                        fill
                                        className="news-image"
                                    />
                                </div>
                                <h3 className="news-title">{news.title}</h3>
                                <p className="news-description">{news.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
