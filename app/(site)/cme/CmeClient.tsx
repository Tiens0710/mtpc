'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { cmeCourses, cmeFaqs, cmeInstructors } from '@/lib/cme';
import styles from './cme.module.css';

const faqColumns = [
  cmeFaqs.map((faq, index) => ({ faq, index })).filter(({ index }) => index % 2 === 0),
  cmeFaqs.map((faq, index) => ({ faq, index })).filter(({ index }) => index % 2 === 1),
];

const getDateSummary = (value: string) => value.split('–').at(-1)?.trim() ?? value;

export default function CmeClient() {
  const [month, setMonth] = useState('all');
  const [format, setFormat] = useState('all');
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return cmeCourses.filter((course) => {
      const matchesMonth = month === 'all' || course.month === month;
      const matchesFormat = format === 'all' || course.format.toLowerCase().includes(format);
      const matchesQuery = !normalizedQuery || [course.title, course.instructor, course.audience].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesMonth && matchesFormat && matchesQuery;
    });
  }, [format, month, query]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image src="/tintucvasukien.jpg" alt="Lớp học cập nhật kiến thức CME" fill priority className={styles.heroImage} sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Đào tạo y khoa liên tục</span>
          <h1>Thông tin tuyển sinh CME</h1>
          <p>Lịch học các lớp CME sắp khai giảng và lựa chọn chủ đề phù hợp với nhu cầu cập nhật kiến thức chuyên môn.</p>
          <Link href="#lich-hoc" className={styles.heroButton}>Xem lịch học <span aria-hidden="true">↓</span></Link>
        </div>
      </section>

      <section className={styles.section} id="lich-hoc">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrowDark}>Đào tạo y khoa liên tục</span>
            <h2>Lịch học và thông báo chiêu sinh CME</h2>
            <p>Tìm kiếm lớp học phù hợp với nhu cầu cập nhật kiến thức chuyên môn.</p>
          </div>
          <span className={styles.courseCount}>{filteredCourses.length} lớp học</span>
        </div>

        <div className={styles.filters} aria-label="Bộ lọc khóa học CME">
          <label>Tháng<select value={month} onChange={(event) => setMonth(event.target.value)}><option value="all">Tất cả các tháng</option><option value="09">Tháng 09/2026</option><option value="10">Tháng 10/2026</option></select></label>
          <label>Hình thức<select value={format} onChange={(event) => setFormat(event.target.value)}><option value="all">Tất cả hình thức</option><option value="trực tuyến">Trực tuyến</option></select></label>
          <label className={styles.searchField}>Tìm kiếm<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tên khóa học hoặc giảng viên" /></label>
          <button type="button" className={styles.searchButton} onClick={() => setQuery(query.trim())}>Tìm kiếm</button>
        </div>

        {filteredCourses.length > 0 ? (
          <div className={styles.courseGrid}>
            {filteredCourses.map((course) => (
              <article className={styles.courseCard} key={course.slug}>
                <div className={styles.courseImageWrap}>
                  <Image src={course.image} alt={course.title} fill className={styles.courseImage} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                  <span className={course.status === 'Đang mở đăng ký' ? styles.statusOpen : styles.statusSoon}>{course.status}</span>
                </div>
                <div className={styles.courseBody}>
                  <h3><Link href={`/cme/${course.slug}`}>{course.title}</Link></h3>
                  <div className={styles.instructorSummary}>
                    <span aria-hidden="true">GV</span>
                    <div><small>Giảng viên</small><strong>{course.instructor}</strong></div>
                  </div>
                  <div className={styles.courseMeta}>
                    <div className={styles.metaWide}><small>Ngày học</small><strong>{getDateSummary(course.startDate)}</strong></div>
                    <div><small>Hình thức</small><strong>{course.format.split(' – ')[0]}</strong></div>
                    <div><small>Thời lượng</small><strong>{course.duration}</strong></div>
                  </div>
                  <div className={styles.coursePrice}>
                    <div><small>Học phí</small><strong>{course.tuition}</strong></div>
                    <div><small>Đăng ký trước</small><strong>{getDateSummary(course.registrationDate)}</strong></div>
                  </div>
                  <div className={styles.cardActions}><Link href={`/cme/${course.slug}`} className={styles.outlineButton}>Xem chi tiết</Link><Link href={`/tuyen-sinh/dang-ky?course=${course.slug}`} className={styles.primaryButton}>Đăng ký →</Link></div>
                </div>
              </article>
            ))}
          </div>
        ) : <div className={styles.emptyState}>Không tìm thấy lớp CME phù hợp. Bạn hãy thử thay đổi bộ lọc hoặc liên hệ Trung tâm để được tư vấn.</div>}
      </section>

      <section className={`${styles.section} ${styles.panelSection}`}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrowDark}>Đội ngũ chuyên môn</span><h2>Giảng viên – Báo cáo viên</h2></div></div>
        <div className={styles.instructorGrid}>{cmeInstructors.map((instructor) => <div className={styles.instructorCard} key={instructor.name}><span className={styles.initials}>{instructor.initials}</span><div><h3>{instructor.name}</h3><p>{instructor.role}</p></div></div>)}</div>
      </section>

      <section className={`${styles.section} ${styles.panelSection}`}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrowDark}>Thực hiện đăng ký</span><h2>Quy trình đăng ký tham dự</h2></div></div>
        <div className={styles.steps}>{[['01', 'Chọn khóa học', 'Xem thông tin lớp và lựa chọn chủ đề phù hợp.'], ['02', 'Đăng ký trực tuyến', 'Điền thông tin theo biểu mẫu đăng ký của lớp.'], ['03', 'Hoàn thành học phí', 'Thực hiện theo hướng dẫn trong thông báo chiêu sinh.'], ['04', 'Tham dự và nhận chứng nhận', 'Hoàn thành yêu cầu của lớp và nhận giấy chứng nhận CME.']].map(([number, title, description]) => <div className={styles.step} key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
      </section>

      <section className={`${styles.section} ${styles.panelSection}`}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrowDark}>Hỗ trợ người học</span><h2>Câu hỏi thường gặp</h2></div></div>
        <div className={styles.faqGrid}>{faqColumns.map((column, columnIndex) => <div className={styles.faqColumn} key={columnIndex}>{column.map(({ faq, index }) => <div className={styles.faqItem} key={faq.question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{faq.question}</span><span aria-hidden="true">{openFaq === index ? '−' : '+'}</span></button>{openFaq === index && <p>{faq.answer}</p>}</div>)}</div>)}</div>
      </section>

      <section className={styles.contactCta}>
        <div className={styles.contactIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M8.5 10.5a3.5 3.5 0 0 1 7 0v1.75a2 2 0 0 1-2 2h-.75v-4h2.75M8.5 10.5v3.75H7.25a2 2 0 0 1-2-2V10.5a6.75 6.75 0 0 1 13.5 0v4.25A4.25 4.25 0 0 1 14.5 19h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className={styles.contactCopy}>
          <span className={styles.eyebrowDark}>Đội ngũ tư vấn CME</span>
          <h2>Bạn cần hỗ trợ chọn lớp học?</h2>
          <p>Chúng tôi sẵn sàng tư vấn lịch học, thủ tục đăng ký và chứng nhận phù hợp với nhu cầu của bạn.</p>
        </div>
        <div className={styles.contactActions}>
          <a className={styles.phoneButton} href="tel:0934790790">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M7.2 3.5 9.7 8l-1.8 1.8a14 14 0 0 0 6.3 6.3l1.8-1.8 4.5 2.5v2.1c0 .9-.7 1.6-1.6 1.6A15.4 15.4 0 0 1 3.5 5.1c0-.9.7-1.6 1.6-1.6h2.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span><small>Hotline tư vấn</small><strong>0934 790 790</strong></span>
          </a>
          <Link className={styles.contactLink} href="/lien-he">Gửi yêu cầu tư vấn <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
