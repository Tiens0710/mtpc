'use client';

import { useIsMobile } from '../../hooks/useMediaQuery';

export default function IntroVideoSection() {
    const isMobile = useIsMobile();

    const styles = {
        section: {
            background: '#144331',
            padding: isMobile ? '3rem 1rem' : '5rem 2rem',
            position: 'relative' as const,
            overflow: 'hidden' as const,
        },
        // Glow effect behind video
        glowEffect: {
            position: 'absolute' as const,
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(129, 199, 132, 0.3) 0%, transparent 70%)',
            left: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            filter: 'blur(60px)',
            pointerEvents: 'none' as const,
        },
        // Floating shapes
        floatingShape1: {
            position: 'absolute' as const,
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            top: '10%',
            right: '5%',
            animation: 'float 6s ease-in-out infinite',
            pointerEvents: 'none' as const,
        },
        floatingShape2: {
            position: 'absolute' as const,
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, rgba(129, 199, 132, 0.15) 0%, transparent 100%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            bottom: '15%',
            right: '20%',
            animation: 'float 8s ease-in-out infinite reverse',
            pointerEvents: 'none' as const,
        },
        // Decorative lines
        decorativeLine1: {
            position: 'absolute' as const,
            width: '1px',
            height: '150px',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)',
            right: '30%',
            top: '0',
            pointerEvents: 'none' as const,
            display: isMobile ? 'none' : 'block',
        },
        decorativeLine2: {
            position: 'absolute' as const,
            width: '200px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)',
            right: '10%',
            bottom: '40%',
            pointerEvents: 'none' as const,
            display: isMobile ? 'none' : 'block',
        },
        // Sparkle dots
        sparkleContainer: {
            position: 'absolute' as const,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            pointerEvents: 'none' as const,
            display: isMobile ? 'none' : 'block',
        },
        sparkle: {
            position: 'absolute' as const,
            width: '4px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '4rem',
            alignItems: 'center',
            position: 'relative' as const,
            zIndex: 10,
        },
        videoWrapper: {
            position: 'relative' as const,
            borderRadius: '12px',
            overflow: 'hidden' as const,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(129, 199, 132, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            aspectRatio: '16/9',
        },
        iframe: {
            width: '100%',
            height: '100%',
            border: 'none',
        },
        contentWrapper: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '2rem',
        },
        subtitle: {
            color: 'rgba(129, 199, 132, 0.9)',
            fontSize: '0.9rem',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '3px',
            margin: 0,
        },
        title: {
            fontSize: '2.8rem',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            fontStyle: 'italic',
            margin: 0,
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
        },
        linkWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '1rem',
            cursor: 'pointer',
        },
        linkText: {
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.5px',
        },
        playButton: {
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
        },
    };

    // Sparkle positions
    const sparkles = [
        { top: '20%', left: '75%' },
        { top: '60%', right: '25%' },
        { top: '80%', right: '40%' },
        { top: '30%', right: '15%' },
        { top: '70%', right: '10%' },
    ];

    return (
        <section style={styles.section}>
            {/* Glow Effect */}
            <div style={styles.glowEffect} />

            {/* Floating Shapes */}
            <div style={styles.floatingShape1} />
            <div style={styles.floatingShape2} />

            {/* Decorative Lines */}
            <div style={styles.decorativeLine1} />
            <div style={styles.decorativeLine2} />

            {/* Sparkles */}
            <div style={styles.sparkleContainer}>
                {sparkles.map((pos, i) => (
                    <div key={i} style={{ ...styles.sparkle, ...pos }} />
                ))}
            </div>

            <div style={styles.container}>
                {/* YouTube Video */}
                <div style={styles.videoWrapper}>
                    <iframe
                        style={styles.iframe}
                        src="https://www.youtube.com/embed/pzhyLrqbxTg"
                        title="Giới thiệu Trường Trung cấp Miền Tây"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Content */}
                <div style={styles.contentWrapper}>
                    <p style={styles.subtitle}>Về chúng tôi</p>
                    <h2 style={styles.title}>
                        Nơi khai phóng cho những cải tiến đột phá
                    </h2>

                    <div style={styles.linkWrapper}>
                        <span style={styles.linkText}>tìm hiểu thêm về chúng tôi</span>
                        <button style={styles.playButton} aria-label="Xem video">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <polygon points="6,4 20,12 6,20" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS Animation for floating shapes */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
            `}</style>
        </section>
    );
}
