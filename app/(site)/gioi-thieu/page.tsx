import type { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Giới thiệu',
    description: `${siteConfig.school.nameFull} - ${siteConfig.school.description}`,
};

const values = [
    { icon: 'school', title: 'Chất lượng', desc: 'Đào tạo đạt chuẩn, giáo trình cập nhật theo Bộ Y tế và xu hướng công nghệ.' },
    { icon: 'precision_manufacturing', title: 'Thực hành', desc: 'Tỷ lệ thực hành cao, phòng lab hiện thực, thực tập tại doanh nghiệp & bệnh viện đối tác.' },
    { icon: 'account_balance', title: 'Trách nhiệm', desc: 'Cam kết đồng hành với học viên từ nhập học đến có việc làm sau tốt nghiệp.' },
    { icon: 'lightbulb', title: 'Đổi mới', desc: 'Tích hợp AI, ứng dụng công nghệ vào giảng dạy và quản lý giáo dục.' },
];

const milestones = [
    { year: '2010', event: 'Thành lập trường theo QĐ 3096/2010/QĐ-UBND' },
    { year: '2013', event: 'Sửa đổi bổ sung theo QĐ 771/QĐ-UBND' },
    { year: '2018', event: 'Mở rộng thêm ngành Y tế: Điều dưỡng, Hộ sinh' },
    { year: '2022', event: 'Ra mắt chương trình CNTT định hướng AI' },
    { year: '2024', event: 'Triển khai hệ thống xác thực bằng cấp blockchain' },
    { year: '2026', event: '16 năm đào tạo — hơn 5.000 cử nhân, kỹ thuật viên' },
];

