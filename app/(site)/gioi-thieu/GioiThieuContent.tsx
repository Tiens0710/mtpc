'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import styles from './gioi-thieu.module.css';

/* ── data slides ─────────────────────────────────────────────────── */

const aboutSlides = [
    {
        image: '/herobanner/about_slide1.png',
        badge: '🏛️ LỊCH SỬ & QUY MÔ',
        title: '16 NĂM HÌNH THÀNH & PHÁT TRIỂN',
        desc: 'MTPC là cái nôi đào tạo nguồn nhân lực Y tế & CNTT chất lượng cao tại ĐBSCL từ năm 2010.',
        stats: [
            { num: '16+', label: 'Năm hoạt động' },
            { num: '5.000+', label: 'Cựu học viên thành đạt' },
            { num: '200+', label: 'Doanh nghiệp liên kết' }
        ]
    },
    {
        image: '/herobanner/about_slide2.png',
        badge: '🎯 TẦM NHÌN & SỨ MỆNH',
        title: 'TIÊN PHONG CÔNG NGHỆ & ĐỔI MỚI',
        desc: 'Tiên phong tích hợp trí tuệ nhân tạo (AI) và công nghệ Blockchain vào giảng dạy thực tiễn.',
        stats: [
            { num: '100%', label: 'Giáo trình thực tiễn' },
            { num: 'Ứng dụng AI', label: 'Phương pháp dạy học' },
            { num: 'Blockchain', label: 'Bằng cấp tin cậy' }
        ]
    },
    {
        image: '/herobanner/about_slide3.png',
        badge: '🩺 CƠ SỞ VẬT CHẤT & ĐỘI NGŨ',
        title: 'HỌC ĐI ĐÔI VỚI HÀNH',
        desc: 'Môi trường học tập chuẩn quốc tế với thời lượng thực hành lên đến 70% tại bệnh viện & doanh nghiệp.',
        stats: [
            { num: '70%', label: 'Thời lượng thực hành' },
            { num: 'Chuẩn Bộ Y tế', label: 'Phòng lab y khoa' },
            { num: '200+ Đối tác', label: 'Bệnh viện & Doanh nghiệp' }
        ]
    }
];

/* ── data ─────────────────────────────────────────────────────────── */

const highlights = [
    { icon: 'verified', num: `${siteConfig.legal.yearsOfOperation()}+`, label: 'Năm hoạt động' },
    { icon: 'groups', num: '5.000+', label: 'Cựu học viên' },
    { icon: 'apartment', num: '200+', label: 'Đối tác' },
];

const values = [
    { icon: 'school', title: 'Chất lượng', desc: 'Đào tạo đạt chuẩn, giáo trình cập nhật theo Bộ Y tế và xu hướng công nghệ mới nhất.' },
    { icon: 'precision_manufacturing', title: 'Thực hành', desc: 'Tỷ lệ thực hành cao, phòng lab hiện đại, thực tập tại doanh nghiệp & bệnh viện đối tác.' },
    { icon: 'account_balance', title: 'Trách nhiệm', desc: 'Cam kết đồng hành với học viên từ nhập học đến có việc làm sau tốt nghiệp.' },
    { icon: 'lightbulb', title: 'Đổi mới', desc: 'Tích hợp AI, ứng dụng công nghệ vào giảng dạy và quản lý giáo dục hiện đại.' },
];

const milestones = [
    { year: '2010', icon: 'school', title: 'Thành lập trường', event: 'UBND TP Cần Thơ ký quyết định thành lập trường, đặt viên gạch đầu tiên cho sứ mệnh đào tạo nghề chất lượng cao.' },
    { year: '2013', icon: 'architecture', title: 'Mở rộng quy mô', event: 'Điều chỉnh bổ sung quy mô hoạt động, nâng cấp toàn diện cơ sở vật chất giảng dạy.' },
    { year: '2018', icon: 'medical_services', title: 'Mở rộng Khối Y tế', event: 'Bổ sung đào tạo Y sĩ đa khoa, Điều dưỡng, Hộ sinh cung cấp nguồn nhân lực y tế cốt lõi cho vùng ĐBSCL.' },
    { year: '2022', icon: 'psychology', title: 'Đổi mới CNTT & AI', event: 'Tiên phong ra mắt chương trình Công nghệ thông tin tích hợp Trí tuệ nhân tạo (AI) thực tiễn.' },
    { year: '2024', icon: 'verified_user', title: 'Công nghệ Blockchain', event: 'Triển khai thành công công nghệ chuỗi khối Blockchain vào hệ thống xác thực văn bằng tin cậy.' },
    { year: '2026', icon: 'workspace_premium', title: 'Hành trình 16 năm', event: 'Kỷ niệm cột mốc 16 năm phát triển, đào tạo hơn 5.000 học viên thành đạt phục vụ kinh tế vùng.' },
];

