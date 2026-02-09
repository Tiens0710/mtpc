import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import './dao-tao.css';


export default function DaoTaoPage() {
    // Dữ liệu demo cho các ngành học
    const programs = [
        {
            id: 1,
            name: "Cơ khí",
            description: "Đào tạo kỹ thuật viên cơ khí với kiến thức chuyên sâu về thiết kế, chế tạo và bảo trì các thiết bị cơ khí. Chương trình trang bị kỹ năng thực hành và lý thuyết vững chắc.",
            duration: "2 - 3 năm",
            image: "/images/co-khi.png"
        },
        {
            id: 2,
            name: "Điện tử",
            description: "Chương trình đào tạo về điện tử viễn thông, mạch điện tử, và hệ thống nhúng. Sinh viên được thực hành trên thiết bị hiện đại, đáp ứng nhu cầu công nghiệp 4.0.",
            duration: "2 - 3 năm",
            image: "/images/dien-tu.png"
        },
        {
            id: 3,
            name: "Y sĩ",
            description: "Đào tạo y sĩ đa khoa với chương trình học chất lượng cao, kết hợp lý thuyết và thực hành lâm sàng. Cơ sở vật chất hiện đại, đội ngũ giảng viên giàu kinh nghiệm.",
            duration: "2 năm",
            image: "/images/y-si.png"
        },
        {
            id: 4,
            name: "Điều dưỡng",
            description: "Chương trình đào tạo điều dưỡng chuyên nghiệp, trang bị kiến thức chăm sóc sức khỏe toàn diện. Thực hành tại các bệnh viện và cơ sở y tế uy tín.",
            duration: "2 năm",
            image: "/images/dieu-duong.png"
        },
        {
            id: 5,
            name: "Thương mại điện tử",
            description: "Đào tạo chuyên gia thương mại điện tử với kiến thức marketing online, quản trị website, và phân tích dữ liệu. Bắt kịp xu hướng kinh doanh số hiện đại.",
            duration: "2 - 3 năm",
            image: "/images/thuong-mai-dien-tu.png"
        }
    ];

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

            <Footer />
        </div>
    );
}
