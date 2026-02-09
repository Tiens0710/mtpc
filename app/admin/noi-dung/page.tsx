/**
 * Content Management Page
 * Route: /admin/noi-dung
 */

import Link from 'next/link';
import Image from 'next/image';
import './style.css';

export const metadata = {
    title: 'Quản lý nội dung | Admin MTPC',
    description: 'Danh sách bài viết và nội dung website',
};

// Mock Data
const MOCK_POSTS = [
    {
        id: 1,
        title: 'Giới thiệu về MTPC: Sứ mệnh và Tầm nhìn',
        author: 'Admin',
        date: '09/02/2026',
        status: 'Published',
        views: 1250,
        thumbnail: '/images/post-1.jpg' // Placeholder
    },
    {
        id: 2,
        title: 'Khóa học Frontend Master sắp ra mắt',
        author: 'Nguyen Van A',
        date: '08/02/2026',
        status: 'Draft',
        views: 0,
        thumbnail: '/images/post-2.jpg'
    },
    {
        id: 3,
        title: 'Tổng kết hoạt động năm 2025',
        author: 'Admin',
        date: '01/01/2026',
        status: 'Published',
        views: 5430,
        thumbnail: '/images/post-3.jpg'
    },
    {
        id: 4,
        title: 'Hướng dẫn đăng ký tài khoản học viên',
        author: 'Support Team',
        date: '15/12/2025',
        status: 'Published',
        views: 890,
        thumbnail: '/images/post-4.jpg'
    }
];

export default function ContentManagementPage() {
    return (
        <div className="content-page-container">
            {/* Nút quay lại */}
            <Link href="/admin/index" className="btn-back">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Quay lại Dashboard
            </Link>

            {/* Header */}
            <div className="content-header">
                <div>
                    <h1 className="page-title">Quản lý nội dung</h1>
                    <p className="page-subtitle">Quản lý bài viết, tin tức và trang tĩnh</p>
                </div>
                <Link href="/admin/noi-dung/tao-bai-viet" className="btn-create">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Tạo bài viết mới
                </Link>
            </div>

            {/* Content Table / List */}
            <div className="content-list-card">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Bài viết</th>
                            <th>Tác giả</th>
                            <th>Ngày đăng</th>
                            <th>Trạng thái</th>
                            <th>Lượt xem</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_POSTS.map((post) => (
                            <tr key={post.id}>
                                <td className="col-title">
                                    <div className="post-info">
                                        <div className="post-thumbnail-placeholder">
                                            {/* In real app, use Image component with actual src */}
                                            <span>IMG</span>
                                        </div>
                                        <span className="post-title-text">{post.title}</span>
                                    </div>
                                </td>
                                <td>{post.author}</td>
                                <td>{post.date}</td>
                                <td>
                                    <span className={`status-badge ${post.status.toLowerCase()}`}>
                                        {post.status === 'Published' ? 'Đã đăng' : 'Bản nháp'}
                                    </span>
                                </td>
                                <td>{post.views.toLocaleString()}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-action btn-edit" title="Chỉnh sửa">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                        <button className="btn-action btn-delete" title="Xóa">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
