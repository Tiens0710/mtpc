'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProgramCardProps {
    slug: string;
    code: string;
    name: string;
    description: string;
    duration: string;
    enrollment: number;
    tuitionPerYear: number;
    image: string;
    category: string;
    categoryColor?: { bg: string; text: string; accent: string };
    categoryLabel?: string;
    isHovered?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const defaultCategoryColors: Record<string, { bg: string; text: string; accent: string }> = {
    'y-te': { bg: '#ecfdf5', text: '#065f46', accent: '#10b981' },
    'cong-nghe': { bg: '#eff6ff', text: '#1e40af', accent: '#3b82f6' },
    'dich-vu': { bg: '#fef3c7', text: '#92400e', accent: '#f59e0b' },
};

function formatTuition(amount: number): string {
    if (amount === 0) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

export default function ProgramCard({
    slug,
    code,
    name,
    description,
    duration,
    enrollment,
    tuitionPerYear,
    image,
    category,
    categoryColor,
    isHovered = false,
    onMouseEnter,
    onMouseLeave,
}: ProgramCardProps) {
    const colors = categoryColor || defaultCategoryColors[category] || defaultCategoryColors['y-te'];

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#ffffff',
                borderRadius: '14px',
                overflow: 'hidden',
                border: `1px solid ${isHovered ? colors.accent + '40' : '#e2e8f0'}`,
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: isHovered
                    ? `0 12px 32px ${colors.accent}12, 0 4px 12px rgba(0,0,0,0.04)`
                    : '0 1px 3px rgba(0,0,0,0.03)',
                cursor: 'pointer',
            }}
        >
            {/* Image */}
            <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
            }}>
                <Image
                    src={image}
                    alt={name}
                    fill
                    style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, transparent 50%, ${colors.accent}15 100%)`,
                }} />
                {/* Badges */}
                <span style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    padding: '0.2rem 0.6rem',
                    background: colors.bg,
                    color: colors.text,
                    borderRadius: '6px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    border: `1px solid ${colors.accent}25`,
                }}>
                    {category === 'y-te' ? 'Y tế' : category === 'cong-nghe' ? 'Công nghệ' : 'Dịch vụ'}
                </span>
                <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '0.15rem 0.5rem',
                    background: 'rgba(15, 23, 42, 0.7)',
                    color: '#fff',
                    borderRadius: '5px',
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                }}>
                    {code}
                </span>
            </div>

            {/* Body */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem 1.15rem',
            }}>
                <h3 style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    margin: '0 0 0.35rem',
                    lineHeight: 1.3,
                }}>
                    {name}
                </h3>

                <p style={{
                    fontSize: '0.78rem',
                    color: '#64748b',
                    lineHeight: 1.5,
                    margin: '0 0 0.75rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {description}
                </p>

                {/* Info row */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.35rem',
                    marginBottom: '0.75rem',
                }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.25rem 0.5rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        color: '#475569',
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', color: colors.accent }}>schedule</span>
                        {duration}
                    </span>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.25rem 0.5rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        color: '#475569',
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', color: colors.accent }}>groups</span>
                        {enrollment} chỉ tiêu
                    </span>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.25rem 0.5rem',
                        background: colors.bg,
                        border: `1px solid ${colors.accent}20`,
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        color: colors.text,
                        fontWeight: 600,
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', color: colors.accent }}>payments</span>
                        {formatTuition(tuitionPerYear)}/năm
                    </span>
                </div>

                {/* Divider */}
                <div style={{
                    height: '1px',
                    background: '#f1f5f9',
                    marginBottom: '0.75rem',
                }} />

                {/* Actions */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                }}>
                    <Link
                        href={`/dao-tao#${slug}`}
                        style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: colors.accent,
                            textDecoration: 'none',
                        }}
                    >
                        Xem chi tiết →
                    </Link>
                    <Link
                        href="/tuyen-sinh#dang-ky"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.4rem 0.8rem',
                            background: colors.accent,
                            color: '#fff',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                    >
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}
