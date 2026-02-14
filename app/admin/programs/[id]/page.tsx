/**
 * Edit Program Page
 * 
 * Trang chỉnh sửa chương trình đào tạo hiện có
 * - Fetch program data dựa trên ID từ params
 * - Hiển thị ProgramForm với initialData để edit
 * - Return 404 nếu program không tồn tại
 * 
 * @page Server Component - Dynamic Route [id]
 */

import { notFound } from 'next/navigation';
import ProgramForm from '../../components/ProgramForm';
import { getProgramById } from '../actions';

// SEO metadata
export const metadata = {
    title: 'Chỉnh sửa chương trình đào tạo | MTPC Admin',
};

export default async function EditProgramPage({ params }: { params: { id: string } }) {
    // Fetch program data từ ID
    const program = await getProgramById(params.id);

    // Nếu không tìm thấy, show 404 page
    if (!program) {
        notFound();
    }

    return (
        <div className="page-container">
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Chỉnh sửa chương trình</h1>
            {/* ProgramForm với initialData và isEdit flag */}
            <ProgramForm initialData={program} isEdit={true} />
        </div>
    );
}
