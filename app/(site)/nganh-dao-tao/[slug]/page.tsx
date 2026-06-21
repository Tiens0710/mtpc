import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPrograms, getProgramBySlug, formatTuition } from '@/lib/programs';
import { siteConfig } from '@/lib/site-config';
import styles from './nganh-hoc.module.css';

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
        <div className={styles.container}>
            {/* Hero */}
            <section className={styles.hero}>
                <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    className={styles.heroImage}
                    priority
                    sizes="100vw"
                />
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    {/* Breadcrumb */}
                    <nav className={styles.breadcrumb}>
                        <Link href="/" className={styles.breadcrumbLink}>Trang chủ</Link>
                        <span className={styles.breadcrumbSeparator}>/</span>
                        <Link href="/nganh-dao-tao" className={styles.breadcrumbLink}>Ngành đào tạo</Link>
                        <span className={styles.breadcrumbSeparator}>/</span>
                        <span className={styles.breadcrumbActive}>{program.name}</span>
                    </nav>
                    <div className={styles.badgeContainer}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>school</span>
                        <span>
                            {program.level === 'trung-cap' ? 'Trung cấp' : 'Sơ cấp'} • Mã ngành: {program.code}
                        </span>
                    </div>
                    <h1 className={styles.heroTitle}>
                        {program.name}
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className={styles.contentSection}>
                <div className={styles.grid}>
                    {/* Main content */}
                    <div className={styles.mainColumn}>
                        <h2 className={styles.sectionTitle}>Giới thiệu ngành học</h2>
                        <p className={styles.introText}>
                            {program.description}
                        </p>

                        {/* Highlights */}
                        <h3 className={styles.subTitle}>
                            <span className="material-symbols-outlined" style={{ color: '#059669', fontSize: '1.4rem' }}>check_circle</span>
                            Điểm nổi bật
                        </h3>
                        <div className={styles.highlightsList}>
                            {program.highlights.map((h, i) => (
                                <div key={i} className={styles.highlightItem}>
                                    <span className={`material-symbols-outlined ${styles.highlightIcon}`}>check</span>
                                    <span className={styles.highlightText}>{h}</span>
                                </div>
                            ))}
                        </div>

                        {/* Career Paths */}
                        <h3 className={styles.subTitle}>
                            <span className="material-symbols-outlined" style={{ color: '#0284c7', fontSize: '1.4rem' }}>work</span>
                            Cơ hội nghề nghiệp
                        </h3>
                        <div className={styles.careersList}>
                            {program.careerPaths.map((c, i) => (
                                <div key={i} className={styles.careerItem}>
                                    <span className={`material-symbols-outlined ${styles.careerIcon}`}>trending_flat</span>
                                    <span className={styles.careerText}>{c}</span>
                                </div>
                            ))}
                        </div>

                        {/* Certificate */}
                        <div className={styles.certificateCard}>
                            <span className={`material-symbols-outlined ${styles.certificateIcon}`}>workspace_premium</span>
                            <div className={styles.certificateBody}>
                                <h4>Bằng cấp nhận được</h4>
                                <p>{program.certificate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarCard}>
                            <h3 className={styles.sidebarTitle}>
                                <span className="material-symbols-outlined" style={{ color: '#006a4e' }}>info</span>
                                Thông tin chương trình
                            </h3>
                            {[
                                { label: 'Thời gian học', value: program.duration, icon: 'schedule' },
                                { label: 'Học phí', value: formatTuition(program.tuitionPerYear), icon: 'payments' },
                                { label: 'Chỉ tiêu', value: `${program.enrollment} sinh viên`, icon: 'group' },
                                { label: 'Bằng cấp', value: program.certificate, icon: 'badge' },
                            ].map((item, i) => (
                                <div key={i} className={styles.infoRow}>
                                    <span className={`material-symbols-outlined ${styles.rowIcon}`}>{item.icon}</span>
                                    <div>
                                        <div className={styles.rowLabel}>{item.label}</div>
                                        <div className={styles.rowValue}>{item.value}</div>
                                    </div>
                                </div>
                            ))}

                            {program.tuitionNote && (
                                <div className={styles.tuitionPromo}>
                                    <span className={`material-symbols-outlined ${styles.promoIcon}`}>redeem</span>
                                    <div>
                                        {program.tuitionNote}
                                    </div>
                                </div>
                            )}

                            <Link
                                href="/tuyen-sinh"
                                className={styles.registerButton}
                            >
                                Liên hệ tư vấn
                            </Link>
                            <Link
                                href="/tuyen-sinh#tuition"
                                className={styles.tuitionButton}
                            >
                                Xem học phí chi tiết
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other programs */}
            <section className={styles.otherSection}>
                <div className={styles.otherContent}>
                    <h2 className={styles.otherTitle}>
                        Các ngành đào tạo khác
                    </h2>
                    <div className={styles.otherGrid}>
                        {allPrograms.filter(p => p.slug !== program.slug).map((p) => (
                            <Link
                                key={p.slug}
                                href={`/nganh-dao-tao/${p.slug}`}
                                className={styles.otherCard}
                            >
                                <div className={styles.otherImgWrapper}>
                                    <Image
                                        src={p.image}
                                        alt={p.name}
                                        fill
                                        className={styles.otherImg}
                                        sizes="56px"
                                    />
                                </div>
                                <div className={styles.otherInfo}>
                                    <h4 className={styles.otherName}>{p.shortName}</h4>
                                    <p className={styles.otherDuration}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>schedule</span>
                                        {p.duration}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}