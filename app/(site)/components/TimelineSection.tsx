'use client';

const timeline = [
    {
        period: 'Tháng 4 – 6/2026',
        label: 'Đợt 1',
        description: 'Đăng ký xét tuyển đợt đầu tiên, ưu tiên hồ sơ sớm',
        active: true,
    },
    {
        period: 'Tháng 7 – 8/2026',
        label: 'Đợt 2',
        description: 'Đợt tuyển sinh bổ sung cho các ngành còn chỉ tiêu',
        active: false,
    },
    {
        period: 'Tháng 9/2026',
        label: 'Đợt 3',
        description: 'Đợt cuối (nếu còn chỉ tiêu)',
        active: false,
    },
    {
        period: 'Tháng 9/2026',
        label: 'Nhập học',
        description: 'Hoàn tất thủ tục và chính thức nhập học',
        active: false,
    },
];

export default function TimelineSection() {
    return (
        <section className="tl-section">
            <div className="tl-container">
                <div className="tl-header">
                    <h2 className="tl-title">
                        Thời gian
                        <span className="tl-title-accent"> tuyển sinh</span>
                    </h2>
                    <p className="tl-subtitle">
                        Lịch trình tuyển sinh năm 2026
                    </p>
                </div>

                <div className="tl-timeline">
                    <div className="tl-line" />
                    {timeline.map((item, i) => (
                        <div
                            key={i}
                            className={`tl-item ${item.active ? 'tl-item-active' : ''}`}
                            style={{ '--tl-delay': `${i * 0.12}s` } as React.CSSProperties}
                        >
                            <div className="tl-dot" style={{ '--dot-delay': `${0.3 + i * 0.8}s` } as React.CSSProperties} />
                            <div className="tl-content">
                                <div className="tl-meta">
                                    <span className="tl-label">{item.label}</span>
                                    <span className="tl-period">{item.period}</span>
                                </div>
                                <p className="tl-desc">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
