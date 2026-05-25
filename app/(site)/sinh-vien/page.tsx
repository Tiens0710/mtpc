import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Sinh viên',
    description: `Cổng thông tin sinh viên ${siteConfig.school.nameFull} — Lịch học, lịch thi, tài liệu, biểu mẫu.`,
};

const portalSections = [
    {
        icon: 'calendar_month',
        title: 'Lịch học',
        desc: 'Xem lịch học theo lớp, học kỳ và ngành đào tạo.',
        color: '#2E7D32',
        bg: '#e8f5e9',
    },
    {
        icon: 'quiz',
        title: 'Lịch thi',
        desc: 'Tra cứu lịch thi, quy chế thi và điểm thi.',
        color: '#1565c0',
        bg: '#e3f2fd',
    },
    {
        icon: 'folder',
        title: 'Tài liệu',
        desc: 'Tài liệu học tập, giáo trình và tài liệu ôn tập.',
        color: '#e65100',
        bg: '#fff3e0',
    },
    {
        icon: 'download',
        title: 'Biểu mẫu',
        desc: 'Các biểu mẫu trực tuyến: xin nghỉ học, chuyển lớp, xác nhận sinh viên.',
        color: '#6a1b9a',
        bg: '#f3e5f5',
    },
];

const quickLinks = [
    { label: 'Lịch học tuần này', icon: 'event', href: '#' },
    { label: 'Lịch thi sắp tới', icon: 'assignment', href: '#' },
    { label: 'Xác nhận sinh viên', icon: 'verified_user', href: '#' },
    { label: 'Đăng ký thi lại', icon: 'replay', href: '#' },
    { label: 'Học bổng', icon: 'emoji_events', href: '#' },
    { label: 'Quy chế đào tạo', icon: 'policy', href: '#' },
];

export default function SinhVienPage() {
    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{
                position: 'relative',
                height: '380px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0D47A1 0%, #1565c0 60%, #42A5F5 100%)',
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
                    }}>CỔNG SINH VIÊN</span>
                    <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                        Khu vực sinh viên
                    </h1>
                    <p style={{ fontSize: '1.15rem', maxWidth: 650, margin: '0 auto', opacity: 0.9, lineHeight: 1.6 }}>
                        Tra cứu lịch học, lịch thi, tài liệu và các biểu mẫu cần thiết
                    </p>
                </div>
            </section>

            {/* Portal Sections */}
            <section style={{ padding: '5rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0c4a6e', marginBottom: '0.75rem' }}>Chức năng chính</h2>
                    <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Truy cập nhanh các tiện ích dành cho sinh viên</p>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {portalSections.map((s, i) => (
                        <div key={i} style={{
                            padding: '2rem',
                            background: 'white',
                            borderRadius: '20px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}>
                            <div style={{
                                width: 64,
                                height: 64,
                                borderRadius: '16px',
                                background: s.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem', color: s.color }}>{s.icon}</span>
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>{s.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Links */}
            <section style={{ padding: '4rem 1.5rem', background: '#f8fbff' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '2rem', textAlign: 'center' }}>
                        Truy cập nhanh
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                        {quickLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.25rem 1.5rem',
                                    background: 'white',
                                    borderRadius: '14px',
                                    border: '1px solid #e2e8f0',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ color: '#2E7D32', fontSize: '1.5rem' }}>{link.icon}</span>
                                <span style={{ fontWeight: 600, color: '#334155' }}>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section style={{ padding: '4rem 1.5rem', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                <div style={{
                    padding: '3rem',
                    background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
                    borderRadius: '24px',
                    border: '1px solid #c8e6c9',
                }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1B5E20', marginBottom: '0.75rem' }}>
                        Cần hỗ trợ?
                    </h3>
                    <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                        Liên hệ phòng Đào tạo để được hỗ trợ về lịch học, lịch thi và các thủ tục hành chính.
                    </p>
                    <Link
                        href="/lien-he"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.9rem 2rem',
                            background: '#2E7D32',
                            color: 'white',
                            borderRadius: '12px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(46,125,50,0.3)',
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>support_agent</span>
                        Liên hệ hỗ trợ
                    </Link>
                </div>
            </section>
        </div>
    );
}