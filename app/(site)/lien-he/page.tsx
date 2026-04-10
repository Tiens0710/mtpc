'use client';

import { CSSProperties, useState } from 'react';

const styles: { [key: string]: CSSProperties } = {
    page: {
        minHeight: '100vh',
        background: '#FFFFFF',
        paddingTop: '100px',
        paddingBottom: '4rem',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
    },
    header: {
        marginBottom: '3rem',
        borderBottom: '1px solid #E0E0E0',
        paddingBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#212121',
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1.1rem',
        color: '#666',
        lineHeight: 1.6,
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
    },
    // Contact Info
    infoSection: {
        paddingRight: '2rem',
    },
    infoTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#212121',
        marginBottom: '1.5rem',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '1.25rem',
        paddingBottom: '1.25rem',
        borderBottom: '1px solid #F0F0F0',
    },
    infoIcon: {
        color: '#2E7D32',
        flexShrink: 0,
        marginTop: '2px',
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: '0.85rem',
        color: '#888',
        marginBottom: '0.25rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
    },
    infoValue: {
        fontSize: '1rem',
        color: '#212121',
        fontWeight: 500,
    },
    // Contact Form
    formSection: {
        borderLeft: '1px solid #E0E0E0',
        paddingLeft: '4rem',
    },
    formTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#212121',
        marginBottom: '1.5rem',
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    label: {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: 500,
        color: '#333',
        marginBottom: '0.5rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        border: '1px solid #DDD',
        borderRadius: '4px',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        boxSizing: 'border-box' as const,
    },
    textarea: {
        width: '100%',
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        border: '1px solid #DDD',
        borderRadius: '4px',
        outline: 'none',
        resize: 'vertical' as const,
        minHeight: '120px',
        fontFamily: 'inherit',
        boxSizing: 'border-box' as const,
    },
    submitBtn: {
        padding: '0.875rem 2rem',
        fontSize: '1rem',
        fontWeight: 600,
        color: 'white',
        background: '#2E7D32',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
    },
    // Map Section
    mapSection: {
        marginTop: '4rem',
        paddingTop: '3rem',
        borderTop: '1px solid #E0E0E0',
    },
    mapTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#212121',
        marginBottom: '1.5rem',
    },
    mapWrapper: {
        height: '400px',
        border: '1px solid #E0E0E0',
    },
};

export default function LienHePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại sớm nhất.');
    };

    return (
        <main style={styles.page}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>Liên hệ</h1>
                        <p style={styles.subtitle}>
                            Hãy để lại thông tin, chúng tôi sẽ liên hệ và hỗ trợ bạn trong thời gian sớm nhất
                        </p>
                    </div>
                    <a
                        href="https://zalo.me/3344176261122145662"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="zalo-blink"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            backgroundColor: '#0068FF',
                            color: '#FFFFFF',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 6px rgba(0, 104, 255, 0.2)',
                            transition: 'all 0.2s ease',
                            fontSize: '1rem',
                            border: 'none',
                        }}
                    >
                        <img
                            src="/zalo.png"
                            alt="Zalo"
                            width={24}
                            height={24}
                            style={{ objectFit: 'contain' }}
                        />
                        Chat qua Zalo OA
                    </a>
                </div>

                {/* Content Grid */}
                <div style={styles.content}>
                    {/* Contact Info */}
                    <div style={styles.infoSection}>
                        <h2 style={styles.infoTitle}>Thông tin liên hệ</h2>

                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div style={styles.infoContent}>
                                <div style={styles.infoLabel}>Địa chỉ</div>
                                <div style={styles.infoValue}>
                                    130C-130D Nguyễn Văn Cừ (nối dài), Phường An Khánh, Quận Ninh Kiều<br />
                                    TP. Cần Thơ, Việt Nam
                                </div>
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <div style={styles.infoContent}>
                                <div style={styles.infoLabel}>Điện thoại</div>
                                <div style={styles.infoValue}>
                                    (0292) 222 55 77 - (0292) 222 66 77<br />
                                    (0292) 6 288 286 - (0292) 6 288 334
                                </div>
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div style={styles.infoContent}>
                                <div style={styles.infoLabel}>Email</div>
                                <div style={styles.infoValue}>trungcapmientay@gmail.com</div>
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div style={styles.infoContent}>
                                <div style={styles.infoLabel}>Fax</div>
                                <div style={styles.infoValue}>(0292) 626 02 68</div>
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                    <line x1="12" y1="18" x2="12" y2="18" />
                                </svg>
                            </div>
                            <div style={styles.infoContent}>
                                <div style={styles.infoLabel}>Mobile</div>
                                <div style={styles.infoValue}>037711766</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div style={styles.formSection}>
                        <h2 style={styles.formTitle}>Gửi tin nhắn</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Họ và tên *</label>
                                    <input
                                        type="text"
                                        style={styles.input}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Số điện thoại</label>
                                    <input
                                        type="tel"
                                        style={styles.input}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email *</label>
                                <input
                                    type="email"
                                    style={styles.input}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Tiêu đề *</label>
                                <input
                                    type="text"
                                    style={styles.input}
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Nội dung *</label>
                                <textarea
                                    style={styles.textarea}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" style={styles.submitBtn}>
                                Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