const teamCards = [
    {
        icon: 'medical_services',
        role: 'Chuyên ngành Y tế',
        desc: 'Y bác sĩ giàu kinh nghiệm lâm sàng từ các bệnh viện lớn.',
        colorTheme: 'emerald',
        image: '/images/y-si.png'
    },
    {
        icon: 'vaccines',
        role: 'Chuyên ngành Dược',
        desc: 'Dược sĩ chuyên môn cao, có kinh nghiệm vận hành nhà thuốc.',
        colorTheme: 'teal',
        image: '/images/dieu-duong.png'
    },
    {
        icon: 'code',
        role: 'Chuyên ngành CNTT-AI',
        desc: 'Kỹ sư phần mềm và chuyên gia AI thực chiến từ doanh nghiệp.',
        colorTheme: 'purple',
        image: '/images/dien-tu.png'
    }
];

const whyChooseUs = [
    { 
        image: '/images/y-si.png', 
        title: 'Y sĩ đa khoa & Dược sĩ', 
        desc: 'Đào tạo kỹ năng lâm sàng khám chữa bệnh và cấp phát thuốc chuyên nghiệp chuẩn Bộ Y tế.' 
    },
    { 
        image: '/images/dieu-duong.png', 
        title: 'Điều dưỡng & Hộ sinh', 
        desc: 'Rèn luyện kỹ thuật chăm sóc sức khỏe toàn diện cho bệnh nhân, sản phụ và sơ sinh.' 
    },
    { 
        image: '/images/dien-tu.png', 
        title: 'Công nghệ thông tin & AI', 
        desc: 'Trang bị kỹ năng lập trình, Prompt Engineering và ứng dụng trí tuệ nhân tạo vào thực tiễn.' 
    },
    { 
        image: '/images/co-khi.png', 
        title: 'Kỹ thuật Sửa chữa máy tính', 
        desc: 'Tập trung thực hành chẩn đoán phần cứng, lắp ráp và nâng cấp thiết bị máy tính, mạng.' 
    }
];

const departments = [
    {
        icon: 'corporate_fare',
        title: 'Ban Giám hiệu & Phòng ban',
        badge: 'Hành chính & Quản lý',
        desc: 'Vận hành chuyên nghiệp, khoa học, đồng hành cùng học viên trong suốt quá trình học tập.',
        colorTheme: 'blue',
        image: '/images/about_overview.png',
        items: [
            { title: 'Ban Giám hiệu', desc: 'Chỉ đạo và định hướng chiến lược phát triển nhà trường.' },
            { title: 'Phòng Đào tạo', desc: 'Xây dựng chương trình học, tổ chức thi và cấp văn bằng.' },
            { title: 'Phòng Tuyển sinh', desc: 'Tư vấn hướng nghiệp và tiếp nhận hồ sơ xét tuyển.' },
            { title: 'Phòng Công tác HSSV', desc: 'Hỗ trợ đời sống, học bổng và giới thiệu việc làm.' }
        ]
    },
    {
        icon: 'medical_services',
        title: 'Khoa Y - Dược',
        badge: 'Y tế & Chăm sóc sức khỏe',
        desc: 'Đào tạo nguồn nhân lực y tế tận tâm, giỏi thực hành lâm sàng và y đức nghề nghiệp.',
        colorTheme: 'emerald',
        image: '/images/y-si.png',
        items: [
            { title: 'Ngành chính', desc: 'Y sĩ đa khoa, Dược sĩ, Điều dưỡng, Hộ sinh.' },
            { title: 'Giảng viên', desc: 'Y bác sĩ, dược sĩ đại học giàu kinh nghiệm lâm sàng.' },
            { title: 'Thực tập', desc: 'Thực hành lâm sàng tại các bệnh viện lớn ở Cần Thơ.' },
            { title: 'Phòng Lab đạt chuẩn', desc: 'Cơ sở vật chất đầy đủ mô hình thực hành y khoa hiện đại.' }
        ]
    },
    {
        icon: 'code',
        title: 'Khoa Kỹ thuật - Công nghệ',
        badge: 'Công nghệ & Kỹ thuật số',
        desc: 'Đào tạo ứng dụng thực tế, tiên phong tích hợp Trí tuệ nhân tạo (AI) vào giảng dạy.',
        colorTheme: 'purple',
        image: '/images/dien-tu.png',
        items: [
            { title: 'Ngành chính', desc: 'Công nghệ thông tin ứng dụng AI & Robotics.' },
            { title: 'Giảng viên', desc: 'Kỹ sư phần mềm và chuyên gia công nghệ từ doanh nghiệp.' },
            { title: 'Thực hành', desc: 'Phòng máy cấu hình cao, thực tập thực tế tại doanh nghiệp.' },
            { title: 'Hệ song bằng 9+', desc: 'Học văn hóa THPT song song học nghề sau tốt nghiệp THCS.' }
        ]
    }
];

