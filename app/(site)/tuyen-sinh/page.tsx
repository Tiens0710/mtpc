import Image from 'next/image';
import './tuyen-sinh.css';
import { programs } from '../../data/programs';

export default function TuyenSinhPage() {
    return (
        <div className="admission-page">
            {/* Hero Banner */}
            <div className="admission-hero">
                <Image
                    src="/thongtintuyensinh.png"
                    alt="Tuyển sinh 2026"
                    fill
                    priority
                    className="admission-hero-image"
                />
                <div className="admission-hero-overlay">
                    <h1 className="admission-hero-title">
                        KHỞI ĐẦU TƯƠNG LAI<br />
                        TỪ HÔM NAY
                    </h1>
                    <p className="admission-hero-subtitle">
                        Thông tin tuyển sinh năm học 2026 - Trường Trung cấp Miền Tây
                    </p>
                </div>
            </div>

            {/* Nội dung */}
            <div className="admission-content">
                {/* Điều kiện tuyển sinh */}
                <section className="section">
                    <h2 className="section-title">Điều kiện tuyển sinh</h2>
                    <ul className="simple-list">
                        <li>📋 Độ tuổi: Từ 15 tuổi trở lên</li>
                        <li>🎓 Bằng cấp: Tốt nghiệp THCS hoặc THPT</li>
                        <li>📄 Hồ sơ: Bản sao bằng tốt nghiệp, CMND/CCCD, ảnh 3x4</li>
                        <li>💪 Sức khỏe: Đủ sức khỏe theo quy định</li>
                    </ul>
                </section>

                {/* Ngành đào tạo - Với hình ảnh */}
                <section className="section">
                    <h2 className="section-title">Ngành tuyển sinh 2026</h2>
                    <div className="programs-grid-images">
                        {programs.map((program) => (
                            <div key={program.id} className="program-card-image">
                                <div className="program-image-wrapper">
                                    <Image
                                        src={program.image}
                                        alt={program.name}
                                        width={300}
                                        height={180}
                                        className="program-img"
                                    />
                                </div>
                                <div className="program-card-content">
                                    <h3>{program.name}</h3>
                                    <p className="program-meta">
                                        ⏱️ {program.duration} | 👥 Chỉ tiêu: {program.quota}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Đăng ký */}
                <section className="section contact-section">
                    <h2 className="section-title" style={{ borderLeft: 'none', textAlign: 'center', paddingLeft: 0 }}>
                        Đăng ký xét tuyển ngay
                    </h2>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>
                        Điền thông tin để nhận tư vấn và đăng ký xét tuyển
                    </p>
                    <div style={{ textAlign: 'center' }}>
                        <a href="/tuyen-sinh/dang-ky" className="btn-primary">
                            ĐĂNG KÝ NGAY
                        </a>
                    </div>
                    <div className="contact-info">
                        <p>📞 Hotline: <strong>(0292) 222 55 77</strong></p>
                        <p>📧 Email: tuyensinh@mtpc.edu.vn</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
