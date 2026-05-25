import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { allPrograms } from '@/lib/programs';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Ngành đào tạo',
    description: `Danh sách ngành đào tạo tại ${siteConfig.school.nameFull}: Y sĩ đa khoa, Dược sĩ, Điều dưỡng, Hộ sinh, CNTT Ứng dụng AI.`,
};

export default function NganhDaoTaoPage() {
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
                    }}>CHƯƠNG TRÌNH ĐÀO TẠO</span>
                    <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                        Ngành đào tạo
                    </h1>
                    <p style={{ fontSize: '1.15rem', maxWidth: 650, margin: '0 auto', opacity: 0.9, lineHeight: 1.6 }}>
                        Chọn ngành phù hợp để bắt đầu hành trình sự nghiệp của bạn
                    </p>
                </div>
            </section>

            {/* Programs Grid */}
            <section style={{ padding: '5rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem',
                }}>
                    {allPrograms.map((program) => (
                        <Link
                            key={program.slug}
                            href={`/nganh-dao-tao/${program.slug}`}
                            style={{
                                display: 'block',
                                background: 'white',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                                <Image
                                    src={program.image}
                                    alt={program.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '1.5rem',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                                }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        background: program.level === 'trung-cap' ? 'rgba(46,125,50,0.9)' : 'rgba(25,118,210,0.9)',
                                        color: 'white',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}>
                                        {program.level === 'trung-cap' ? 'Trung cấp' : 'Sơ cấp'}
                                    </span>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                                    {program.name}
                                </h2>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {program.description}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <span style={{ padding: '0.3rem 0.75rem', background: '#f0f7f0', borderRadius: '8px', fontSize: '0.8rem', color: '#2E7D32', fontWeight: 500 }}>
                                        ⏱ {program.duration}
                                    </span>
                                    <span style={{ padding: '0.3rem 0.75rem', background: '#f0f7f0', borderRadius: '8px', fontSize: '0.8rem', color: '#2E7D32', fontWeight: 500 }}>
                                        🎓 {program.enrollment} chỉ tiêu
                                    </span>
                                </div>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: '#2E7D32',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                }}>
                                    Xem chi tiết
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}