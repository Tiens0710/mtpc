import Image from 'next/image';

const facilities = [
    {
        name: 'Phòng thực hành Y khoa',
        image: '/images/facilities/phong-y-khoa.png',
        description: 'Trang bị mô hình giải phẫu, dụng cụ y tế hiện đại phục vụ thực hành lâm sàng',
    },
    {
        name: 'Phòng thực hành Điều dưỡng',
        image: '/images/facilities/phong-dieu-duong.png',
        description: 'Giường bệnh, thiết bị chăm sóc mô phỏng môi trường bệnh viện thực tế',
    },
    {
        name: 'Xưởng thực hành Cơ khí',
        image: '/images/facilities/xuong-co-khi.png',
        description: 'Máy tiện, máy phay CNC và các thiết bị cơ khí chính xác hiện đại',
    },
    {
        name: 'Phòng thực hành Điện tử',
        image: '/images/facilities/phong-dien-tu.png',
        description: 'Thiết bị đo lường, bo mạch thực hành và hệ thống nhúng tiên tiến',
    },
    {
        name: 'Phòng máy tính',
        image: '/images/facilities/phong-may-tinh.png',
        description: 'Hệ thống máy tính cấu hình cao, kết nối internet tốc độ cao',
    },
    {
        name: 'Thư viện',
        image: '/images/facilities/thu-vien.png',
        description: 'Kho sách đa dạng, không gian học tập yên tĩnh và hiện đại',
    },
];

export default function FacilitiesSection() {
    return (
        <section className="facilities-section">
            <div className="facilities-container">
                <div className="facilities-header">
                    <span className="section-badge">Cơ sở vật chất</span>
                    <h2 className="facilities-title">Cơ sở thực hành hiện đại</h2>
                    <p className="facilities-desc">
                        Đầu tư trang thiết bị hiện đại, mô phỏng môi trường làm việc thực tế
                        giúp sinh viên tự tin khi ra trường
                    </p>
                </div>

                <div className="facilities-grid">
                    {facilities.map((facility, index) => (
                        <div key={index} className="facility-card">
                            <div className="facility-image-wrapper">
                                <Image
                                    src={facility.image}
                                    alt={facility.name}
                                    width={400}
                                    height={250}
                                    className="facility-image"
                                />
                                <div className="facility-overlay">
                                    <p>{facility.description}</p>
                                </div>
                            </div>
                            <h3 className="facility-name">{facility.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