export default function GioiThieuPage() {
    return (
        <div className="about-page">
            {/* Hero */}
            <section style={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #4CAF50 100%)',
            }}>
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', padding: '2rem' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.4rem 1.2rem',
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        backdropFilter: 'blur(10px)',
                    }}>GIỚI THIỆU</span>
                    <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                        {siteConfig.school.nameFull}
                    </h1>
                    <p style={{ fontSize: '1.15rem', maxWidth: 700, margin: '0 auto', opacity: 0.9, lineHeight: 1.6 }}>
                        {siteConfig.school.description}
                    </p>
                </div>
            </section>

            {/* Tổng quan */}
            <section style={{ padding: '5rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.4rem 1rem',
                        background: '#e3f2fd',
                        color: '#1976d2',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        marginBottom: '1rem',
                    }}>TỔNG QUAN</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0c4a6e', marginBottom: '1rem' }}>
                        Về Trường Trung cấp Miền Tây
                    </h2>
                    <p style={{ color: '#64748b', lineHeight: 1.7, maxWidth: 800, margin: '0 auto', fontSize: '1.05rem' }}>
                        {siteConfig.school.nameFull} ({siteConfig.school.nameShort}) được thành lập từ năm {siteConfig.legal.foundingYear},
                        theo {siteConfig.legal.foundingDecree}. Trường trực thuộc quản lý của {siteConfig.school.nameFull},
                        chuyên đào tạo nguồn nhân lực ngành Y tế và Công nghệ thông tin cho khu vực Đồng bằng sông Cửu Long.
                    </p>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '2rem',
                    marginTop: '3rem',
                }}>
                    {[
                        { num: `${siteConfig.legal.yearsOfOperation()}+`, label: 'Năm kinh nghiệm' },
                        { num: '5+', label: 'Ngành đào tạo' },
                        { num: '5000+', label: 'Cựu học viên' },
                        { num: '200+', label: 'Đối tác doanh nghiệp' },
                    ].map((s, i) => (
                        <div key={i} style={{
                            textAlign: 'center',
                            padding: '2rem 1rem',
                            background: '#f8fbff',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                        }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2E7D32', lineHeight: 1 }}>{s.num}</div>
                            <div style={{ marginTop: '0.5rem', fontWeight: 600, color: '#475569' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lịch sử phát triển */}
            <section style={{ padding: '5rem 1.5rem', background: '#f8fbff' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.4rem 1rem',
                            background: '#e8f5e9',
                            color: '#2E7D32',
                            borderRadius: '20px',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            marginBottom: '1rem',
                        }}>LỊCH SỬ</span>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0c4a6e' }}>Hành trình phát triển</h2>
                    </div>

                    <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
                        <div style={{
                            position: 'absolute',
                            left: '0.75rem',
                            top: 0,
                            bottom: 0,
                            width: '2px',
                            background: 'linear-gradient(180deg, #2E7D32, #81C784)',
                        }} />
                        {milestones.map((m, i) => (
                            <div key={i} style={{
                                position: 'relative',
                                marginBottom: '2rem',
                                padding: '1.25rem 1.5rem',
                                background: 'white',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '-2.15rem',
                                    top: '1.5rem',
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    background: '#2E7D32',
                                    border: '3px solid #e8f5e9',
                                }} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2E7D32', letterSpacing: '0.05em' }}>{m.year}</span>
                                <p style={{ marginTop: '0.25rem', color: '#334155', lineHeight: 1.6 }}>{m.event}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tầm nhìn & Sứ mệnh */}
            <section style={{ padding: '5rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.4rem 1rem',
                        background: '#e8f5e9',
                        color: '#2E7D32',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        marginBottom: '1rem',
                    }}>TẦM NHÌN & SỨ MỆNH</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={{
                        padding: '2.5rem',
                        background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
                        borderRadius: '20px',
                        border: '1px solid #c8e6c9',
                    }}>
                        <div style={{ width: 56, height: 56, borderRadius: '14px', background: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '1.75rem' }}>visibility</span>
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1B5E20', marginBottom: '1rem' }}>Tầm nhìn</h3>
                        <p style={{ color: '#334155', lineHeight: 1.7 }}>{siteConfig.vision}</p>
                    </div>
                    <div style={{
                        padding: '2.5rem',
                        background: 'linear-gradient(135deg, #e3f2fd, #e8eaf6)',
                        borderRadius: '20px',
                        border: '1px solid #bbdefb',
                    }}>
                        <div style={{ width: 56, height: 56, borderRadius: '14px', background: '#1565c0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '1.75rem' }}>flag</span>
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0D47A1', marginBottom: '1rem' }}>Sứ mệnh</h3>
                        <p style={{ color: '#334155', lineHeight: 1.7 }}>{siteConfig.mission}</p>
                    </div>
                </div>
            </section>

            {/* Giá trị cốt lõi */}
            <section style={{ padding: '5rem 1.5rem', background: '#f8fbff' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0c4a6e' }}>Giá trị cốt lõi</h2>
                        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>4 giá trị nền tảng định hướng mọi hoạt động của nhà trường</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {values.map((v, i) => (
                            <div key={i} style={{
                                padding: '2rem',
                                background: 'white',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#2E7D32', marginBottom: '1rem', display: 'block' }}>{v.icon}</span>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1B5E20', marginBottom: '0.75rem' }}>{v.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Đội ngũ giảng viên placeholder */}
            <section style={{ padding: '5rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.4rem 1rem',
                        background: '#fff3e0',
                        color: '#e65100',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        marginBottom: '1rem',
                    }}>ĐỘI NGŨ</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0c4a6e', marginBottom: '1rem' }}>
                        Đội ngũ giảng viên
                    </h2>
                    <p style={{ color: '#64748b', lineHeight: 1.7, maxWidth: 700, margin: '0 auto' }}>
                        Đội ngũ giảng viên có trình độ chuyên môn cao, nhiều năm kinh nghiệm trong giảng dạy và thực hành
                        tại các bệnh viện, cơ sở y tế và doanh nghiệp công nghệ hàng đầu khu vực.
                    </p>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginTop: '2rem',
                }}>
                    {[
                        { role: 'Chuyên ngành Y tế', desc: 'Giảng viên có chứng chỉ hành nghề, nhiều năm kinh nghiệm lâm sàng tại bệnh viện tuyến tỉnh.' },
                        { role: 'Chuyên ngành Dược', desc: 'Dược sĩ có chứng chỉ hành nghề dược, kinh nghiệm tại chuỗi nhà thuốc và công ty dược.' },
                        { role: 'Chuyên ngành CNTT-AI', desc: 'Kỹ sư CNTT có kinh nghiệm triển khai AI cho doanh nghiệp, certifications quốc tế.' },
                    ].map((t, i) => (
                        <div key={i} style={{
                            padding: '2rem',
                            background: 'white',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        }}>
                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem', color: '#2E7D32' }}>person</span>
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>{t.role}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>{t.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lãnh đạo */}
            <section style={{ padding: '5rem 1.5rem', background: '#f8fbff' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0c4a6e', marginBottom: '2rem' }}>Lãnh đạo nhà trường</h2>
                    <div style={{
                        padding: '2.5rem',
                        background: 'white',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e8f5e9', margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#2E7D32' }}>school</span>
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1B5E20', marginBottom: '0.25rem' }}>
                            {siteConfig.leadership.principal.name}
                        </h3>
                        <p style={{ color: '#64748b', fontWeight: 500 }}>{siteConfig.leadership.principal.title}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}