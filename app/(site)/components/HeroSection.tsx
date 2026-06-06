'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Danh sách ảnh slideshow - từ thư mục public/herobanner/
    const slides = [
        { src: '/herobanner/slide1_1c.jpeg', alt: 'Trường Trung cấp Miền Tây' },
        { src: '/herobanner/slide2.jpg', alt: 'Hoạt động ngoại khóa' },
        { src: '/herobanner/slide3.jpg', alt: 'Sinh viên MTPC' },
    ];

    // Tự động chuyển slide mỗi 4 giây
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };



    return (
        <section className="hero-slideshow-fullwidth">
            {/* Slides Container + Overlay */}
            <div className="slideshow-container">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority={index === 0}
                        />
                    </div>
                ))}

                {/* Overlay Content - Chỉ hiển thị trên slide đầu tiên */}
                {currentSlide === 0 && (
                    <div className="hero-overlay-card">
                        <span className="hero-overlay-badge">🎓 TUYỂN SINH 2025 – Ưu đãi cực hot! 🔥</span>
                        <h1 className="hero-overlay-title">
                            KHỞI ĐẦU SỰ NGHIỆP<br />
                            <span className="hero-overlay-highlight">Y DƯỢC</span><br />
                            TỪ ĐÂY!
                        </h1>
                        <p className="hero-overlay-desc">
                            Học thực hành 70% tại bệnh viện.<br />
                            Cam kết 98% có việc làm ngay<br />
                            với mức lương từ 7 – 18 triệu/tháng. Bạn sẵn sàng chưa? 🚀
                        </p>
                        <div className="hero-overlay-actions">
                            <a href="/tuyen-sinh/dang-ky" className="hero-overlay-btn hero-overlay-btn-primary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                Đăng ký tư vấn FREE
                            </a>
                            <a href="/nganh-dao-tao" className="hero-overlay-btn hero-overlay-btn-secondary">
                                Xem ngành học
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>
                    </div>
                )}

                {/* Glassmorphism Program Cards - Góc phải slide 1 */}
                {currentSlide === 0 && (
                    <div className="hero-program-cards">
                        <a href="/nganh-dao-tao/y-si-da-khoa" className="hero-program-card">
                            <div className="hero-program-card-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                            </div>
                            <h3 className="hero-program-card-title">Y sĩ Đa khoa</h3>
                            <p className="hero-program-card-sub">2 năm • 70% thực hành</p>
                            <span className="hero-program-card-salary">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                                7–12 triệu/tháng
                            </span>
                        </a>
                        <a href="/nganh-dao-tao/duoc-si" className="hero-program-card">
                            <div className="hero-program-card-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"/><path d="M12 8v8M8 12h8"/></svg>
                            </div>
                            <h3 className="hero-program-card-title">Dược sĩ</h3>
                            <p className="hero-program-card-sub">2 năm • 65% thực hành</p>
                            <span className="hero-program-card-salary">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                                8–15 triệu/tháng
                            </span>
                        </a>
                        <a href="/nganh-dao-tao/dieu-duong" className="hero-program-card">
                            <div className="hero-program-card-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                            </div>
                            <h3 className="hero-program-card-title">Điều dưỡng</h3>
                            <p className="hero-program-card-sub">2 năm • 70% thực hành</p>
                            <span className="hero-program-card-salary">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                                6–10 triệu/tháng
                            </span>
                        </a>
                        <a href="/nganh-dao-tao/cntt" className="hero-program-card">
                            <div className="hero-program-card-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                            </div>
                            <h3 className="hero-program-card-title">CNTT – AI</h3>
                            <p className="hero-program-card-sub">2 năm • 60% thực hành</p>
                            <span className="hero-program-card-salary">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                                10–18 triệu/tháng
                            </span>
                        </a>
                    </div>
                )}
            </div>

            {/* Dots Indicator */}
            <div className="slideshow-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
