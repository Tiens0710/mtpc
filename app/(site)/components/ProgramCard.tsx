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

const defaultCategoryLabels: Record<string, string> = {
    'y-te': 'Y tế & Sức khỏe',
    'cong-nghe': 'Công nghệ',
    'dich-vu': 'Dịch vụ',
};

/** Format học phí VND → "12.000.000đ" */
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
    categoryLabel,
    isHovered = false,
    onMouseEnter,
    onMouseLeave,
}: ProgramCardProps) {
    const colors = categoryColor || defaultCategoryColors[category] || defaultCategoryColors['y-te'];
    const label = categoryLabel || defaultCategoryLabels[category] || category;

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                border: `1.5px solid ${isHovered ? colors.accent + '60' : '#e2e8f0'}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: isHovered
                    ? `0 20px 50px ${colors.accent}18, 0 8px 20px rgba(0,0,0,0.06)`
                    : '0 1px 3px rgba(0,0,0,0.04)',
                cursor: 'pointer',
            }}
        >
            {/* Top: Image + Overlay */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '200px',
                overflow: 'hidden',
            }}>
                <Image
                    src={image}
                    alt={name}
                    fill
                    style={{
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                    }}
                />
                {/* Gradient overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, transparent 40%, ${colors.accent}20 100%)`,
                }} />
                {/* Category badge */}
                <span style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    padding: '0.3rem 0.75rem',
                    background: colors.bg,
                    color: colors.text,
                    borderRadius: '8px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    border: `1px solid ${colors.accent}30`,
                    backdropFilter: 'blur(8px)',
                    letterSpacing: '0.3px',
                }}>
                    {label}
                </span>
                {/* Code badge */}
                <span style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    padding: '0.25rem 0.6rem',
                    background: 'rgba(15, 23, 42, 0.7)',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    backdropFilter: 'blur(8px)',
                }}>
                    {code}
                </span>
            </div>

            {/* Body */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
            }}>
                {/* Name */}
                <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '0.5rem',
                    lineHeight: 1.35,
                }}>
                    {name}
                </h3>

                {/* Description */}
                <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                }}>
                    {description}
                </p>

                {/* Info pills */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.35rem 0.7rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        color: '#475569',
                        fontWeight: 500,
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.85rem', color: colors.accent }}>schedule</span>
                        {duration}
                    </span>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.35rem 0.7rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        color: '#475569',
                        fontWeight: 500,
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.85rem', color: colors.accent }}>groups</span>
                        {enrollment} chỉ tiêu
                    </span>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.35rem 0.7rem',
                        background: colors.bg,
                        border: `1px solid ${colors.accent}25`,
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        color: colors.text,
                        fontWeight: 600,
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.85rem', color: colors.accent }}>payments</span>
                        {formatTuition(tuitionPerYear)}/năm
                    </span>
                </div>

                {/* Divider */}
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
                    marginBottom: '1rem',
                }} />

                {/* Bottom actions */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                }}>
                    <Link
                        href={`/dao-tao#${slug}`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: colors.accent,
                            textDecoration: 'none',
                            transition: 'gap 0.2s ease',
                        }}
                    >
                        Xem chi tiết
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </Link>
                    <Link
                        href="/tuyen-sinh#dang-ky"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.5rem 1rem',
                            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent}dd 100%)`,
                            color: '#ffffff',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            boxShadow: `0 2px 8px ${colors.accent}30`,
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>edit_note</span>
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}