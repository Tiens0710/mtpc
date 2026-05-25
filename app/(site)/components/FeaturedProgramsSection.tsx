'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { programs } from '@/lib/programs';
import ViewAllButton from './ViewAllButton';
import ProgramCard from './ProgramCard';

export default function FeaturedProgramsSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const isMobile = useIsMobile();

    const featuredPrograms = programs.filter(p => p.level === 'trung-cap');

    return (
        <section style={{
            padding: isMobile ? '3rem 1rem' : '4.5rem 2rem',
            background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 50%, #ffffff 100%)',
            position: 'relative',
        }}>
            <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                {/* Header — Clean & Elegant */}
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
                    {/* Decorative accent line */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginBottom: '1.25rem',
                    }}>
                        <div style={{
                            width: '40px',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, #2E7D32)',
                            borderRadius: '1px',
                        }} />
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#2E7D32',
                            letterSpacing: '2px',
                            textTransform: 'uppercase' as const,
                        }}>
                            Đào tạo
                        </span>
                        <div style={{
                            width: '40px',
                            height: '2px',
                            background: 'linear-gradient(90deg, #2E7D32, transparent)',
                            borderRadius: '1px',
                        }} />
                    </div>

                    <h2 style={{
                        fontSize: isMobile ? '1.75rem' : '2.5rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        marginBottom: '0.75rem',
                        lineHeight: 1.2,
                        letterSpacing: '-0.5px',
                    }}>
                        Ngành đào tạo{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            nổi bật
                        </span>
                    </h2>

                    <div style={{
                        width: '50px',
                        height: '3px',
                        background: 'linear-gradient(90deg, #2E7D32, #81C784)',
                        borderRadius: '2px',
                        margin: '0 auto 1.25rem',
                    }} />

                    <p style={{
                        fontSize: '1.05rem',
                        color: '#64748b',
                        maxWidth: '580px',
                        margin: '0 auto',
                        lineHeight: 1.7,
                    }}>
                        5 ngành trung cấp chính quy — đào tạo thực tiễn, đáp ứng nhu cầu nhân lực khu vực ĐBSCL
                    </p>
                </div>

                {/* Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {featuredPrograms.map((program, index) => (
                        <ProgramCard
                            key={program.slug}
                            slug={program.slug}
                            code={program.code}
                            name={program.name}
                            description={program.description}
                            duration={program.duration}
                            enrollment={program.enrollment}
                            tuitionPerYear={program.tuitionPerYear}
                            image={program.image}
                            category={program.category}
                            isHovered={hoveredIndex === index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    ))}
                </div>

                {/* View All */}
                <ViewAllButton
                    href="/dao-tao"
                    label="Xem tất cả chương trình đào tạo"
                />
            </div>
        </section>
    );
}