/**
 * Create Program Page
 * 
 * Trang tạo chương trình đào tạo mới
 * - Hiển thị ProgramForm component không có initialData
 * - Form sẽ handle việc create program mới
 * 
 * @page Server Component
 */

import ProgramForm from '../../components/ProgramForm';

// SEO metadata
export const metadata = {
    title: 'Thêm chương trình đào tạo | MTPC Admin',
};

export default function CreateProgramPage() {
    return (
        <div className="page-container">
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Thêm chương trình mới</h1>
            {/* ProgramForm với mode create (không có initialData) */}
            <ProgramForm />
        </div>
    );
}
