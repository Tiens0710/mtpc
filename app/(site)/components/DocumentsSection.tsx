'use client';

const documents = [
    {
        title: 'Bằng tốt nghiệp',
        description: 'Bằng tốt nghiệp THCS hoặc THPT (bản sao công chứng)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
        ),
        color: '#059669',
    },
    {
        title: 'Học bạ',
        description: 'Học bạ THCS hoặc THPT (bản sao công chứng)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
        color: '#059669',
    },
    {
        title: 'Giấy tờ tùy thân',
        description: 'Giấy khai sinh, CMND hoặc CCCD photo',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
        ),
        color: '#059669',
    },
    {
        title: 'Ảnh chân dung',
        description: '4 ảnh 3x4 (chụp trong 6 tháng gần nhất)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        ),
        color: '#059669',
    },
];

export default function DocumentsSection() {
    return (
        <section className="doc-section">
            <div className="doc-container">
                <div className="doc-header">
                    <h2 className="doc-title">
                        Hồ sơ
                        <span className="doc-title-accent"> cần thiết</span>
                    </h2>
                    <p className="doc-subtitle">
                        Chuẩn bị đầy đủ hồ sơ để đăng ký xét tuyển
                    </p>
                </div>

                <div className="doc-grid">
                    {documents.map((doc, i) => (
                        <div
                            key={i}
                            className="doc-card"
                            style={{ '--doc-color': doc.color, '--doc-delay': `${i * 0.1}s` } as React.CSSProperties}
                        >
                            <div className="doc-icon">{doc.icon}</div>
                            <h3 className="doc-card-title">{doc.title}</h3>
                            <p className="doc-card-desc">{doc.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
