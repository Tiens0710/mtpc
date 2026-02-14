/**
 * FeeForm Component
 * 
 * Form component để thêm học phí cho ngành đào tạo mới
 * 
 * Features:
 * - Create-only mode (không support edit)
 * - Fields: major (ngành), tuition (học phí), scholarship (học bổng/ưu đãi - optional)
 * - Simple validation: major và tuition required
 * - Auto redirect về /admin/admissions/fees sau khi save
 * 
 * @component Client Component
 */

'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { FeeItem } from '../admissions/schema';
import { createFee } from '../admissions/actions';

export default function FeeForm() {
    const router = useRouter();

    // State management
    const [formData, setFormData] = useState<FeeItem>({
        major: '',
        tuition: '',
        scholarship: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Handle input changes
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * Handle form submit
     * Simple validation: major và tuition không empty
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.major || !formData.tuition) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        setIsSubmitting(true);
        try {
            await createFee(formData);
            // Redirect về fees list
            router.push('/admin/admissions/fees');
            router.refresh();
        } catch (error) {
            alert('Có lỗi xảy ra');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            {/* Tên ngành - required */}
            <div className="form-group">
                <label className="form-label">Tên ngành</label>
                <input
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="VD: Y sĩ đa khoa"
                    required
                />
            </div>

            {/* Học phí - required */}
            <div className="form-group">
                <label className="form-label">Học phí</label>
                <input
                    name="tuition"
                    value={formData.tuition}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="VD: 12.000.000đ/năm"
                    required
                />
            </div>

            {/* Học bổng/Ưu đãi - optional */}
            <div className="form-group">
                <label className="form-label">Học bổng / Ưu đãi</label>
                <input
                    name="scholarship"
                    value={formData.scholarship}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="VD: Giảm 30%..."
                />
            </div>

            {/* Form actions */}
            <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => router.back()}>Hủy</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>Lưu</button>
            </div>
        </form>
    );
}
