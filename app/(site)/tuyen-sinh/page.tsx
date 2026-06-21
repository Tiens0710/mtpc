import Image from 'next/image';
import './tuyen-sinh.css';
import { programs, formatTuition } from '../../data/programs';
import { visibleStats } from '@/lib/stats';
import { siteConfig } from '@/lib/site-config';
import AdmissionForm from './AdmissionForm';

export default function TuyenSinhPage() {
    const newsItems = [
        { month: 'THG 02', day: '10', title: 'Lễ tốt nghiệp đợt 1 năm 2025: Hành trình vươn ra biển lớn' },
        { month: 'THG 02', day: '08', title: 'Hội thảo định hướng nghề nghiệp ngành Y sĩ đa khoa' },
        { month: 'THG 01', day: '25', title: 'MTPC ký kết hợp tác chiến lược với doanh nghiệp Nhật Bản' },
    ];

    const feeData = programs.map((p) => ({
        name: p.name,
        fee: `${formatTuition(p.tuitionPerYear)}/năm`,
        promo: p.tuitionNote || '',
        promoClass: 'ts-promo-green',
    }));

    const faqItems = [
        { q: 'Trường có ký túc xá cho sinh viên ở xa không?', a: 'Có. Ký túc xá hiện đại, an ninh 24/7, chi phí hợp lý cho sinh viên ở xa.' },
        { q: 'Cơ hội việc làm sau khi ra trường?', a: 'Cam kết 100% giới thiệu việc làm tại mạng lưới 200+ doanh nghiệp đối tác trong và ngoài nước.' },
        { q: 'Học phí có thể đóng theo từng kỳ không?', a: 'Có, nhà trường hỗ trợ đóng học phí theo từng học kỳ hoặc theo tháng để giảm áp lực tài chính.' },
        { q: 'Trường có chính sách hỗ trợ việc làm sau tốt nghiệp?', a: 'Có, trường có quan hệ hợp tác với nhiều doanh nghiệp và bệnh viện. Tỷ lệ có việc làm sau tốt nghiệp đạt trên 95%.' },
    ];

    return (
        <div className="admission-page">
            {/* ── Hero Area: Image (2/3) + Sidebar (1/3) ── */}
            <div className="ts-hero-area">
                <div className="ts-container">
                    <div className="ts-hero-grid">
                        {/* Hero Image */}
                        <div className="ts-hero-image-wrapper">
                            <Image
                                src="/thongtintuyensinh.png"
                                alt="Tuyển sinh 2026"
                                fill
                                priority
                                className="ts-hero-img"
                            />
                            <div className="ts-hero-overlay">
                                <span className="ts-hero-badge">Thông báo tuyển sinh</span>
                                <h1 className="ts-hero-title">
                                    Tuyển sinh hệ Trung cấp Chính quy năm 2026
                                </h1>
                                <p className="ts-hero-desc">
                                    Nhà trường thông báo xét tuyển đợt 1 với nhiều ưu đãi hấp dẫn dành cho tân sinh viên nhập học sớm.
                                </p>
                                <a href="#register" className="ts-hero-cta">
                                    Xem chi tiết <span className="material-symbols-outlined">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="ts-hero-sidebar">
                            {/* News */}
                            <div className="ts-news-panel">
                                <div className="ts-news-header">
                                    <h3>Tin tức mới nhất</h3>
                                    <a href="/tin-tuc">Xem tất cả</a>
                                </div>
                                <ul className="ts-news-list">
                                    {newsItems.map((item, i) => (
                                        <li key={i} className="ts-news-item">
                                            <a href="#">
                                                <div className="ts-news-date">
                                                    <span className="month">{item.month}</span>
                                                    <span className="day">{item.day}</span>
                                                </div>
                                                <div>
                                                    <h4 className="ts-news-title">{item.title}</h4>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Tại sao chọn MTPC? ── */}
            <div className="ts-why-section" id="why-choose">
                <div className="ts-container">
                    <div className="ts-section-header-center">
                        <h2>Tại sao chọn MTPC?</h2>
                        <div className="ts-divider"></div>
                    </div>
                    <div className="ts-stats-grid">
                        {visibleStats.map((stat) => (
                            <div key={stat.key} className="ts-stat-card">
                                <div className="ts-stat-number">{stat.value}</div>
                                <div className="ts-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Điều kiện & Hình thức xét tuyển ── */}
            <div className="ts-conditions-section" id="conditions">
                <div className="ts-container">
                    <div className="ts-section-header">
                        <div className="ts-bar"></div>
                        <h2>Điều kiện &amp; Hình thức xét tuyển</h2>
                    </div>
                    <div className="ts-conditions-grid">
                        {/* Card 1 */}
                        <div className="ts-condition-card">
                            <div className="ts-condition-card-header">
                                <span className="material-symbols-outlined icon">verified_user</span>
                                <h3>Đối tượng tuyển sinh</h3>
                            </div>
                            <ul className="ts-condition-list">
                                <li>
                                    <span className="material-symbols-outlined icon-check">check_circle</span>
                                    <span>Tốt nghiệp Trung học phổ thông (THPT) hoặc tương đương.</span>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined icon-check">check_circle</span>
                                    <span>Tốt nghiệp Trung học cơ sở (THCS) đối với hệ Trung cấp.</span>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined icon-check">check_circle</span>
                                    <span>Sức khỏe tốt, lý lịch rõ ràng.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Card 2 */}
                        <div className="ts-condition-card">
                            <div className="ts-condition-card-header">
                                <span className="material-symbols-outlined icon">folder_shared</span>
                                <h3>Hồ sơ nhập học</h3>
                            </div>
                            <ul className="ts-condition-list">
                                <li>
                                    <span className="material-symbols-outlined icon-arrow">arrow_right</span>
                                    <span>01 Phiếu đăng ký xét tuyển (theo mẫu).</span>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined icon-arrow">arrow_right</span>
                                    <span>01 Bản sao công chứng học bạ THPT/THCS.</span>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined icon-arrow">arrow_right</span>
                                    <span>01 Bản sao công chứng Bằng tốt nghiệp hoặc giấy CNTN tạm thời.</span>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined icon-arrow">arrow_right</span>
                                    <span>01 Bản sao Giấy khai sinh &amp; CCCD.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Card 3 - Timeline */}
                        <div className="ts-timeline-card">
                            <span className="ts-timeline-bg-icon material-symbols-outlined">calendar_month</span>
                            <div className="ts-timeline-card-header">
                                <span className="material-symbols-outlined icon">schedule</span>
                                <h3>Thời gian xét tuyển</h3>
                            </div>
                            <div className="ts-timeline-list">
                                <div className="ts-timeline-item">
                                    <span className="label">Đợt 1</span>
                                    <span className="value">Từ 01/03 đến 30/06</span>
                                </div>
                                <div className="ts-timeline-item muted">
                                    <span className="label">Đợt 2</span>
                                    <span className="value">Từ 01/07 đến 31/08</span>
                                </div>
                                <div className="ts-timeline-item muted">
                                    <span className="label">Đợt bổ sung</span>
                                    <span className="value">Tháng 9 - Tháng 11</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Ngành tuyển sinh 2026 ── */}
            <div className="ts-programs-section" id="majors">
                <div className="ts-container">
                    <div className="ts-programs-header">
                        <div>
                            <span className="ts-label">Chương trình đào tạo</span>
                            <h2>Các ngành tuyển sinh 2026</h2>
                        </div>
                        <a href="/dao-tao">
                            Xem chi tiết các khoa <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
                        </a>
                    </div>
                    <div className="ts-programs-grid">
                        {programs.map((program) => (
                            <div key={program.id} className="ts-program-card">
                                <div className="ts-program-image">
                                    <Image
                                        src={program.image}
                                        alt={program.name}
                                        width={300}
                                        height={180}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div className="ts-program-badge">Mã ngành: {program.code || String(program.id).padStart(5, '6')}</div>
                                </div>
                                <div className="ts-program-body">
                                    <h3>{program.name}</h3>
                                    <div className="ts-program-meta">
                                        <p><span>Thời gian:</span> {program.duration}</p>
                                        <p><span>Chỉ tiêu:</span> {program.quota} sinh viên</p>
                                        <p><span>Bằng cấp:</span> Trung cấp Chính quy</p>
                                    </div>
                                    <a href="#" className="ts-program-link">Xem chương trình học</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Đăng ký xét tuyển ── */}
            <div className="ts-register-section" id="dang-ky">
                <div className="ts-container">
                    <div className="ts-register-grid">
                        {/* Guide Sidebar */}
                        <div className="ts-register-guide">
                            <h3>Hướng dẫn đăng ký</h3>
                            <p>Để đảm bảo quyền lợi, thí sinh vui lòng điền đầy đủ và chính xác thông tin cá nhân.</p>
                            <ol>
                                <li>Điền thông tin cá nhân.</li>
                                <li>Chọn ngành học mong muốn.</li>
                                <li>Tải lên ảnh chụp hồ sơ (nếu có).</li>
                                <li>Nhấn &quot;Gửi hồ sơ&quot;.</li>
                            </ol>
                            <div className="ts-guide-support">
                                <h4>Cần hỗ trợ?</h4>
                                <p>Liên hệ phòng tuyển sinh:</p>
                                <p className="phone">{siteConfig.contact.phoneAdmissions.includes('__TODO__') ? '(0292) 222 55 77' : siteConfig.contact.phoneAdmissions}</p>
                                <div className="ts-zalo-contact">
                                    <a
                                        href={siteConfig.contact.zaloOA.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ts-zalo-btn"
                                    >
                                        <Image
                                            src="/zalo_logo.webp"
                                            alt="Zalo Icon"
                                            width={16}
                                            height={16}
                                        />
                                        <span>Zalo: {siteConfig.contact.zaloOA.number}</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <AdmissionForm />
                    </div>
                </div>
            </div>

            {/* ── Học phí & FAQ ── */}
            <div className="ts-tuition-section" id="tuition">
                <div className="ts-container">
                    <div className="ts-tuition-grid">
                        {/* Tuition Table */}
                        <div className="ts-tuition-table-wrapper">
                            <h3>Biểu phí học tập</h3>
                            <table className="ts-tuition-table">
                                <thead>
                                    <tr>
                                        <th>Ngành học</th>
                                        <th>Học phí / Năm</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feeData.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.fee}</td>
                                            <td className={item.promoClass}>{item.promo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* FAQ */}
                        <div className="ts-faq-wrapper">
                            <h3>Câu hỏi thường gặp</h3>
                            <div className="ts-faq-list">
                                {faqItems.map((item, i) => (
                                    <details key={i} className="ts-faq-item">
                                        <summary>
                                            {item.q}
                                            <span className="material-symbols-outlined faq-icon">expand_more</span>
                                        </summary>
                                        <div className="ts-faq-answer">{item.a}</div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
