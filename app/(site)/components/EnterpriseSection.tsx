import Image from 'next/image';

const partners = [
    {
        name: 'Bệnh viện Đa khoa Trung ương Cần Thơ',
        logo: '/images/partners/bv-cantho.png',
        type: 'Y tế',
    },
    {
        name: 'Bệnh viện Đa khoa Miền Tây',
        logo: '/images/partners/bv-mientay.png',
        type: 'Y tế',
    },
    {
        name: 'Công ty TNHH Cơ khí Minh Phát',
        logo: '/images/partners/ck-minhphat.png',
        type: 'Cơ khí',
    },
    {
        name: 'Công ty CP Điện tử Hòa Phát',
        logo: '/images/partners/dt-hoaphat.png',
        type: 'Điện tử',
    },
    {
        name: 'Nhà thuốc Long Châu',
        logo: '/images/partners/longchau.png',
        type: 'Dược',
    },
    {
        name: 'Shopee Việt Nam',
        logo: '/images/partners/shopee.png',
        type: 'TMĐT',
    },
];

export default function EnterpriseSection() {
    return (
        <section className="enterprise-section">
            <div className="enterprise-container">
                <div className="enterprise-header">
                    <h2 className="enterprise-title">Liên kết Doanh nghiệp</h2>
                    <p className="enterprise-desc">
                        Hợp tác chặt chẽ với các doanh nghiệp hàng đầu, đảm bảo sinh viên
                        được thực tập và có cơ hội việc làm ngay sau tốt nghiệp
                    </p>
                </div>

                <div className="enterprise-stats">
                    <div className="stat-item">
                        <span className="stat-number">30+</span>
                        <span className="stat-label">Doanh nghiệp đối tác</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">95%</span>
                        <span className="stat-label">Có việc làm sau tốt nghiệp</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Vị trí thực tập mỗi năm</span>
                    </div>
                </div>

                <div className="enterprise-grid">
                    {partners.map((partner, index) => (
                        <div key={index} className="enterprise-card">
                            <div className="enterprise-logo-wrapper">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={120}
                                    height={60}
                                    className="enterprise-logo"
                                />
                            </div>
                            <div className="enterprise-info">
                                <h4>{partner.name}</h4>
                                <span className="enterprise-type">{partner.type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
