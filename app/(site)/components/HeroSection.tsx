'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Danh sách ảnh slideshow - thêm ảnh vào public/ folder
    const slides = [
        { src: '/slide-1.jpg', alt: 'Lễ tốt nghiệp MTPC' },
        { src: '/slide-3.jpg', alt: 'Hoạt động ngoại khóa' },
        { src: '/slide (1).jpg', alt: 'Sinh viên xuất sắc' },
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


            {/* Slides Container */}
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
