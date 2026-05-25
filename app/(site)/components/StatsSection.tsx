'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useIsMobile } from '../../hooks/useMediaQuery';

// ============================================================
// Dữ liệu thống kê — cập nhật giá trị thật từ trường
// ⚠️ Nếu value = null → stat đó sẽ KHÔNG hiển thị
// ============================================================
const statsData = [
    {
        value: '15+',
        label: 'Năm kinh nghiệm đào tạo',
        href: '/gioi-thieu',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C10.08 2 8.5 3.58 8.5 5.5c0 1.3.72 2.43 1.77 3.03C8.12 9.19 6.5 11.13 6.5 13.5V18h4v-4h3v4h4v-4.5c0-2.37-1.62-4.31-3.77-4.97 1.05-.6 1.77-1.73 1.77-3.03C15.5 3.58 13.92 2 12 2zm0 2c.83 0 1.5.67 1.5 1.5S12.83 7 12 7s-1.5-.67-1.5-1.5S11.17 4 12 4zM5 19v2h14v-2H5z"/>
            </svg>
        ),
    },
    {
        value: '5000+',
        label: 'Sinh viên đã tốt nghiệp',
        href: '/sinh-vien',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
        ),
    },
    {
        value: '98%',
        label: 'Sinh viên có việc làm',
        href: '/nganh-dao-tao',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
            </svg>
        ),
    },
    {
        value: '50+',
        label: 'Đối tác doanh nghiệp',
        href: '/lien-he',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
        ),
    },
];

// ============================================================
// AnimatedCounter — đếm số từ 0 lên value khi scroll vào viewport
// ============================================================
function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
    const [currentNumber, setCurrentNumber] = useState(0);

    // Parse number and suffix from value like "15+", "5000+", "98%"
    const numericMatch = value.match(/(\d+)/);
    const target = numericMatch ? parseInt(numericMatch[1], 10) : 0;
    const suffix = numericMatch ? value.replace(numericMatch[1], '') : value;

    useEffect(() => {
        if (!inView || target === 0) {
            setCurrentNumber(0);
            return;
        }

        const duration = 1500; // ms
        const steps = 60;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            // Ease-out curve
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrentNumber(Math.round(target * eased));

            if (step >= steps) {
                setCurrentNumber(target);
                clearInterval(timer);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, inView, target]);

    return (
        <>
            <span>{currentNumber}</span>
            <span className="stats-suffix">{suffix}</span>
        </>
    );
}

export default function StatsSection() {
    const isMobile = useIsMobile();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="stats-section" ref={sectionRef}>
            <div className="stats-container">
                {/* Header */}
                <div className="stats-header">
                    <h2 className="stats-title">MTPC qua các con số</h2>
                    <p className="stats-subtitle">Thành tựu và cam kết của chúng tôi</p>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    {statsData.map((stat, index) => (
                        <Link
                            key={index}
                            href={stat.href}
                            className={`stats-card ${index === statsData.length - 1 ? 'stats-card-highlighted' : ''}`}
                        >
                            {/* Icon */}
                            <div className="stats-icon">
                                {stat.icon}
                            </div>

                            {/* Number */}
                            <div className="stats-number">
                                <AnimatedCounter value={stat.value} inView={inView} />
                            </div>

                            {/* Label */}
                            <p className="stats-label">{stat.label}</p>

                            {/* CTA */}
                            <span className="stats-cta">
                                Xem thêm <span className="stats-arrow">→</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}