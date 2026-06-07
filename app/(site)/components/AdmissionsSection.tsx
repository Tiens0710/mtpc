'use client';

const registrationSteps = [
    {
        num: '01',
        title: 'Đăng ký online',
        description: 'Truy cập website và điền form đăng ký xét tuyển trực tuyến',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        num: '02',
        title: 'Nộp hồ sơ',
        description: 'Chuẩn bị và nộp hồ sơ trực tiếp tại phòng tuyển sinh của trường',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
    },
    {
        num: '03',
        title: 'Xét tuyển & thông báo',
        description: 'Hồ sơ được xét duyệt và thông báo kết quả trong vòng 2 tuần',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
    {
        num: '04',
        title: 'Nhập học',
        description: 'Hoàn tất thủ tục nhập học và chính thức trở thành sinh viên MTPC',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
        ),
    },
];

export default function AdmissionsSection() {
    return (
        <section className="adm-section">
            <div className="adm-bg-grid" />

            <div className="adm-container">
                <div className="adm-header">
                    <h2 className="adm-title">
                        Hướng dẫn
                        <span className="adm-title-accent"> đăng ký</span>
                    </h2>
                    <p className="adm-subtitle">
                        Quy trình 4 bước đơn giản để trở thành sinh viên MTPC
                    </p>
                </div>

                <div className="adm-steps">
                    {registrationSteps.map((step, i) => (
                        <div key={i} className="adm-step-wrapper">
                            <div className="adm-step">
                                <span className="adm-step-num">{step.num}</span>
                                <div className="adm-step-icon">{step.icon}</div>
                                <h4 className="adm-step-title">{step.title}</h4>
                                <p className="adm-step-desc">{step.description}</p>
                            </div>
                            {i < registrationSteps.length - 1 && (
                                <div className="adm-arrow">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="adm-cta">
                    <a href="/tuyen-sinh" className="adm-cta-btn">
                        Xem chi tiết tuyển sinh
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
