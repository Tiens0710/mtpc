/**
 * News List Page
 * 
 * Trang hiển thị danh sách tất cả các bài viết tin tức & sự kiện
 * Features:
 * - Table với: thumbnail, tiêu đề, danh mục, ngày đăng, trạng thái featured
 * - Button "Thêm bài viết" để tạo tin tức mới
 * - Category label với màu sắc
 * - Star icon cho featured posts
 * - Action buttons: Edit và Delete
 * 
 * @page Server Component
 */

import Link from 'next/link';
import Image from 'next/image';
import { getNews } from './actions';
import { CATEGORIES } from './schema';
import DeleteNewsButton from './DeleteNewsButton';

// SEO metadata
export const metadata = {
    title: 'Quản lý Tin tức | MTPC Admin',
};

export default async function NewsPage() {
    // Fetch danh sách tin tức
    const newsList = await getNews();

    /**
     * Helper function lấy tên danh mục từ ID
     * @param catId - Category ID từ news item
     * @returns Category label hoặc catId nếu không tìm thấy
     */
    const getCategoryLabel = (catId: string) => {
        return CATEGORIES.find(c => c.id === catId)?.label || catId;
    };

    return (
        <div className="page-container">
            {/* Header với title và button thêm mới */}
            <div className="header-actions">
                <h1 className="page-title">Tin tức & Sự kiện</h1>
                <Link href="/admin/news/create" className="btn-primary">
                    <span className="material-symbols-outlined">add</span>
                    Thêm bài viết
                </Link>
            </div>

            {/* Data table */}
            <div className="card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Hình ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Danh mục</th>
                            <th>Ngày đăng</th>
                            <th>Trạng thái</th>
                            <th style={{ width: '100px' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Empty state */}
                        {newsList.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                                    Chưa có bài viết nào
                                </td>
                            </tr>
                        ) : (
                            /* Render từng news item */
                            newsList.map((item) => (
                                <tr key={item.id}>
                                    {/* Thumbnail image */}
                                    <td>
                                        {item.image && (
                                            <div style={{ width: '60px', height: '40px', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    {/* Title với description preview */}
                                    <td>
                                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{item.description.substring(0, 60)}...</div>
                                    </td>
                                    {/* Category badge với màu */}
                                    <td>
                                        <span style={{
                                            background: '#e3f2fd',
                                            color: '#1565c0',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '12px',
                                            fontSize: '0.8rem',
                                            fontWeight: 500
                                        }}>
                                            {getCategoryLabel(item.category)}
                                        </span>
                                    </td>
                                    {/* Ngày đăng */}
                                    <td>{item.date}</td>
                                    {/* Featured status - hiển thị star nếu featured */}
                                    <td>
                                        {item.featured && (
                                            <span style={{ color: '#f57f17', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>star</span>
                                                Nổi bật
                                            </span>
                                        )}
                                    </td>
                                    {/* Action buttons */}
                                    <td>
                                        <div style={{ display: 'flex' }}>
                                            <Link href={`/admin/news/${item.id}`} className="action-btn edit" title="Chỉnh sửa">
                                                <span className="material-symbols-outlined icon-sm">edit</span>
                                            </Link>
                                            <DeleteNewsButton id={item.id!} title={item.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
