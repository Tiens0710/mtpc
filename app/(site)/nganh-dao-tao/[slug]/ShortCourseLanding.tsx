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

const process = [
  ['Chọn chương trình', 'Xem nội dung và xác định mục tiêu nghề nghiệp của bạn.'],
  ['Nhận tư vấn', 'Trao đổi lịch học, điều kiện tham dự và học phí hiện hành.'],
  ['Học và thực hành', 'Rèn kỹ năng theo hướng dẫn trong môi trường đào tạo.'],
  ['Hoàn thành khóa học', 'Đáp ứng yêu cầu để nhận chứng chỉ theo chương trình.'],
];

export default function ShortCourseLanding({ program, content, relatedPrograms }: Props) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Đường dẫn trang">
              <Link href="/">Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <Link href="/nganh-dao-tao">Ngành đào tạo</Link>
            </nav>
            <p className={styles.eyebrow}>Chương trình đào tạo ngắn hạn</p>
            <h1>{program.name}</h1>
            <p className={styles.heroLead}>{content.heroLead}</p>
            <div className={styles.heroActions}>
              <Link href="/tuyen-sinh#dang-ky" className={styles.primaryButton}>Đăng ký tư vấn</Link>
              <Link href="#noi-dung" className={styles.secondaryButton}>Xem nội dung học</Link>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <Image
              src={program.image}
              alt={`Học viên thực hành chương trình ${program.name}`}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 48vw"
              className={styles.heroImage}
            />
          </div>
        </div>
        <div className={styles.factRail} aria-label="Thông tin nhanh về chương trình">
          <div><span>Thời gian học</span><strong>{program.duration}</strong></div>
          <div><span>Hình thức</span><strong>Học kết hợp thực hành</strong></div>
          <div><span>Chứng nhận</span><strong>{program.certificate}</strong></div>
          <div><span>Mã chương trình</span><strong>{program.code}</strong></div>
        </div>
      </section>

      <section className={styles.promiseSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Học để làm được việc</p>
          <h2>Đi từ kỹ năng nền tảng đến quy trình thực tế</h2>
          <p>{content.promise}</p>
        </div>
        <div className={styles.outcomeList}>
          {program.highlights.map((item, index) => (
            <article key={item} className={styles.outcomeItem}>
              <span className={styles.outcomeNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.curriculumSection} id="noi-dung">
        <div className={styles.sectionIntro}>
          <h2>Nội dung học tập trung vào thực hành</h2>
          <p>Mỗi nhóm kiến thức gắn với một công việc cụ thể mà học viên cần thực hiện.</p>
        </div>
        <div className={styles.curriculumGrid}>
          {content.curriculum.map((item, index) => (
            <article key={item.title} className={styles.curriculumItem}>
              <span className="material-symbols-outlined" aria-hidden="true">
                {['menu_book', 'clinical_notes', 'health_and_safety', 'forum', 'task_alt'][index]}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div className={styles.audienceLead}>
          <span className="material-symbols-outlined" aria-hidden="true">groups</span>
          <h2>Chương trình phù hợp với ai?</h2>
          <p>{content.supportNote}</p>
        </div>
        <div className={styles.audienceList}>
          {content.audiences.map((item) => (
            <div key={item}>
              <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.careerSection}>
        <div className={styles.careerHeading}>
          <h2>Hướng công việc sau khóa học</h2>
          <p>Kết quả phụ thuộc năng lực cá nhân, yêu cầu tuyển dụng và quy định của từng vị trí.</p>
        </div>
        <div className={styles.careerList}>
          {program.careerPaths.map((career) => (
            <div key={career}>
              <span className="material-symbols-outlined" aria-hidden="true">arrow_outward</span>
              <h3>{career}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.sectionIntro}>
          <h2>Từ đăng ký đến hoàn thành</h2>
          <p>Một lộ trình rõ ràng để bạn chủ động chuẩn bị trước khi bắt đầu.</p>
        </div>
        <ol className={styles.processList}>
          {process.map(([title, description], index) => (
            <li key={title}>
              <span>{index + 1}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.finalCta}>
        <div>
          <p className={styles.eyebrow}>Tư vấn tuyển sinh</p>
          <h2>Bạn muốn biết lịch học và học phí?</h2>
          <p>Để lại thông tin hoặc nhắn Zalo để được tư vấn chương trình phù hợp.</p>
        </div>
        <div className={styles.finalActions}>
          <Link href="/tuyen-sinh#dang-ky" className={styles.lightButton}>Đăng ký tư vấn</Link>
          <a href={siteConfig.contact.zaloOA.url} className={styles.zaloLink}>Zalo {siteConfig.contact.zaloOA.number}</a>
        </div>
      </section>

      <section className={styles.relatedSection}>
        <h2>Khám phá chương trình khác</h2>
        <div className={styles.relatedGrid}>
          {relatedPrograms.slice(0, 3).map((item) => (
            <Link href={`/nganh-dao-tao/${item.slug}`} key={item.slug}>
              <span>{item.duration}</span>
              <h3>{item.name}</h3>
              <p>Xem chương trình</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
