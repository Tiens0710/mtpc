/**
 * Edit News Page
 * 
 * Trang chỉnh sửa bài viết tin tức hiện có
 * - Fetch news data dựa trên ID từ params
 * - Hiển thị NewsForm với initialData để edit
 * - Return 404 nếu bài viết không tồn tại
 * 
 * @page Server Component - Dynamic Route [id]
 */

import { notFound } from 'next/navigation';
import NewsForm from '../../components/NewsForm';
import { getNewsById } from '../actions';

// SEO metadata
export const metadata = {
    title: 'Chỉnh sửa tin tức | MTPC Admin',
};

export default async function EditNewsPage({ params }: { params: { id: string } }) {
    // Fetch news item từ ID
    const newsItem = await getNewsById(params.id);

    // Nếu không tìm thấy, show 404 page
    if (!newsItem) {
        notFound();
    }

    return (
        <div className="page-container">
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Chỉnh sửa bài viết</h1>
            {/* NewsForm với initialData và isEdit flag */}
            <NewsForm initialData={newsItem} isEdit={true} />
        </div>
    );
}
