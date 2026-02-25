/**
 * Programs List Page
 * 
 * Trang hiển thị danh sách tất cả các chương trình đào tạo
 * Features:
 * - Hiển thị table với: hình ảnh, tên, thời gian, chỉ tiêu
 * - Button "Thêm mới" để tạo chương trình mới
 * - Action buttons: Edit và Delete cho mỗi chương trình
 * - Server Component - fetch data từ actions
 * 
 * @page Server Component
 */

import Link from 'next/link';
import Image from 'next/image';
import { getPrograms } from './actions';
import DeleteButton from './DeleteButton';

// SEO metadata cho page
export const metadata = {
    title: 'Quản lý Chương trình đào tạo | MTPC Admin',
};

export default async function ProgramsPage() {
    // Fetch danh sách programs từ server action
    const programs = await getPrograms();

    return (
        <div className="page-container">
            {/* Header với title và button thêm mới */}
            <div className="header-actions">
                <h1 className="page-title">Chương trình đào tạo</h1>
                <Link href="/admin/programs/create" className="btn-primary">
                    <span className="material-symbols-outlined">add</span>
                    Thêm mới
                </Link>
            </div>

            {/* Data table hiển thị programs */}
            <div className="card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên chương trình</th>
                            <th>Thời gian</th>
                            <th>Chỉ tiêu</th>
                            <th>Học phí</th>
                            <th>Học bổng</th>
                            <th style={{ width: '100px' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Empty state */}
                        {programs.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                                    Chưa có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            /* Render từng program */
                            programs.map((program) => (
                                <tr key={program.id}>
                                    {/* Cột hình ảnh - thumbnail */}
                                    <td>
                                        {program.image && (
                                            <div style={{ width: '50px', height: '35px', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                                                <Image
                                                    src={program.image}
                                                    alt={program.name}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    {/* Cột tên với description preview */}
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{program.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{program.description.substring(0, 50)}...</div>
                                    </td>
                                    {/* Cột thời gian đào tạo */}
                                    <td>{program.duration}</td>
                                    {/* Cột chỉ tiêu tuyển sinh */}
                                    <td>{program.quota}</td>
                                    {/* Cột học phí */}
                                    <td style={{ fontWeight: 600, color: '#1B5E20' }}>{program.tuition || 'Chưa cập nhật'}</td>
                                    {/* Cột học bổng */}
                                    <td style={{ fontSize: '0.85rem', color: '#666' }}>{program.scholarship || '—'}</td>
                                    {/* Cột action buttons */}
                                    <td>
                                        <div style={{ display: 'flex' }}>
                                            {/* Edit button */}
                                            <Link href={`/admin/programs/${program.id}`} className="action-btn edit" title="Chỉnh sửa">
                                                <span className="material-symbols-outlined icon-sm">edit</span>
                                            </Link>
                                            {/* Delete button with confirmation */}
                                            <DeleteButton id={program.id!} name={program.name} />
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
