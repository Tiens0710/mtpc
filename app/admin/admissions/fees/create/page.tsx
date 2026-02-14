/**
 * Create Fee Page
 * 
 * Trang thêm học phí cho ngành mới
 * - Hiển thị FeeForm component
 * - Form wrap trong maxWidth container cho UX tốt hơn
 * 
 * @page Server Component
 */

import FeeForm from '../../../components/FeeForm';

// SEO metadata
export const metadata = {
    title: 'Thêm học phí | MTPC Admin',
};

export default function CreateFeePage() {
    return (
        <div className="page-container">
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Thêm học phí ngành mới</h1>
            {/* Form với maxWidth để không quá rộng */}
            <div style={{ maxWidth: '600px' }}>
                <FeeForm />
            </div>
        </div>
    );
}
