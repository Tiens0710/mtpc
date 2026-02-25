/**
 * Admissions Overview Page
 * 
 * Trang tổng quan quản lý tuyển sinh
 * - Hiển thị 2 cards chính: Học phí và FAQ
 * - Mỗi card hiển thị số lượng items và link đến trang quản lý
 * - Sử dụng dashboard-grid layout giống dashboard chính
 * 
 * @page Server Component
 */

import Link from 'next/link';
import '../index/styles/index.css'; // Reuse dashboard styles

import { getFAQs } from './actions';

// SEO metadata
export const metadata = {
    title: 'Quản lý Tuyển sinh | MTPC Admin',
    description: 'Trang tổng quan quản lý tuyển sinh',
};

export default async function AdmissionsPage() {
    const faqs = await getFAQs();

    return (
        <div className="page-container">
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Quản lý Tuyển sinh</h1>

            {/* Dashboard grid với FAQ card */}
            <div className="dashboard-grid">
                {/* Card FAQ - link đến /admin/admissions/faqs */}
                <Link href="/admin/admissions/faqs" className="dashboard-card action-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card-icon-wrapper faq">
                        <span className="material-symbols-outlined">quiz</span>
                    </div>
                    <div className="card-info">
                        <h3 className="card-title">Hỏi đáp (FAQ)</h3>
                        <p className="card-stat">{faqs.length} <span className="stat-label">Câu hỏi</span></p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
