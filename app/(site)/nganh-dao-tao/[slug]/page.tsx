import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPrograms, getProgramBySlug, formatTuition } from '@/lib/programs';
import { siteConfig } from '@/lib/site-config';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return allPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const program = getProgramBySlug(slug);
    if (!program) return { title: 'Không tìm thấy' };
    return {
        title: program.name,
        description: program.description,
    };
}

export default async function ProgramDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const program = getProgramBySlug(slug);
    if (!program) notFound();

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
            }}>
                <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                }} />
                <div style={{ position: 'relative', zIndex: 2, padding: '3rem', width: '100%', maxWidth: 1200, margin: '0 auto' }}>
                    {/* Breadcrumb */}
                    <nav style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                        <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Trang chủ</Link>
                        <span style={{ margin: '0 0.5rem' }}>/</span>
                        <Link href="/nganh-dao-tao" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Ngành đào tạo</Link>
                        <span style={{ margin: '0 0.5rem' }}>/</span>
                        <span style={{ color: 'white' }}>{program.name}</span>
                    </nav>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.3rem 0.8rem',
                        background: 'rgba(46,125,50,0.9)',
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                    }}>
                        {program.level === 'trung-cap' ? 'Trung cấp' : 'Sơ cấp'} • Mã ngành: {program.code}
                    </span>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>
                        {program.name}
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section style={{ padding: '4rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }}>
                    {/* Main content */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>Giới thiệu ngành học</h2>
                        <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                            {program.description}
                        </p>

                        {/* Highlights */}
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>Điểm nổi bật</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                            {program.highlights.map((h, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '1rem',
                                    background: '#f0f7f0',
                                    borderRadius: '12px',
                                    border: '1px solid #c8e6c9',
                                }}>
                                    <span className="material-symbols-outlined" style={{ color: '#2E7D32', fontSize: '1.25rem', marginTop: '2px' }}>check_circle</span>
                                    <span style={{ color: '#334155', lineHeight: 1.6 }}>{h}</span>
                                </div>
                            ))}
                        </div>

                        {/* Career Paths */}
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>Cơ hội nghề nghiệp</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                            {program.careerPaths.map((c, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '1rem',
                                    background: '#f8fbff',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                }}>
                                    <span className="material-symbols-outlined" style={{ color: '#1976d2', fontSize: '1.25rem', marginTop: '2px' }}>work</span>
                                    <span style={{ color: '#334155', lineHeight: 1.6 }}>{c}</span>
                                </div>
                            ))}
                        </div>

                        {/* Certificate */}
                        <div style={{
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
                            borderRadius: '16px',
                            border: '1px solid #c8e6c9',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ color: '#2E7D32', fontSize: '1.5rem' }}>badge</span>
                                <span style={{ fontWeight: 700, color: '#1B5E20', fontSize: '1.05rem' }}>Bằng cấp nhận được</span>
                            </div>
                            <p style={{ color: '#334155', fontSize: '1rem' }}>{program.certificate}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <div style={{
                            padding: '2rem',
                            background: 'white',
                            borderRadius: '20px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #e8f5e9' }}>
                                Thông tin chương trình
                            </h3>
                            {[
                                { label: 'Thời gian học', value: program.duration, icon: 'schedule' },
                                { label: 'Học phí', value: formatTuition(program.tuitionPerYear), icon: 'payments' },
                                { label: 'Chỉ tiêu', value: `${program.enrollment} sinh viên`, icon: 'group' },
                                { label: 'Bằng cấp', value: program.certificate, icon: 'badge' },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '0.75rem 0',
                                    borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none',
                                }}>
                                    <span className="material-symbols-outlined" style={{ color: '#2E7D32', fontSize: '1.25rem', marginTop: '2px' }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>{item.label}</div>
                                        <div style={{ fontSize: '0.95rem', color: '#1a1a1a', fontWeight: 600, marginTop: '0.15rem' }}>{item.value}</div>
                                    </div>
                                </div>
                            ))}

                            {program.tuitionNote && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '0.75rem 1rem',
                                    background: '#fff3e0',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    color: '#e65100',
                                    fontWeight: 500,
                                }}>
                                    🎁 {program.tuitionNote}
                                </div>
                            )}

                            <Link
                                href="/tuyen-sinh"
                                style={{
                                    display: 'block',
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
                                    color: 'white',
                                    textAlign: 'center',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 12px rgba(46,125,50,0.3)',
                                }}
                            >
                                Đăng ký xét tuyển
                            </Link>
                            <Link
                                href="/tuyen-sinh#tuition"
                                style={{
                                    display: 'block',
                                    marginTop: '0.75rem',
                                    padding: '1rem',
                                    background: 'white',
                                    color: '#2E7D32',
                                    textAlign: 'center',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    border: '2px solid #2E7D32',
                                }}
                            >
                                Xem học phí chi tiết
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other programs */}
            <section style={{ padding: '4rem 1.5rem', background: '#f8fbff' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '2rem', textAlign: 'center' }}>
                        Các ngành đào tạo khác
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {allPrograms.filter(p => p.slug !== program.slug).map((p) => (
                            <Link
                                key={p.slug}
                                href={`/nganh-dao-tao/${p.slug}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.25rem',
                                    background: 'white',
                                    borderRadius: '14px',
                                    border: '1px solid #e2e8f0',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <div style={{ width: 56, height: 56, borderRadius: '12px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                                    <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.15rem' }}>{p.shortName}</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{p.duration}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}