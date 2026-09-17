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
  const highlights = program.highlights.slice(0, 3);
  const curriculum = content.curriculum.slice(0, 4);
  const careers = program.careerPaths.slice(0, 2);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src={program.image}
            alt={`Thực hành ${program.name}`}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 1240px"
          />
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Đào tạo ngắn hạn</p>
          <h1>{program.name}</h1>
          <p className={styles.heroLead}>{content.heroLead}</p>
          <div className={styles.heroActions}>
            <Link href="/tuyen-sinh#dang-ky" className={styles.primaryButton}>Đăng ký ngay</Link>
            <Link href="#kham-pha" className={styles.secondaryButton}>Xem nội dung</Link>
          </div>
        </div>
        <div className={styles.factRail}>
          <div><span>Thời gian</span><strong>{program.duration}</strong></div>
          <div><span>Hình thức</span><strong>Thực hành trọng tâm</strong></div>
          <div><span>Chứng nhận</span><strong>Chứng chỉ khóa học</strong></div>
        </div>
      </section>

      <section className={styles.industrySection}>
        <div className={styles.industryIntro}>
          <div>
            <p className={styles.eyebrow}>Ngành này là gì?</p>
            <h2>{content.industryTitle}</h2>
          </div>
          <p>{content.industryIntro}</p>
        </div>
        <div className={styles.outcomeGrid}>
          {content.outcomes.map((item, index) => (
            <article key={item.title} className={styles.outcomeItem}>
              <div className={styles.outcomeMeta}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.workplaceBar}>
          <span>Không gian làm việc</span>
          <div>{content.workplaces.map((place) => <strong key={place}>{place}</strong>)}</div>
        </div>
      </section>

      <section className={styles.introSection} id="kham-pha">
        <div className={styles.introVisual}>
          <Image
            src={program.image}
            alt={`Không gian đào tạo ${program.name}`}
            fill
            className={styles.introImage}
            sizes="(max-width: 767px) 100vw, 42vw"
          />
        </div>
        <div className={styles.introCopy}>
          <p className={styles.eyebrow}>Học để làm được việc</p>
          <h2>Học đúng việc, làm đúng nghề</h2>
          <p className={styles.sectionLead}>{content.visualIntro}</p>
          <div className={styles.highlightList}>
            {highlights.map((item) => (
              <div key={item}>
                <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.practiceSection}>
        <div className={styles.practiceVisual}>
          <Image src={content.sectionImage} alt={content.sectionImageAlt} fill sizes="(max-width: 767px) 100vw, 58vw" />
          <span>Không gian thực hành</span>
        </div>
        <div className={styles.practiceCopy}>
          <p className={styles.eyebrow}>Nội dung cốt lõi</p>
          <h2>Học gì trong khóa?</h2>
          <div className={styles.curriculumList}>
            {curriculum.map((item, index) => (
              <div key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.fitSection}>
        <div className={styles.fitCopy}>
          <p className={styles.eyebrow}>Chọn lộ trình phù hợp</p>
          <h2>Bạn phù hợp nếu...</h2>
          <div className={styles.audienceList}>
            {content.audiences.map((item) => <p key={item}><span className="material-symbols-outlined" aria-hidden="true">check</span>{item}</p>)}
          </div>
        </div>
        <div className={styles.careerPanel}>
          <p>Sau khóa học</p>
          {careers.map((career) => <h3 key={career}>{career}</h3>)}
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.processHeading}>
          <p className={styles.eyebrow}>Quy trình đăng ký</p>
          <h2>Bắt đầu thật đơn giản</h2>
        </div>
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
        <div className={styles.relatedHeading}>
          <p className={styles.eyebrow}>Khám phá thêm</p>
          <h2>Chương trình khác</h2>
        </div>
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
