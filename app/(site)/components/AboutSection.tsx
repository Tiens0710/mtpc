'use client';

import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import styles from './AboutSection.module.css';

export default function AboutSection() {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.decorTop} aria-hidden="true" />
            <div className={styles.decorBottom} aria-hidden="true" />

            <div className={styles.aboutGrid}>
                <div className={styles.aboutCopy}>
                    <div className={styles.sectionLabel}>
                        <span aria-hidden="true" />
                        <p>Giới thiệu</p>
                        <span aria-hidden="true" />
                    </div>

                    <h2>Đồng hành cùng bạn trên hành trình vững nghề</h2>

                    <p className={styles.description}>
                        Trường Trung cấp Miền Tây được thành lập theo{' '}
                        <strong>{siteConfig.legal.foundingDecree}</strong>
                        ; {siteConfig.legal.amendmentDecree}. Trải qua hơn{' '}
                        <strong className={styles.years}>{siteConfig.legal.yearsOfOperation()} năm</strong>{' '}
                        phát triển, trường luôn tập trung vào chương trình đào tạo thực tiễn, giúp người học có kiến thức chuyên môn và kỹ năng làm việc vững vàng.
                    </p>

                    <p className={styles.tagline}>{siteConfig.school.tagline}</p>
                </div>

                <div className={styles.representativeFrame}>
                    <Image
                        src="/images/principal.png"
                        alt="Đại diện nhà trường"
                        fill
                        sizes="(max-width: 767px) 100vw, 42vw"
                        className={styles.representativeImage}
                    />
                </div>
            </div>
        </section>
    );
}
