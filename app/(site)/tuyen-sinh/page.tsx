import Image from 'next/image';
import './tuyen-sinh.css';

export default function TuyenSinhPage() {
    return (
        <div className="admission-page">
            {/* Hero Banner */}
            <div className="admission-hero">
                <Image
                    src="/slide-1.jpg"
                    alt="Tuyển sinh 2026"
                    fill
                    priority
                    className="admission-hero-image"
                />
                <div className="admission-hero-overlay">
                    <h1 className="admission-hero-title">
                        TUYỂN SINH 2026
                    </h1>
                    <p className="admission-hero-subtitle">
                        Mở cửa tương lai - Đăng ký ngay để nhận ưu đãi đặc biệt
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

                {/* Ngành đào tạo */}
                <section id="programs" className="section">
                    <h2 className="section-title">Ngành tuyển sinh 2026</h2>
                    <div className="programs-grid">
                        <div className="program-card">
                            <h3>⚕️ Y sĩ đa khoa</h3>
                            <p>Thời gian: 2 năm | Chỉ tiêu: 150</p>
                        </div>
                        <div className="program-card">
                            <h3>💉 Điều dưỡng</h3>
                            <p>Thời gian: 2 năm | Chỉ tiêu: 200</p>
                        </div>
                        <div className="program-card">
                            <h3>⚙️ Cơ khí</h3>
                            <p>Thời gian: 2-3 năm | Chỉ tiêu: 80</p>
                        </div>
                        <div className="program-card">
                            <h3>💻 Điện tử</h3>
                            <p>Thời gian: 2-3 năm | Chỉ tiêu: 80</p>
                        </div>
                        <div className="program-card">
                            <h3>🛒 Thương mại điện tử</h3>
                            <p>Thời gian: 2-3 năm | Chỉ tiêu: 100</p>
                        </div>
                    </div>
                </section>

                {/* Liên hệ */}
                <section id="register" className="section contact-section">
                    <h2 className="section-title" style={{ borderLeft: 'none', textAlign: 'center', paddingLeft: 0 }}>
                        Đăng ký tư vấn
                    </h2>
                    <div className="contact-info">
                        <p>📞 Hotline: <strong>(0292) 222 55 77</strong></p>
                        <p>📧 Email: tuyensinh@mtpc.edu.vn</p>
                    </div>
                    <a href="/lien-he" className="btn-primary">
                        ĐĂNG KÝ NGAY
                    </a>
                </section>
            </div>
        </div>
    );
}
