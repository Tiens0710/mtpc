/**
 * Admin Dashboard Page
 * Route: /admin/index
 * 
 * Trang chính của admin panel sau khi đăng nhập thành công
 * Hiển thị welcome message và các card chức năng
 */

import Link from 'next/link';
import Image from 'next/image';
import './styles/index.css';

import VisitorChart from '../components/VisitorChart';

// Metadata cho SEO
export const metadata = {
    title: 'Admin Dashboard | MTPC',
    description: 'Trang quản trị chính',
};

export default function AdminDashboard() {
    return (
        <div className="dashboard-container">
            {/* Nội dung chính */}
            <main className="dashboard-main">
                {/* Phần Chào mừng */}
                <section className="welcome-section">
                    <h1 className="welcome-title">Chào mừng đến Admin Panel</h1>
                    <p className="welcome-subtitle">
                        Quản lý và theo dõi hệ thống của bạn từ dashboard này.
                        Các chức năng sẽ được bổ sung trong tương lai.
                    </p>
                </section>

                {/* Phần Biểu đồ thống kê truy cập */}
                <section className="chart-section" style={{ marginBottom: '2rem' }}>
                    <VisitorChart />
                </section>

                {/* Các thẻ Dashboard - Placeholder cho các chức năng tương lai */}
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="card-title">Quản lý người dùng</h3>
                        <p className="card-description">
                            <span className="placeholder-text">Chức năng đang phát triển</span>
                        </p>
                    </div>

                    <Link href="/admin/noi-dung" className="dashboard-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <path d="M3 9h18" />
                                <path d="M9 21V9" />
                            </svg>
                        </div>
                        <h3 className="card-title">Nội dung</h3>
                        <p className="card-description">
                            Quản lý bài viết và nội dung website
                        </p>
                    </Link>

                    <div className="dashboard-card">
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <h3 className="card-title">Báo cáo</h3>
                        <p className="card-description">
                            <span className="placeholder-text">Chức năng đang phát triển</span>
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                        </div>
                        <h3 className="card-title">Cài đặt</h3>
                        <p className="card-description">
                            <span className="placeholder-text">Chức năng đang phát triển</span>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
