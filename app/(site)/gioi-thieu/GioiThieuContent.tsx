'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { siteConfig } from '@/lib/site-config';
import styles from './gioi-thieu.module.css';

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
    { year: '2010', event: 'Thành lập trường theo QĐ 3096/2010/QĐ-UBND ngày 15/11/2010 của UBND TP Cần Thơ' },
    { year: '2013', event: 'Sửa đổi bổ sung theo QĐ 771/QĐ-UBND ngày 30/03/2013, mở rộng quy mô đào tạo' },
    { year: '2018', event: 'Mở rộng thêm ngành Y tế: Điều dưỡng, Hộ sinh — đáp ứng nhu cầu nhân lực y tế vùng ĐBSCL' },
    { year: '2022', event: 'Ra mắt chương trình CNTT định hướng AI, tiên phong ứng dụng trí tuệ nhân tạo trong giáo dục' },
    { year: '2024', event: 'Triển khai hệ thống xác thực bằng cấp blockchain — bảo mật, minh bạch, không thể giả mạo' },
    { year: '2026', event: '16 năm đào tạo — hơn 5.000 cử nhân, kỹ thuật viên đóng góp cho sự phát triển vùng ĐBSCL' },
];

const teamCards = [
    { icon: 'medical_services', role: 'Chuyên ngành Y tế', desc: 'Giảng viên có chứng chỉ hành nghề, nhiều năm kinh nghiệm lâm sàng tại bệnh viện tuyến tỉnh.' },
    { icon: 'vaccines', role: 'Chuyên ngành Dược', desc: 'Dược sĩ có chứng chỉ hành nghề dược, kinh nghiệm tại chuỗi nhà thuốc và công ty dược phẩm.' },
    { icon: 'code', role: 'Chuyên ngành CNTT-AI', desc: 'Kỹ sư CNTT có kinh nghiệm triển khai AI cho doanh nghiệp, certifications quốc tế.' },
];

