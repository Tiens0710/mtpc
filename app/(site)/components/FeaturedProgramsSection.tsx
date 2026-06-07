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
            padding: isMobile ? '2rem 1rem' : '2.5rem 2rem',
            background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 50%, #ffffff 100%)',
        }}>
            <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                {/* Header — minimal */}
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '1.5rem' : '2rem' }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        margin: 0,
                        lineHeight: 1.2,
                    }}>
                        Ngành đào tạo{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            nổi bật
                        </span>
                    </h2>
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#64748b',
                        margin: '0.5rem auto 0',
                        maxWidth: '480px',
                    }}>
                        5 ngành trung cấp — đào tạo thực tiễn, đáp ứng nhu cầu nhân lực ĐBSCL
                    </p>
                </div>

                {/* Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '1rem',
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
