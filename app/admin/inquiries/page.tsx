/**
 * Inquiries List Page
 * 
 * Trang hiển thị danh sách các inquiry/đăng ký xét tuyển từ form tuyển sinh
 * Features:
 * - Table hiển thị: tên, sđt, ngành đăng ký, ngày và trạng thái
 * - Status badge với màu khác nhau (Mới - green, Đã liên hệ đ blue)
 * - Read-only table (chỉ view, không có edit/delete)
 * 
 * @page Server Component
 */

import { getInquiries } from '../admissions/actions';

// SEO metadata
export const metadata = {
    title: 'Danh sách xét tuyển | MTPC Admin',
};

export default async function InquiriesPage() {
    // Fetch danh sách inquiries
    const inquiries = await getInquiries();

    /**
     * Helper function render status label với màu phù hợp
     * @param status - Status string ('new' | 'contacted')
     * @returns JSX element với styled span
     */
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'new':
                return <span style={{ color: '#2e7d32', background: '#e8f5e9', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Mới</span>;
            case 'contacted':
                return <span style={{ color: '#1565c0', background: '#e3f2fd', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Đã liên hệ</span>;
            default:
                return status;
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Danh sách đăng ký xét tuyển</h1>

            {/* Data table - read-only */}
            <div className="card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Ngành đăng ký</th>
                            <th>Ngày đăng ký</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Empty state */}
                        {inquiries.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                                    Chưa có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            /* Render từng inquiry */
                            inquiries.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.major}</td>
                                    <td>{item.date}</td>
                                    {/* Status với colored badge */}
                                    <td>{getStatusLabel(item.status)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
