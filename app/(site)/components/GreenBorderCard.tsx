import { ReactNode } from 'react';

interface GreenBorderCardProps {
    children: ReactNode;
    /** Khoảng cách padding bên trong card */
    padding?: string;
    /** Bo góc */
    borderRadius?: string;
    /** Bật hover effect (shadow + lift) */
    hoverable?: boolean;
    /** Style thêm từ bên ngoài */
    className?: string;
    /** Style inline thêm */
    style?: React.CSSProperties;
}

/**
 * Card viền xanh lá — component tái sử dụng.
 *
 * Ví dụ:
 *   <GreenBorderCard>
 *     <p>Nội dung</p>
 *   </GreenBorderCard>
 *
 *   <GreenBorderCard hoverable padding="1.5rem">
 *     <h3>Title</h3>
 *   </GreenBorderCard>
 */
export default function GreenBorderCard({
    children,
    padding = '1.5rem',
    borderRadius = '14px',
    hoverable = false,
    className,
    style: externalStyle,
}: GreenBorderCardProps) {
    return (
        <div
            className={className}
            style={{
                position: 'relative',
                borderRadius,
                padding: 0,
                transition: hoverable ? 'all 0.3s ease' : undefined,
                ...externalStyle,
            }}
            onMouseEnter={hoverable ? (e) => {
                const card = e.currentTarget;
                card.style.transform = 'translateY(-3px)';
                const inner = card.querySelector('[data-green-card-inner]') as HTMLElement;
                if (inner) {
                    inner.style.borderColor = '#a5d6a7';
                    inner.style.boxShadow = '0 0 0 4px rgba(76, 175, 80, 0.15), 0 8px 24px rgba(46, 125, 50, 0.12)';
                }
            } : undefined}
            onMouseLeave={hoverable ? (e) => {
                const card = e.currentTarget;
                card.style.transform = 'translateY(0)';
                const inner = card.querySelector('[data-green-card-inner]') as HTMLElement;
                if (inner) {
                    inner.style.borderColor = '#c8e6c9';
                    inner.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.08), 0 2px 8px rgba(46, 125, 50, 0.06)';
                }
            } : undefined}
        >
            {/* Glow effect — bọc xung quanh viền */}
            <div
                style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: `calc(${borderRadius} + 4px)`,
                    background: 'transparent',
                    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.08), 0 2px 8px rgba(46, 125, 50, 0.06)',
                    pointerEvents: 'none',
                    transition: 'box-shadow 0.3s ease',
                }}
            />

            {/* Inner card */}
            <div
                data-green-card-inner
                style={{
                    position: 'relative',
                    background: 'white',
                    border: '2px solid #c8e6c9',
                    borderRadius,
                    padding,
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.08), 0 2px 8px rgba(46, 125, 50, 0.06)',
                }}
            >
                {children}
            </div>
        </div>
    );
}