const whyChooseUs = [
    { icon: 'medical_services', title: 'Ngành Y tế uy tín', desc: 'Đào tạo Y sĩ, Điều dưỡng, Hộ sinh với chương trình thực hành tại bệnh viện đối tác.' },
    { icon: 'code', title: 'CNTT ứng dụng AI', desc: 'Chương trình CNTT tiên phong tích hợp AI, robotics, IoT — kỹ năng thực tế cho tương lai.' },
    { icon: 'workspace_premium', title: 'Bằng cấp xác thực blockchain', desc: 'Bằng cấp được lưu trữ trên blockchain, không thể giả mạo, được doanh nghiệp tin tưởng.' },
    { icon: 'handshake', title: 'Hỗ trợ việc làm', desc: 'Kết nối với 200+ đối tác doanh nghiệp, tỷ lệ có việc làm sau tốt nghiệp cao.' },
    { icon: 'payments', title: 'Học phí hợp lý', desc: 'Học phí phải chăng với nhiều chính sách hỗ trợ, học bổng cho sinh viên có hoàn cảnh khó khăn.' },
    { icon: 'groups_3', title: 'Giảng viên tâm huyết', desc: 'Đội ngũ giảng viên có chứng chỉ hành nghề, nhiều năm kinh nghiệm thực tiễn.' },
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

function HeroWave() {
    return (
        <div className={styles.heroWave}>
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="white" />
            </svg>
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

    return (
        <div className="about-page">
            {/* ── Hero ── */}
            <section className={styles.hero}>
                {/* floating particles */}
                <div className={styles.heroParticles}>
                    <span /><span /><span /><span /><span /><span />
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.heroBreadcrumb}>
                        <a href="/">Trang chủ</a>
                        <span className={styles.heroBreadcrumbSep}>/</span>
                        <span>Giới thiệu</span>
                    </div>
                    <span className={styles.heroBadge}>Về chúng tôi</span>
                    <h1 className={styles.heroTitle}>{siteConfig.school.nameFull}</h1>
                    <p className={styles.heroDesc}>{siteConfig.school.description}</p>

                    <div className={styles.heroStats}>
                        {highlights.map((h, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div className={styles.heroStatItem}>
                                    <div className={styles.heroStatNum}>{h.num}</div>
                                    <div className={styles.heroStatLabel}>{h.label}</div>
                                </div>
                                {i < highlights.length - 1 && <div className={styles.heroStatDivider} />}
                            </div>
                        ))}
                    </div>
                </div>

                <HeroWave />
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
                        <div>
                            <p className={styles.overviewText}>
                                <span className={styles.overviewHighlight}>{siteConfig.school.nameFull}</span> ({siteConfig.school.nameShort})
                                được thành lập từ năm {siteConfig.legal.foundingYear}, theo {siteConfig.legal.foundingDecree}.
                            </p>
                            <p className={styles.overviewText}>
                                Trường trực thuộc quản lý của UBND TP Cần Thơ, chuyên đào tạo nguồn nhân lực
                                ngành <span className={styles.overviewHighlight}>Y tế</span> và{' '}
                                <span className={styles.overviewHighlight}>Công nghệ thông tin</span> cho khu vực
                                Đồng bằng sông Cửu Long.
                            </p>
                            <p className={styles.overviewText}>
                                Với triết lý &ldquo;{siteConfig.school.tagline}&rdquo;, trường không ngừng đổi mới
                                chương trình đào tạo, tích hợp AI và công nghệ blockchain vào giáo dục,
                                nhằm mang đến cho học viên những kỹ năng thực tiễn nhất.
                            </p>
                        </div>
                    </RevealWrap>
                    <RevealWrap>
                        <div className={styles.overviewImageWrapper}>
                            <img
                                src="/ctump.jpg"
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
            <section className={styles.sectionAlt}>
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
            <section className={styles.sectionWhite}>
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
                                        <div className={styles.timelineYear}>{m.year}</div>
                                        <p className={styles.timelineEvent}>{m.event}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Tầm nhìn & Sứ mệnh ── */}
            <section className={styles.sectionCenter}>
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
                        <div className={`${styles.vmIconWrap} ${styles.vmIconGreen}`}>
                            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '1.75rem' }}>visibility</span>
                        </div>
                        <h3 className={`${styles.vmTitle} ${styles.vmTitleGreen}`}>Tầm nhìn</h3>
                        <p className={styles.vmText}>{siteConfig.vision}</p>
                    </div>
                    {/* Mission */}
                    <div className={`${styles.vmCard} ${styles.vmMission}`}>
                        <div className={`${styles.vmIconWrap} ${styles.vmIconBlue}`}>
                            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '1.75rem' }}>flag</span>
                        </div>
                        <h3 className={`${styles.vmTitle} ${styles.vmTitleBlue}`}>Sứ mệnh</h3>
                        <p className={styles.vmText}>{siteConfig.mission}</p>
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
                            <span className={`${styles.sectionBadge} ${styles.badgePurple}`}>Lợi thế</span>
                            <h2 className={styles.sectionTitle}>Tại sao chọn MTPC?</h2>
                            <p className={styles.sectionSubtitle}>
                                Những lý do khiến MTPC trở thành lựa chọn hàng đầu cho tương lai của bạn
                            </p>
                            <div className={styles.sectionUnderline} />
                        </div>
                    </RevealWrap>

                    <div ref={whyRef} className={`${styles.teamGrid} ${styles.stagger}`}>
                        {whyChooseUs.map((item, i) => (
                            <div key={i} className={styles.teamCard}>
                                <div className={styles.teamAvatar}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem', color: '#2E7D32' }}>{item.icon}</span>
                                </div>
                                <h4 className={styles.teamRole}>{item.title}</h4>
                                <p className={styles.teamDesc}>{item.desc}</p>
                            </div>
                        ))}
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
                        <div key={i} className={styles.teamCard}>
                            <div className={styles.teamAvatar}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem', color: '#2E7D32' }}>{t.icon}</span>
                            </div>
                            <h4 className={styles.teamRole}>{t.role}</h4>
                            <p className={styles.teamDesc}>{t.desc}</p>
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
                            <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#2E7D32' }}>school</span>
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