/* ── hooks ────────────────────────────────────────────────────────── */

/** IntersectionObserver-based reveal */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add(styles.revealVisible);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

/** Stagger reveal (children animate in sequence) */
function useStagger() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add(styles.staggerVisible);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

/** Timeline line grows step-by-step to each dot with pauses */
function useTimelineAuto(totalDots: number) {
    const timelineRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeline = timelineRef.current;
        const line = lineRef.current;
        if (!timeline || !line) return;

        const dots = timeline.querySelectorAll<HTMLElement>('[data-timeline-dot]');

        // Timing config
        const GROW_DURATION_MS = 500;  // time to grow from one dot to next
        const PAUSE_AT_DOT_MS = 350;   // pause when reaching a dot

        // Add smooth CSS transition
        line.style.transition = `height ${GROW_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    runSteppedAnimation();
                    observer.unobserve(timeline);
                }
            },
            { threshold: 0.15 },
        );
        observer.observe(timeline);

        function runSteppedAnimation() {
            if (!line) return;

            let cumulativeDelay = 200; // initial delay before starting

            for (let i = 0; i < totalDots; i++) {
                const targetPercent = ((i + 1) / (totalDots + 1)) * 100;

                // Schedule: grow to this dot
                setTimeout(() => {
                    if (line) line.style.height = `${targetPercent}%`;
                }, cumulativeDelay);

                cumulativeDelay += GROW_DURATION_MS;

                // Schedule: activate this dot
                setTimeout(() => {
                    if (dots[i]) {
                        dots[i].classList.add(styles.dotActive);
                    }
                }, cumulativeDelay);

                cumulativeDelay += PAUSE_AT_DOT_MS;
            }

            // Final segment: grow to 100%
            setTimeout(() => {
                if (line) line.style.height = '100%';
            }, cumulativeDelay);
        }

        return () => observer.disconnect();
    }, [totalDots]);

    return { timelineRef, lineRef };
}

/** Animated counter */
function useCountUp(target: number, duration = 2000) {
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const step = (now: number) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                        el.textContent = Math.floor(eased * target).toLocaleString('vi-VN');
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.3 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [target, duration]);

    return ref;
}

/* ── sub-components ──────────────────────────────────────────────── */

function RevealWrap({ children, className = '' }: { children: ReactNode; className?: string }) {
    const ref = useReveal();
    return (
        <div ref={ref} className={`${styles.reveal} ${className}`}>
            {children}
        </div>
    );
}

function StatCard({ num, suffix, label, icon }: { num: number; suffix: string; label: string; icon: string }) {
    const countRef = useCountUp(num);
    return (
        <div className={styles.statCard}>
            <div className={styles.statIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>{icon}</span>
            </div>
            <div className={styles.statNumber}>
                <span ref={countRef}>0</span>{suffix}
            </div>
            <div className={styles.statLabel}>{label}</div>
        </div>
    );
}

/* ── page ────────────────────────────────────────────────────────── */

export default function GioiThieuContent() {
    const statsRef = useStagger();
    const { timelineRef, lineRef: timelineLineRef } = useTimelineAuto(milestones.length);
    const vmRef = useStagger();
    const valuesRef = useStagger();
    const teamRef = useStagger();
    const whyRef = useStagger();
    const orgRef = useStagger();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeDept, setActiveDept] = useState(0);

    // Tự động chuyển slide mỗi 5 giây
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % aboutSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="about-page">
            {/* ── Hero Slideshow ── */}
            <section className={styles.heroSlideshow}>
                <div className={styles.slideshowContainer}>
                    {aboutSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ''}`}
                        >
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority={index === 0}
                            />
                            
                            {/* Lớp overlay gradient làm mờ nền để làm nổi bật văn bản */}
                            <div className={styles.slideOverlay} />

                            <div className={styles.heroContent}>
                                <span className={styles.heroBadge}>{slide.badge}</span>
                                <h1 className={styles.heroTitle}>{slide.title}</h1>
                                <p className={styles.heroDesc}>{slide.desc}</p>

                                <div className={styles.heroStats}>
                                    {slide.stats.map((stat, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <div className={styles.heroStatItem}>
                                                <div className={styles.heroStatNum}>{stat.num}</div>
                                                <div className={styles.heroStatLabel}>{stat.label}</div>
                                            </div>
                                            {i < slide.stats.length - 1 && <div className={styles.heroStatDivider} />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Các nút chỉ báo chuyển slide (Dots) */}
                <div className={styles.slideshowDots}>
                    {aboutSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.slideshowDot} ${index === currentSlide ? styles.slideshowDotActive : ''}`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* ── Tổng quan (text + image) ── */}
            <section className={styles.sectionCenter}>
                <RevealWrap>
                    <div className={styles.sectionHeader}>
                        <span className={`${styles.sectionBadge} ${styles.badgeBlue}`}>Tổng quan</span>
                        <h2 className={styles.sectionTitle}>Về Trường Trung cấp Miền Tây</h2>
                        <div className={styles.sectionUnderline} />
                    </div>
                </RevealWrap>

                <div className={styles.overviewGrid}>
                    <RevealWrap>
                        <div className={styles.overviewCard}>
                            <p className={styles.overviewIntro}>
                                Thành lập từ năm {siteConfig.legal.foundingYear}, <span className={styles.overviewHighlight}>{siteConfig.school.nameShort}</span> trực thuộc UBND TP. Cần Thơ, dưới sự quản lý của Sở Lao động - Thương binh & Xã hội.
                            </p>
                            
                            <div className={styles.overviewFeatures}>
                                <div className={styles.overviewFeatureItem}>
                                    <div className={styles.overviewFeatureIconWrap}>
                                        <span className="material-symbols-outlined">domain</span>
                                    </div>
                                    <div className={styles.overviewFeatureText}>
                                        <h4>Đối tượng & Hệ đào tạo</h4>
                                        <p>Tuyển sinh học sinh tốt nghiệp THCS (hệ song bằng 9+), tốt nghiệp THPT và các khóa liên thông, Văn bằng 2.</p>
                                    </div>
                                </div>
                                <div className={styles.overviewFeatureItem}>
                                    <div className={styles.overviewFeatureIconWrap}>
                                        <span className="material-symbols-outlined">school</span>
                                    </div>
                                    <div className={styles.overviewFeatureText}>
                                        <h4>Ngành đào tạo trọng điểm</h4>
                                        <p>Chuyên sâu nhóm ngành Sức khỏe (Y sĩ đa khoa, Dược sĩ, Điều dưỡng) và Công nghệ thông tin định hướng AI thực tiễn.</p>
                                    </div>
                                </div>
                                <div className={styles.overviewFeatureItem}>
                                    <div className={styles.overviewFeatureIconWrap}>
                                        <span className="material-symbols-outlined">rocket_launch</span>
                                    </div>
                                    <div className={styles.overviewFeatureText}>
                                        <h4>Xét tuyển & Đổi mới</h4>
                                        <p>Xét tuyển học bạ nhanh chóng (không thi tuyển). Tiên phong ứng dụng Blockchain và AI trong đào tạo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealWrap>
                    <RevealWrap>
                        <div className={styles.overviewImageWrapper}>
                            <img
                                src="/images/about_overview.png"
                                alt="Trường Trung cấp Miền Tây"
                                className={styles.overviewImage}
                            />
                            <div className={styles.overviewImageOverlay}>
                                <div className={styles.overviewImageOverlayTitle}>Cơ sở đào tạo tại Cần Thơ</div>
                                <div className={styles.overviewImageOverlayDesc}>192-194 Ngô Quyền, P. An Hòa, Q. Ninh Kiều</div>
                            </div>
                        </div>
                    </RevealWrap>
                </div>
            </section>

            {/* ── Thống kê ── */}
            <section className={styles.statsSection}>
                <RevealWrap>
                    <div className={styles.sectionHeader}>
                        <span className={`${styles.sectionBadge} ${styles.badgeGreen}`}>Thành tích</span>
                        <h2 className={styles.sectionTitle}>Con số ấn tượng</h2>
                        <p className={styles.sectionSubtitle}>
                            Những con số minh chứng cho sự nỗ lực không ngừng của nhà trường
                        </p>
                        <div className={styles.sectionUnderline} />
                    </div>
                </RevealWrap>

                <div ref={statsRef} className={`${styles.statsGrid} ${styles.stagger}`}>
                    <StatCard num={siteConfig.legal.yearsOfOperation()} suffix="+" label="Năm kinh nghiệm" icon="calendar_month" />
                    <StatCard num={5} suffix="+" label="Ngành đào tạo" icon="menu_book" />
                    <StatCard num={5000} suffix="+" label="Cựu học viên" icon="groups" />
                    <StatCard num={200} suffix="+" label="Đối tác doanh nghiệp" icon="handshake" />
                </div>
            </section>

            {/* ── Lịch sử phát triển (alternating timeline) ── */}
            <section className={styles.timelineSection}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <RevealWrap>
                        <div className={styles.sectionHeader}>
                            <span className={`${styles.sectionBadge} ${styles.badgeGreen}`}>Lịch sử</span>
                            <h2 className={styles.sectionTitle}>Hành trình phát triển</h2>
                            <p className={styles.sectionSubtitle}>
                                Từ ngày thành lập đến hiện tại, nhà trường đã có những bước tiến đáng kể
                            </p>
                            <div className={styles.sectionUnderline} />
                        </div>
                    </RevealWrap>

                    <div ref={timelineRef} className={`${styles.timeline}`}>
                        <div className={styles.timelineTrack} />
                        <div ref={timelineLineRef} className={styles.timelineLine} />
                        {milestones.map((m, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <div
                                    key={i}
                                    className={`${styles.timelineItem} ${isLeft ? styles.timelineItemLeft : styles.timelineItemRight}`}
                                >
                                    <div className={styles.timelineDot} data-timeline-dot />
                                    <div className={styles.timelineCard}>
                                        <div className={styles.timelineCardHeader}>
                                            <div className={styles.timelineIconWrap}>
                                                <span className="material-symbols-outlined">{m.icon}</span>
                                            </div>
                                            <div className={styles.timelineYearBadge}>{m.year}</div>
                                        </div>
                                        <h3 className={styles.timelineCardTitle}>{m.title}</h3>
                                        <p className={styles.timelineEvent}>{m.event}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Tầm nhìn & Sứ mệnh ── */}
            <section className={styles.vmSection}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <RevealWrap>
                        <div className={styles.sectionHeader}>
                            <span className={`${styles.sectionBadge} ${styles.badgeGreen}`}>Tầm nhìn & Sứ mệnh</span>
                            <h2 className={styles.sectionTitle}>Định hướng phát triển</h2>
                            <div className={styles.sectionUnderline} />
                        </div>
                    </RevealWrap>

                    <div ref={vmRef} className={`${styles.vmGrid} ${styles.stagger}`}>
                        {/* Vision */}
                        <div className={`${styles.vmCard} ${styles.vmVision}`}>
                            <div className={styles.vmIconWrap}>
                                <span className="material-symbols-outlined">visibility</span>
                            </div>
                            <h3 className={styles.vmTitle}>Tầm nhìn</h3>
                            <p className={styles.vmText}>{siteConfig.vision}</p>
                        </div>
                        {/* Mission */}
                        <div className={`${styles.vmCard} ${styles.vmMission}`}>
                            <div className={styles.vmIconWrap}>
                                <span className="material-symbols-outlined">flag</span>
                            </div>
                            <h3 className={styles.vmTitle}>Sứ mệnh</h3>
                            <p className={styles.vmText}>{siteConfig.mission}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Giá trị cốt lõi ── */}
            <section className={styles.sectionAlt}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <RevealWrap>
                        <div className={styles.sectionHeader}>
                            <span className={`${styles.sectionBadge} ${styles.badgeOrange}`}>Giá trị</span>
                            <h2 className={styles.sectionTitle}>Giá trị cốt lõi</h2>
                            <p className={styles.sectionSubtitle}>
                                4 giá trị nền tảng định hướng mọi hoạt động của nhà trường
                            </p>
                            <div className={styles.sectionUnderline} />
                        </div>
                    </RevealWrap>

                    <div ref={valuesRef} className={`${styles.valuesGrid} ${styles.stagger}`}>
                        {values.map((v, i) => (
                            <div key={i} className={styles.valueCard}>
                                <div className={styles.valueIconWrap}>
                                    <span className={`material-symbols-outlined ${styles.valueIcon}`}>{v.icon}</span>
                                </div>
                                <h4 className={styles.valueTitle}>{v.title}</h4>
                                <p className={styles.valueDesc}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tại sao chọn MTPC ── */}
            <section className={styles.sectionWhite}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <RevealWrap>
                        <div className={styles.sectionHeader}>
                            <span className={`${styles.sectionBadge} ${styles.badgePurple}`}>Ngành đào tạo</span>
                            <h2 className={styles.sectionTitle}>Các ngành đào tạo chính tại MTPC</h2>
                            <p className={styles.sectionSubtitle}>
                                Chương trình đào tạo bám sát thực tế với 70% thời lượng thực hành trực quan
                            </p>
                            <div className={styles.sectionUnderline} />
                        </div>
                    </RevealWrap>

                    <div ref={whyRef} className={`${styles.subjectGrid} ${styles.stagger}`}>
                        {whyChooseUs.map((item, i) => (
                            <div key={i} className={styles.subjectCard}>
                                <div className={styles.subjectImageWrapper}>
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className={styles.subjectImage}
                                    />
                                </div>
                                <div className={styles.subjectContent}>
                                    <h4 className={styles.subjectTitle}>{item.title}</h4>
                                    <p className={styles.subjectDesc}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Cơ cấu tổ chức & Khoa đào tạo ── */}
            <section className={styles.sectionAlt}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <RevealWrap>
                        <div className={styles.sectionHeader}>
                            <span className={`${styles.sectionBadge} ${styles.badgeBlue}`}>Tổ chức</span>
                            <h2 className={styles.sectionTitle}>Cơ cấu tổ chức & Khoa đào tạo</h2>
                            <p className={styles.sectionSubtitle}>
                                Hệ thống quản lý khoa học và các khoa chuyên môn đáp ứng tiêu chuẩn đào tạo chất lượng cao
                            </p>
                            <div className={styles.sectionUnderline} />
                        </div>
                    </RevealWrap>

                    {/* Bộ lọc Tab điều khiển */}
                    <RevealWrap>
                        <div className={styles.deptTabs}>
                            {departments.map((dept, i) => (
                                <button
                                    key={i}
                                    className={`${styles.deptTabBtn} ${activeDept === i ? styles.deptTabBtnActive : ''} ${styles[`theme-${dept.colorTheme}`]}`}
                                    onClick={() => setActiveDept(i)}
                                    role="tab"
                                    aria-selected={activeDept === i}
                                >
                                    <span className="material-symbols-outlined">{dept.icon}</span>
                                    <span className={styles.deptTabBtnText}>{dept.title}</span>
                                </button>
                            ))}
                        </div>
                    </RevealWrap>

                    {/* Chi tiết nội dung của Tab đang chọn */}
                    <div className={`${styles.deptContentWrapper} ${styles[`activeTheme-${departments[activeDept].colorTheme}`]}`}>
                        <div className={styles.deptContentGrid}>
                            {/* Cột trái: Thông tin tổng quan khoa/ban */}
                            <div className={styles.deptOverviewCard}>
                                <span className={styles.deptOverviewBadge}>
                                    {departments[activeDept].badge}
                                </span>
                                <h3 className={styles.deptOverviewTitle}>
                                    {departments[activeDept].title}
                                </h3>
                                <p className={styles.deptOverviewDesc}>
                                    {departments[activeDept].desc}
                                </p>
                                <div className={styles.deptOverviewImage}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={departments[activeDept].image}
                                        alt={departments[activeDept].title}
                                    />
                                </div>
                                <div className={styles.deptOverviewVisual}>
                                    <span className="material-symbols-outlined">{departments[activeDept].icon}</span>
                                </div>
                            </div>

                            {/* Cột phải: Danh sách chi tiết */}
                            <div className={styles.deptItemsList}>
                                {departments[activeDept].items.map((item, idx) => (
                                    <div key={idx} className={styles.deptItemRow}>
                                        <div className={styles.deptItemIcon}>
                                            <span className="material-symbols-outlined">check_circle</span>
                                        </div>
                                        <div className={styles.deptItemText}>
                                            <h4>{item.title}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Đội ngũ giảng viên ── */}
            <section className={styles.sectionCenter}>
                <RevealWrap>
                    <div className={styles.sectionHeader}>
                        <span className={`${styles.sectionBadge} ${styles.badgeTeal}`}>Đội ngũ</span>
                        <h2 className={styles.sectionTitle}>Đội ngũ giảng viên</h2>
                        <p className={styles.sectionSubtitle}>
                            Đội ngũ giảng viên có trình độ chuyên môn cao, nhiều năm kinh nghiệm trong giảng dạy
                            và thực hành tại các bệnh viện, cơ sở y tế và doanh nghiệp công nghệ hàng đầu khu vực.
                        </p>
                        <div className={styles.sectionUnderline} />
                    </div>
                </RevealWrap>

                <div ref={teamRef} className={`${styles.teamGrid} ${styles.stagger}`}>
                    {teamCards.map((t, i) => (
                        <div key={i} className={`${styles.teamCard} ${styles[`theme-${t.colorTheme}`]}`}>
                            <div className={styles.teamCardImage}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={t.image} alt={t.role} className={styles.teamImg} />
                                <div className={styles.teamCardIconWrap}>
                                    <span className="material-symbols-outlined">{t.icon}</span>
                                </div>
                            </div>
                            <div className={styles.teamCardContent}>
                                <h4 className={styles.teamRole}>{t.role}</h4>
                                <p className={styles.teamDesc}>{t.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Lãnh đạo ── */}
            <section className={styles.leaderSection}>
                <RevealWrap>
                    <div className={styles.sectionHeader}>
                        <span className={`${styles.sectionBadge} ${styles.badgeGreen}`}>Lãnh đạo</span>
                        <h2 className={styles.sectionTitle}>Lãnh đạo nhà trường</h2>
                        <div className={styles.sectionUnderline} />
                    </div>
                </RevealWrap>

                <RevealWrap>
                    <div className={styles.leaderCard}>
                        <div className={styles.leaderAvatar}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/principal.png"
                                alt={siteConfig.leadership.principal.name}
                                className={styles.leaderImg}
                            />
                        </div>
                        <h3 className={styles.leaderName}>{siteConfig.leadership.principal.name}</h3>
                        <p className={styles.leaderTitle}>{siteConfig.leadership.principal.title}</p>
                    </div>
                </RevealWrap>
            </section>

            {/* ── CTA ── */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>Sẵn sàng bắt đầu hành trình?</h2>
                    <p className={styles.ctaDesc}>
                        Hãy để chúng tôi đồng hành cùng bạn trên con đường chinh phục tri thức
                        và xây dựng tương lai nghề nghiệp vững chắc.
                    </p>
                    <div className={styles.ctaButtons}>
                        <a href="/tuyen-sinh" className={styles.ctaBtnPrimary}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>app_registration</span>
                            Đăng ký tuyển sinh
                        </a>
                        <a href="/lien-he" className={styles.ctaBtnSecondary}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>call</span>
                            Liên hệ tư vấn
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}