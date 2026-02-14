/**
 * FAQs List Page
 * 
 * Trang quản lý câu hỏi thường gặp (FAQ) về tuyển sinh
 * Features:
 * - Table hiển thị: câu hỏi và câu trả lời
 * - Button thêm FAQ mới
 * - Delete button với confirmation
 * - Client Component để handle state và delete
 * 
 * @page Client Component
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFAQs, deleteFAQ } from '../actions';
import { FAQItem } from '../schema';

export default function FAQsPage() {
    // State management
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Load data on mount
    useEffect(() => {
        loadData();
    }, []);

    /**
     * Fetch danh sách FAQs từ server action
     */
    const loadData = async () => {
        const data = await getFAQs();
        setFaqs(data);
        setLoading(false);
    };

    /**
     * Handle delete FAQ với confirmation
     * Reload data sau khi xóa thành công
     */
    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
        try {
            await deleteFAQ(id);
            loadData(); // Reload list
        } catch (error) {
            alert('Lỗi xóa');
        }
    };

    return (
        <div className="page-container">
            {/* Header với button thêm câu hỏi */}
            <div className="header-actions">
                <h1 className="page-title">Câu hỏi thường gặp (FAQ)</h1>
                <Link href="/admin/admissions/faqs/create" className="btn-primary">
                    <span className="material-symbols-outlined">add</span>
                    Thêm câu hỏi
                </Link>
            </div>

            {/* Data table */}
            <div className="card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Câu hỏi</th>
                            <th>Câu trả lời</th>
                            <th style={{ width: '80px' }}>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loading state */}
                        {loading ? (
                            <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</td></tr>
                        ) : faqs.length === 0 ? (
                            /* Empty state */
                            <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>Chưa có dữ liệu</td></tr>
                        ) : (
                            /* Render từng FAQ item */
                            faqs.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 600 }}>{item.question}</td>
                                    <td>{item.answer}</td>
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
