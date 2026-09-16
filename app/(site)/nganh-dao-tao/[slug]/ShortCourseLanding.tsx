import Image from 'next/image';
import Link from 'next/link';
import type { Program } from '@/lib/programs';
import type { ShortCourseLandingContent } from '@/lib/short-course-landings';
import { siteConfig } from '@/lib/site-config';
import styles from './short-course-landing.module.css';

type Props = {
  program: Program;
  content: ShortCourseLandingContent;
  relatedPrograms: Program[];
};

const process = ['Chọn khóa học', 'Nhận tư vấn', 'Tham gia học', 'Nhận chứng chỉ'];

export default function ShortCourseLanding({ program, content, relatedPrograms }: Props) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label="Đường dẫn trang">
            <Link href="/">Trang chủ</Link><span>/</span><Link href="/nganh-dao-tao">Ngành đào tạo</Link>
          </nav>
          <p className={styles.eyebrow}>Chương trình ngắn hạn</p>
          <h1>{program.name}</h1>
          <p className={styles.heroLead}>{content.heroLead}</p>
          <div className={styles.heroActions}>
            <Link href="/tuyen-sinh#dang-ky" className={styles.primaryButton}>Đăng ký tư vấn</Link>
            <Link href="#kham-pha" className={styles.secondaryButton}>Khám phá khóa học</Link>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <Image src={program.image} alt={`Thực hành ${program.name}`} fill priority sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
        <div className={styles.factRail}>
          <div><span>Thời gian</span><strong>{program.duration}</strong></div>
          <div><span>Hình thức</span><strong>Thực hành trọng tâm</strong></div>
          <div><span>Chứng nhận</span><strong>{program.certificate}</strong></div>
        </div>
      </section>

      <section className={styles.presenterSection} id="kham-pha">
        <div className={styles.presenterVisual}>
          <Image
            src="/images/short-courses/mtpc-program-presenter-placeholder.png"
            alt="Nhân vật minh họa tư vấn chương trình"
            width={640}
            height={960}
            sizes="(max-width: 767px) 68vw, 360px"
          />
          <span>Nhân vật minh họa</span>
        </div>
        <div className={styles.presenterCopy}>
          <p className={styles.eyebrow}>Học để làm được việc</p>
          <h2>Khóa học này có gì?</h2>
          <p className={styles.presenterLead}>{content.visualIntro}</p>
          <div className={styles.highlightGrid}>
            {program.highlights.map((item) => (
              <div key={item}><span className="material-symbols-outlined">check_circle</span><strong>{item}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.learningSection}>
        <div className={styles.learningImage}>
          <Image src={content.sectionImage} alt={content.sectionImageAlt} fill sizes="(max-width: 767px) 100vw, 58vw" />
        </div>
        <div className={styles.learningCopy}>
          <h2>Học gì trong khóa?</h2>
          <div className={styles.curriculumList}>
            {content.curriculum.map((item, index) => (
              <div key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3></div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.fitSection}>
        <div>
          <h2>Bạn phù hợp nếu...</h2>
          <div className={styles.audienceList}>
            {content.audiences.map((item) => <p key={item}><span className="material-symbols-outlined">check</span>{item}</p>)}
          </div>
        </div>
        <div className={styles.careerPanel}>
          <p>Sau khóa học</p>
          {program.careerPaths.map((career) => <h3 key={career}>{career}</h3>)}
        </div>
      </section>

      <section className={styles.processSection}>
        <h2>Bắt đầu thật đơn giản</h2>
        <ol>{process.map((item, index) => <li key={item}><span>{index + 1}</span><strong>{item}</strong></li>)}</ol>
      </section>

      <section className={styles.finalCta}>
        <div><p className={styles.eyebrow}>Tư vấn tuyển sinh</p><h2>Sẵn sàng tìm hiểu khóa học?</h2></div>
        <div className={styles.finalActions}>
          <Link href="/tuyen-sinh#dang-ky" className={styles.lightButton}>Đăng ký tư vấn</Link>
          <a href={siteConfig.contact.zaloOA.url} className={styles.zaloLink}>Zalo {siteConfig.contact.zaloOA.number}</a>
        </div>
      </section>

      <section className={styles.relatedSection}>
        <h2>Chương trình khác</h2>
        <div className={styles.relatedGrid}>
          {relatedPrograms.slice(0, 3).map((item) => (
            <Link href={`/nganh-dao-tao/${item.slug}`} key={item.slug}>
              <div><Image src={item.image} alt={item.name} fill sizes="(max-width: 767px) 100vw, 30vw" /></div>
              <span>{item.duration}</span><h3>{item.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
