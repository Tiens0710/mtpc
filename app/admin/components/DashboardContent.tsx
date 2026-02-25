'use client';

import Link from 'next/link';
import VisitorChart from './VisitorChart';

/**
 * Component hiển thị nội dung chính của Admin Dashboard
 * Bao gồm lời chào, biểu đồ thống kê và các phím tắt chức năng
 */
interface DashboardContentProps {
    programsCount: number;
    newsCount: number;
    faqsCount: number;
    inquiriesCount: number;
}

export default function DashboardContent({ programsCount, newsCount, faqsCount, inquiriesCount }: DashboardContentProps) {
    return (
        <div className="dashboard-container">
            {/* Nội dung chính */}
            <main className="dashboard-main">
                {/* Phần Chào mừng */}
                <section className="welcome-section">
                    <h1 className="welcome-title">Chào mừng đến Admin Panel</h1>
                    <p className="welcome-subtitle">
                        Quản lý và theo dõi hệ thống của bạn từ dashboard này.
                    </p>
                </section>

                {/* Phần Biểu đồ thống kê truy cập */}
                <section className="chart-section" style={{ marginBottom: '2rem' }}>
                    <VisitorChart />
                </section>

                {/* Các thẻ Dashboard */}
                <div className="dashboard-grid">
                    {/* Chương trình đào tạo */}
                    <Link href="/admin/programs" className="dashboard-card action-card">
                        <div className="card-icon-wrapper program">
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div className="card-info">
                            <h3 className="card-title">Chương trình đào tạo</h3>
                            <p className="card-stat">{programsCount} <span className="stat-label">Chương trình</span></p>
                        </div>
                    </Link>

                    {/* Tin tức & Sự kiện */}
                    <Link href="/admin/news" className="dashboard-card action-card">
                        <div className="card-icon-wrapper news">
                            <span className="material-symbols-outlined">newspaper</span>
                        </div>
                        <div className="card-info">
                            <h3 className="card-title">Tin tức & Sự kiện</h3>
                            <p className="card-stat">{newsCount} <span className="stat-label">Bài viết</span></p>
                        </div>
                    </Link>

                    {/* Tuyển sinh - Gộp FAQ và Inquiries */}
                    <Link href="/admin/admissions" className="dashboard-card action-card">
                        <div className="card-icon-wrapper admission">
                            <span className="material-symbols-outlined">how_to_reg</span>
                        </div>
                        <div className="card-info">
                            <h3 className="card-title">Tuyển sinh</h3>
                            <p className="card-stat">{faqsCount + inquiriesCount} <span className="stat-label">Mục</span></p>
                        </div>
                    </Link>

                </div>
            </main>
        </div>
    );
}
