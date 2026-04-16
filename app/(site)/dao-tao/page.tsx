import Image from 'next/image';
import './dao-tao.css';
import { programs } from '../../data/programs';

export default function DaoTaoPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Hero Banner */}
            <div className="hero-banner">
                <Image
                    src="/daotao.png"
                    alt="Chương trình đào tạo"
                    fill
                    priority
                    className="hero-banner-image"
                />
                <div className="hero-banner-overlay">
                    <div className="hero-content-box">
                        <h1 className="hero-banner-title">
                            MỞ RA TƯƠNG LAI<br />
                            VỚI KIẾN THỨC CHUYÊN SÂU
                        </h1>
                        <p className="hero-banner-subtitle">
                            Chương trình đào tạo thực tiễn, cập nhật xu hướng, dẫn lối thành công
                        </p>
                        <a href="#programs" className="hero-banner-btn">
                            KHÁM PHÁ CHƯƠNG TRÌNH
                        </a>
                    </div>
                </div>
            </div>

            <main className="training-page">
                <div className="training-container">
                    <div id="programs" className="programs-container">
                        {programs.map((program) => (
                            <div key={program.id} className="program-card">
                                <div className="program-image-wrapper">
                                    <Image
                                        src={program.image}
                                        alt={program.name}
                                        width={400}
                                        height={250}
                                        className="program-image"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <h2 className="program-name">{program.name}</h2>
                                <p className="program-description">{program.description}</p>

                                <div className="program-duration">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <span>Thời gian: {program.duration}</span>
                                </div>

                                <a href="#" className="program-link">
                                    Xem thêm
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
