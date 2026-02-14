/**
 * Create FAQ Page
 * 
 * Trang thêm câu hỏi thường gặp mới
 * - Hiển thị FAQForm component
 * - Form wrap trong maxWidth container
 * 
 * @page Server Component
 */

import FAQForm from '../../../components/FAQForm';

// SEO metadata
export const metadata = {
    title: 'Thêm FAQ | MTPC Admin',
};

export default function CreateFAQPage() {
    return (
        <div className="page-container">
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Thêm câu hỏi thường gặp</h1>
            {/* Form với maxWidth */}
            <div style={{ maxWidth: '600px' }}>
                <FAQForm />
            </div>
        </div>
    );
}
