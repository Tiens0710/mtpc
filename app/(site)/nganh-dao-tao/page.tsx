import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { allPrograms } from '@/lib/programs';
import { siteConfig } from '@/lib/site-config';
import styles from './nganh-dao-tao.module.css';

export const metadata: Metadata = {
    title: 'Ngành đào tạo',
    description: `Danh sách ngành đào tạo tại ${siteConfig.school.nameFull}: Y sĩ đa khoa, Dược sĩ, Điều dưỡng, Hộ sinh, CNTT Ứng dụng AI.`,
};

export default function NganhDaoTaoPage() {
    return (
        <div className={styles.container}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroBadge}>
                        Chương trình đào tạo
                    </span>
                    <h1 className={styles.heroTitle}>
                        Ngành đào tạo
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Chọn ngành học phù hợp để mở lối cho hành trình phát triển sự nghiệp của bạn
                    </p>
                </div>
            </section>

            {/* Programs Grid */}
            <section className={styles.gridSection}>
                <div className={styles.grid}>
                    {allPrograms.map((program) => (
                        <Link
                            key={program.slug}
                            href={`/nganh-dao-tao/${program.slug}`}
                            className={styles.card}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={program.image}
                                    alt={program.name}
                                    fill
                                    className={styles.cardImage}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className={styles.imageOverlay}>
                                    <span className={`${styles.levelBadge} ${program.level !== 'trung-cap' ? styles.levelBadgeSec : ''}`}>
                                        {program.level === 'trung-cap' ? 'Trung cấp' : 'Sơ cấp'}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.cardBody}>
                                <h2 className={styles.cardTitle}>
                                    {program.name}
                                </h2>
                                <p className={styles.cardDesc}>
                                    {program.description}
                                </p>
                                <div className={styles.tagsRow}>
                                    <span className={styles.tag}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>schedule</span>
                                        {program.duration}
                                    </span>
                                    <span className={styles.tag}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>group</span>
                                        {program.enrollment} chỉ tiêu
                                    </span>
                                </div>
                                <span className={styles.cardLink}>
                                    Xem chi tiết
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}