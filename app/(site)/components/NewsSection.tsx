'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useIsMobile } from '../../hooks/useMediaQuery';
import GreenBorderCard from './GreenBorderCard';

interface NewsItem {
    id: number;
    category: string;
    title: string;
    image: string;
    link: string;
    date?: string;
    featured?: boolean;
}

const newsItems: NewsItem[] = [
    {
        id: 1,
        category: 'Tuyển sinh',
        title: 'Trường Trung Cấp Miền Tây công bố thông tin tuyển sinh chính quy năm 2026',
        image: '/slide-1.jpg',
        link: '/tin-tuc/tuyen-sinh-2026',
        date: '15/05/2026',
        featured: true,
    },
    {
        id: 2,
        category: 'Hoạt động',
        title: 'Lễ tốt nghiệp đợt 1 năm 2025 — Hành trình vươn ra biển lớn',
        image: '/slide-3.jpg',
        link: '/tin-tuc/le-tot-nghiep-2025',
        date: '10/02/2025',
    },
    {
        id: 3,
        category: 'Sự kiện',
        title: 'MTPC ký kết hợp tác chiến lược với doanh nghiệp Nhật Bản',
        image: '/slide (1).jpg',
        link: '/tin-tuc/ky-ket-hop-tac',
        date: '25/01/2025',
    },
    {
        id: 4,
        category: 'Đào tạo',
        title: 'Hội thảo định hướng nghề nghiệp ngành Y sĩ đa khoa năm 2026',
        image: '/slide3.jpg',
        link: '/tin-tuc/hoi-thao-nghe-nghiep',
        date: '08/02/2025',
    },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
    'Tuyển sinh': { bg: '#e8f5e9', text: '#2E7D32' },
    'Hoạt động': { bg: '#e3f2fd', text: '#1565c0' },
    'Sự kiện': { bg: '#fff3e0', text: '#e65100' },
    'Đào tạo': { bg: '#f3e5f5', text: '#6a1b9a' },
};

function getCategoryStyle(cat: string) {
    return categoryColors[cat] || { bg: '#f5f5f5', text: '#616161' };
}

export default function NewsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const isMobile = useIsMobile();
    const featuredItems = newsItems.filter((n) => n.featured || n.id <= 2);
    const sideNews = newsItems.filter((n) => !n.featured && n.id > 1);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredItems.length]);

    const currentFeatured = featuredItems[currentSlide];

    return (
        <section style={{
            padding: isMobile ? '3rem 1rem' : '5rem 3rem',
            background: '#f8fafb',
        }}>
            <div style={{ maxWidth: 1300, margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '2.5rem',
                }}>
                    <div>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.35rem 1rem',
                            background: '#e8f5e9',
                            color: '#2E7D32',
                            borderRadius: '20px',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            marginBottom: '0.75rem',
                            letterSpacing: '0.03em',
                        }}>TIN TỨC</span>
                        <h2 style={{
                            fontSize: isMobile ? '1.75rem' : '2.25rem',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            lineHeight: 1.2,
                        }}>Tin tức & Sự kiện nổi bật</h2>
                    </div>
                    <Link href="/tin-tuc" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#2E7D32',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        transition: 'gap 0.2s ease',
                    }}>
                        Xem tất cả
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                </div>

                {/* Grid Layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '1.5rem',
                    alignItems: 'stretch',
                }}>
                    {/* Featured Card — Slideshow */}
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <GreenBorderCard
                            hoverable
                            padding="0"
                            borderRadius="16px"
                            style={{ flex: 1, border: '2px solid #c8e6c9' }}
                        >
                            <Link href={currentFeatured.link} style={{ textDecoration: 'none', display: 'block' }}>
                                <div style={{
                                    position: 'relative',
                                    height: isMobile ? '280px' : '100%',
                                    minHeight: '380px',
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                }}>
                                <Image
                                    src={currentFeatured.image}
                                    alt={currentFeatured.title}
                                    fill
                                    style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Gradient overlay */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
                                }} />
                                {/* Content overlay */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '2rem',
                                }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.3rem 0.8rem',
                                        background: getCategoryStyle(currentFeatured.category).bg,
                                        color: getCategoryStyle(currentFeatured.category).text,
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        marginBottom: '0.75rem',
                                    }}>
                                        {currentFeatured.category}
                                    </span>
                                    <h3 style={{
                                        fontSize: isMobile ? '1.2rem' : '1.4rem',
                                        fontWeight: 700,
                                        color: 'white',
                                        lineHeight: 1.35,
                                        marginBottom: '0.5rem',
                                    }}>
                                        {currentFeatured.title}
                                    </h3>
                                    {currentFeatured.date && (
                                        <span style={{
                                            fontSize: '0.8rem',
                                            color: 'rgba(255,255,255,0.65)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                        }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                                            {currentFeatured.date}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                        </GreenBorderCard>

                        {/* Slideshow Dots */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            marginTop: '1rem',
                        }}>
                            {featuredItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    style={{
                                        width: index === currentSlide ? '28px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        border: 'none',
                                        background: index === currentSlide ? '#2E7D32' : '#d4d4d4',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                    aria-label={`Tin ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column — News List */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}>
                        {sideNews.map((news) => {
                            const catStyle = getCategoryStyle(news.category);
                            return (
                                <Link key={news.id} href={news.link} style={{ textDecoration: 'none' }}>
                                    <div
                                        style={{
                                            background: 'white',
                                            border: '1.5px solid #c8e6c9',
                                            borderRadius: '14px',
                                            padding: '1rem',
                                            display: 'flex',
                                            gap: '1.25rem',
                                            alignItems: 'center',
                                            transition: 'all 0.25s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                            <div style={{
                                                position: 'relative',
                                                width: '130px',
                                                height: '90px',
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                            }}>
                                                <Image
                                                    src={news.image}
                                                    alt={news.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    sizes="130px"
                                                />
                                            </div>
                                            <div style={{
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                gap: '0.35rem',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.2rem 0.6rem',
                                                        background: catStyle.bg,
                                                        color: catStyle.text,
                                                        borderRadius: '4px',
                                                        fontSize: '0.7rem',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase',
                                                    }}>
                                                        {news.category}
                                                    </span>
                                                    {news.date && (
                                                        <span style={{
                                                            fontSize: '0.75rem',
                                                            color: '#999',
                                                        }}>
                                                            {news.date}
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 style={{
                                                    fontSize: '0.95rem',
                                                    fontWeight: 600,
                                                    color: '#1a1a1a',
                                                    lineHeight: 1.4,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    margin: 0,
                                                }}>
                                                    {news.title}
                                                </h4>
                                            </div>
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#ccc"
                                                strokeWidth="2"
                                                style={{ flexShrink: 0, transition: 'stroke 0.2s' }}
                                            >
                                                <path d="M9 18l6-6-6-6" />
                                            </svg>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}