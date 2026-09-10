import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cmeCourses } from '@/lib/cme';
import styles from '../cme.module.css';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cmeCourses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = cmeCourses.find((item) => item.slug === slug);
  return course ? { title: course.title, description: course.audience } : { title: 'Không tìm thấy lớp CME' };
}

export default async function CmeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = cmeCourses.find((item) => item.slug === slug);
  if (!course) notFound();

  return (
    <main className={styles.page}>
      <section className={styles.detailHero}>
        <div className={styles.detailImageWrap}><Image src={course.image} alt={course.title} fill priority className={styles.detailImage} sizes="(max-width: 720px) 100vw, 45vw" /></div>
        <div className={styles.detailIntro}><span className={styles.eyebrowDark}>Thông tin lớp CME</span><h1>{course.title}</h1><p>{course.audience}</p><span className={course.status === 'Đang mở đăng ký' ? styles.statusOpen : styles.statusSoon}>{course.status}</span><Link href={`/tuyen-sinh/dang-ky?course=${course.slug}`} className={styles.primaryButton}>Đăng ký tham dự →</Link></div>
      </section>
      <section className={`${styles.section} ${styles.panelSection}`}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrowDark}>Thông tin chương trình</span><h2>Nội dung lớp học</h2></div></div>
        <div className={styles.detailInfoGrid}>{[['Khai giảng', course.startDate], ['Hạn đăng ký', course.registrationDate], ['Hình thức', course.format], ['Thời lượng', course.duration], ['Học phí', course.tuition], ['Chứng nhận', course.certificate], ['Giảng viên', course.instructor], ['Đối tượng', course.audience]].map(([label, value]) => <div className={styles.detailInfo} key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        <div className={styles.detailNote}><h3>Lưu ý dành cho học viên</h3><p>Vui lòng kiểm tra email và số điện thoại sau khi đăng ký để nhận hướng dẫn tham dự. Lịch học và hình thức tổ chức có thể được cập nhật theo thông báo chính thức của Trung tâm.</p></div>
        <Link href="/cme" className={styles.backLink}>← Quay lại lịch học CME</Link>
      </section>
    </main>
  );
}
