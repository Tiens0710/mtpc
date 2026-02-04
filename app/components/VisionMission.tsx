'use client';

import { useState } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';

export default function VisionMission() {
    const [activeTab, setActiveTab] = useState<'vision' | 'philosophy'>('vision');
    const isMobile = useIsMobile();

    const styles = {
        section: {
            padding: isMobile ? '2rem 1rem' : '3rem 2rem',
            background: '#ffffff',
            position: 'relative' as const,
            borderTop: '1px solid #e5e7eb',
        },
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative' as const,
        },
        tabsNav: {
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '1rem' : '3rem',
            marginBottom: '1rem',
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: '0',
        },
        tabBtn: {
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#9ca3af',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.75rem 0.5rem',
            transition: 'all 0.3s ease',
            borderBottom: '2px solid transparent',
            marginBottom: '-1px',
        },
        tabBtnActive: {
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#2E7D32',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.75rem 0.5rem',
            transition: 'all 0.3s ease',
            borderBottom: '2px solid #2E7D32',
            marginBottom: '-1px',
        },
        content: {
            textAlign: 'center' as const,
            height: '180px',
            overflow: 'hidden' as const,
        },
        quoteIcon: {
            fontSize: '2.5rem',
            color: 'rgba(46, 125, 50, 0.2)',
            marginBottom: '-1rem',
            fontFamily: 'Georgia, serif',
        },
        text: {
            color: '#374151',
            fontSize: '1.1rem',
            lineHeight: '1.9',
            fontWeight: 400,
            maxWidth: '650px',
            margin: '0 auto',
        },
        divider: {
            width: '50px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #2E7D32, transparent)',
            margin: '2rem auto 0',
        },
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                {/* Tabs */}
                <div style={styles.tabsNav}>
                    <button
                        onClick={() => setActiveTab('vision')}
                        style={activeTab === 'vision' ? styles.tabBtnActive : styles.tabBtn}
                    >
                        Tầm nhìn & Sứ mệnh
                    </button>
                    <button
                        onClick={() => setActiveTab('philosophy')}
                        style={activeTab === 'philosophy' ? styles.tabBtnActive : styles.tabBtn}
                    >
                        Triết lý giáo dục
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    <div style={styles.quoteIcon}>"</div>

                    {activeTab === 'vision' && (
                        <p style={styles.text}>
                            Khát vọng của chúng tôi là trở thành một trong những trường trung cấp trẻ được ngưỡng mộ nhất châu Á vào năm 2030. Chúng tôi đào tạo người học trở thành những con người học tập suốt đời và mang lại tác động tích cực truyền cảm hứng cho xã hội.
                        </p>
                    )}

                    {activeTab === 'philosophy' && (
                        <p style={styles.text}>
                            Thông qua học tập trải nghiệm, Trường đào tạo những con người toàn diện, có khả năng học tập suốt đời, có đạo đức, có sức ảnh hưởng và mang lại thay đổi tích cực cho cộng đồng.
                        </p>
                    )}

                    {/* <div style={styles.divider} /> */}
                </div>
            </div>
        </section>
    );
}
