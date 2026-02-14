/**
 * Create News Page
 * 
 * Trang tạo bài viết tin tức/sự kiện mới
 * - Hiển thị NewsForm component không có initialData
 * - Form sẽ handle việc create news item mới
 * 
 * @page Server Component
 */

import NewsForm from '../../components/NewsForm';

// SEO metadata
export const metadata = {
    title: 'Thêm tin tức | MTPC Admin',
};

export default function CreateNewsPage() {
    return (
        <div className="page-container">
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Thêm bài viết mới</h1>
            {/* NewsForm với mode create */}
            <NewsForm />
        </div>
    );
}
