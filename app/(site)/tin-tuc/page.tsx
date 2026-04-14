'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories, newsData } from './mockData';
import './tin-tuc.css';

export default function TinTucPage() {
    const [allNews, setAllNews] = useState(newsData);
    const [activeCategory, setActiveCategory] = useState('all');
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Fetch real news from backend
    useEffect(() => {
        fetch('http://localhost:4000/api/news')
            .then(res => res.json())
            .then(realNews => {
                if (Array.isArray(realNews)) {
                    const formattedRealNews = realNews.map((item: any) => {
                        const categoryLabel = categories.find(c => c.id === item.category)?.label || item.category;
                        return {
                            id: item.id,
                            category: item.category,
                            categoryLabel,
                            title: item.title,
                            description: item.description,
                            image: item.image || '/slide-1.jpg',
                            link: `/tin-tuc/${item.id}`, // Placeholder link cho tin thật
                            featured: item.featured,
                        };
                    });
                    setAllNews([...formattedRealNews, ...newsData]);
                }
            })
            .catch(err => console.error('Lỗi khi tải tin tức thật:', err));
    }, []);

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
        ? allNews
        : allNews.filter(news => news.category === activeCategory);

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
