'use client';

import { useState, useEffect, useCallback } from 'react';

const testimonials = [
    {
        id: 'anh-tu',
        content:
            'Mình theo học ngành Y sĩ đa khoa, giảng viên rất tận tâm, thực hành lâm sàng nhiều. Ra trường mình có việc ngay tại phòng khám tư nhân ở Cần Thơ.',
        author: 'Nguyễn Anh Thư',
        role: 'Y sĩ đa khoa',
        rating: 5,
        color: '#10B981',
    },
    {
        id: 'thu-trang',
        content:
            'Ban đầu mình lo không theo được ngành Dược, nhưng nhà trường hỗ trợ rất tốt. Thực tập tại nhà thuốc lớn ở Cần Thơ giúp mình tự tin đi làm luôn.',
        author: 'Trần Thu Trang',
        role: 'Dược sĩ trung học',
        rating: 5,
        color: '#3B82F6',
    },
    {
        id: 'hoang-lan',
        content:
            'Ngành Điều dưỡng tại MTPC đào tạo rất bài bản. Phòng skills lab mô phỏng giúp mình chuẩn bị tốt cho công việc tại Bệnh viện Đa khoa Cần Thơ.',
        author: 'Phạm Hoàng Lan',
        role: 'Điều dưỡng',
        rating: 5,
        color: '#8B5CF6',
    },
    {
        id: 'minh-tam',
        content:
            'Chương trình CNTT-AI thực tế, học xong mình làm AI Operator tại một công ty startup. Phòng tuyển sinh hướng dẫn xét tuyển rất tận tình.',
        author: 'Lê Minh Tâm',
        role: 'CNTT Ứng dụng AI',
        rating: 5,
        color: '#F59E0B',
    },
    {
        id: 'ngoc-bich',
        content:
            'Hộ sinh là ngành mình yêu thích từ nhỏ. MTPC có cơ sở vật chất tốt, thực hành tại khoa sản bệnh viện giúp mình vững tay nghề.',
        author: 'Võ Ngọc Bích',
        role: 'Hộ sinh',
        rating: 5,
        color: '#EC4899',
    },
    {
        id: 'thanhtam',
        content:
            'Con tôi theo học tại MTPC, nhà trường có ký túc xá sạch sẽ, an ninh 24/7. Giảng viên quan tâm học viên như con em trong gia đình.',
        author: 'Chị Mai',
        role: 'Phụ huynh',
        rating: 5,
        color: '#06B6D4',
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="tg-stars">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`tg-star ${i < rating ? 'tg-star-filled' : 'tg-star-empty'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
    return (
        <div className="tg-card" style={{ '--card-accent': testimonial.color } as React.CSSProperties}>
            <div className="tg-card-border" />
            <div className="tg-card-inner">
                <div className="tg-quote-mark">&ldquo;</div>
                <StarRating rating={testimonial.rating} />
                <p className="tg-content">{testimonial.content}</p>
                <div className="tg-divider" />
                <div className="tg-author">
                    <div
                        className="tg-avatar"
                        style={{ background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}88)` }}
                    >
                        {testimonial.author.charAt(0)}
                    </div>
                    <div className="tg-author-info">
                        <p className="tg-author-name">{testimonial.author}</p>
                        <p className="tg-author-role">{testimonial.role}</p>
                    </div>
                    <div className="tg-verified">
                        <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const total = testimonials.length;

    useEffect(() => {
        const updateItemsPerView = () => {
            const w = window.innerWidth;
            if (w < 640) setItemsPerView(1);
            else if (w < 1024) setItemsPerView(2);
            else setItemsPerView(3);
        };
        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    const maxIndex = Math.max(0, total - itemsPerView);

    const next = useCallback(() => {
        setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [next]);

    const dotCount = maxIndex + 1;

    return (
        <section className="tg-section">
            <div className="tg-bg-grid" />
            <div className="tg-bg-glow tg-bg-glow-1" />
            <div className="tg-bg-glow tg-bg-glow-2" />

            <div className="tg-container">
                {/* Header */}
                <div className="tg-header">
                    <h2 className="tg-title">
                        Sinh viên nói gì
                        <span className="tg-title-accent"> về MTPC</span>
                    </h2>

                    <p className="tg-subtitle">
                        Hơn <span className="tg-highlight">5.000</span> sinh viên đã tin tưởng và chọn MTPC
                    </p>
                </div>

                {/* Carousel */}
                <div className="tg-carousel">
                    <button className="tg-nav-btn tg-nav-prev" onClick={prev} aria-label="Previous">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    <div className="tg-viewport">
                        <div
                            className="tg-track"
                            style={{
                                transform: `translateX(calc(-${current} * (100% / ${itemsPerView} + 1rem * ${itemsPerView} / ${itemsPerView})))`,
                            }}
                        >
                            {testimonials.map((t) => (
                                <div
                                    key={t.id}
                                    className="tg-slide"
                                    style={{ flex: `0 0 calc(${100 / itemsPerView}% - 1rem)` }}
                                >
                                    <TestimonialCard testimonial={t} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="tg-nav-btn tg-nav-next" onClick={next} aria-label="Next">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>

                {/* Dots */}
                <div className="tg-dots">
                    {Array.from({ length: dotCount }).map((_, i) => (
                        <button
                            key={i}
                            className={`tg-dot ${i === current ? 'tg-dot-active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Stats */}
                <div className="tg-stats">
                    <div className="tg-stat">
                        <span className="tg-stat-number">5.000+</span>
                        <span className="tg-stat-label">Sinh viên</span>
                    </div>
                    <div className="tg-stat-divider" />
                    <div className="tg-stat">
                        <span className="tg-stat-number">98%</span>
                        <span className="tg-stat-label">Hài lòng</span>
                    </div>
                    <div className="tg-stat-divider" />
                    <div className="tg-stat">
                        <span className="tg-stat-number">4.9/5</span>
                        <span className="tg-stat-label">Đánh giá</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
