/**
 * Fees List Page
 * 
 * Trang quản lý học phí cho các ngành đào tạo
 * Features:
 * - Table hiển thị: ngành học, học phí, học bổng/ưu đãi
 * - Button thêm học phí mới
 * - Delete button cho mỗi fee item với confirmation
 * - Client Component để handle state và delete action
 * 
 * @page Client Component
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFees, deleteFee } from '../actions';
import { FeeItem } from '../schema';

export default function FeesPage() {
    // State management
    const [fees, setFees] = useState<FeeItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Load data on mount
    useEffect(() => {
        loadData();
    }, []);

    /**
     * Fetch danh sách fees từ server action
     */
    const loadData = async () => {
        const data = await getFees();
        setFees(data);
        setLoading(false);
    };

    /**
     * Handle delete fee với confirmation
     * Reload data sau khi xóa thành công
     */
    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
        try {
            await deleteFee(id);
            loadData(); // Reload list sau khi xóa
        } catch (error) {
            alert('Lỗi xóa');
        }
    };

    return (
        <div className="page-container">
            {/* Header với button thêm mới */}
            <div className="header-actions">
                <h1 className="page-title">Quản lý Học phí</h1>
                <Link href="/admin/admissions/fees/create" className="btn-primary">
                    <span className="material-symbols-outlined">add</span>
                    Thêm mới
                </Link>
            </div>

            {/* Data table */}
            <div className="card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Ngành học</th>
                            <th>Học phí</th>
                            <th>Học bổng / Ưu đãi</th>
                            <th style={{ width: '80px' }}>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loading state */}
                        {loading ? (
                            <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</td></tr>
                        ) : fees.length === 0 ? (
                            /* Empty state */
                            <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>Chưa có dữ liệu</td></tr>
                        ) : (
                            /* Render từng fee item */
                            fees.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 600 }}>{item.major}</td>
                                    <td>{item.tuition}</td>
                                    <td>{item.scholarship || '-'}</td>
                                    <td>
                                        {/* Delete button */}
                                        <button onClick={() => handleDelete(item.id!)} className="action-btn delete">
                                            <span className="material-symbols-outlined icon-sm">delete</span>
                                        </button>
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
