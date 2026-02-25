/**
 * ProgramForm Component
 * 
 * Form component để tạo mới hoặc chỉnh sửa chương trình đào tạo
 * 
 * Features:
 * - Dual mode: create (không có initialData) hoặc edit (có initialData)
 * - Validation: tên, thời gian, chỉ tiêu (> 0)
 * - Fields: name, description, image URL, duration, quota
 * - Auto redirect về /admin/programs sau khi save thành công
 * 
 * @component Client Component
 */

'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Program } from '../programs/schema';
import { createProgram, updateProgram } from '../programs/actions';

// Props interface
interface ProgramFormProps {
    initialData?: Program;  // Data để edit, undefined nếu create
    isEdit?: boolean;       // Flag để detect edit mode
}

export default function ProgramForm({ initialData, isEdit = false }: ProgramFormProps) {
    const router = useRouter();

    // State management
    const [formData, setFormData] = useState<Program>(initialData || {
        name: '',
        description: '',
        image: '',
        duration: '',
        quota: 0,
        tuition: '',
        scholarship: '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Handle input changes
     * Convert quota to number type
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quota' ? Number(value) : value,
        }));
    };

    /**
     * Validate form data
     * @returns Error message hoặc empty string nếu valid
     */
    const validate = () => {
        if (!formData.name) return 'Tên chương trình là bắt buộc';
        if (!formData.duration) return 'Thời gian đào tạo là bắt buộc';
        if (formData.quota <= 0) return 'Chỉ tiêu phải lớn hơn 0';
        if (!formData.tuition) return 'Học phí là bắt buộc';
        return '';
    };

    /**
     * Handle form submit
     * Call createProgram hoặc updateProgram tùy theo mode
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate trước khi submit
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Edit mode: call updateProgram
            if (isEdit && initialData?.id) {
                const result = await updateProgram(initialData.id, formData);
                if (!result.success) throw new Error(result.message);
            }
            // Create mode: call createProgram
            else {
                const result = await createProgram(formData);
                if (!result.success) throw new Error(result.message);
            }

            // Redirect về list page
            router.push('/admin/programs');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            {/* Error message display */}
            {error && <div className="form-error">{error}</div>}

            {/* Tên chương trình - required */}
            <div className="form-group">
                <label className="form-label">Tên chương trình</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="VD: Y sĩ đa khoa"
                    required
                />
            </div>

            {/* Grid 2 columns: Duration và Quota */}
            <div className="form-grid-2">
                <div className="form-group">
                    <label className="form-label">Thời gian đào tạo</label>
                    <input
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="VD: 2 năm"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Chỉ tiêu</label>
                    <input
                        type="number"
                        name="quota"
                        value={formData.quota}
                        onChange={handleChange}
                        className="form-input"
                        min="1"
                    />
                </div>
            </div>

            {/* Image URL field */}
            <div className="form-group">
                <label className="form-label">Hình ảnh (URL)</label>
                <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://..."
                />
            </div>

            {/* Description textarea */}
            <div className="form-group">
                <label className="form-label">Mô tả chi tiết</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                    rows={5}
                ></textarea>
            </div>

            {/* Thông tin học phí section */}
            <div style={{ margin: '2rem 0 1.5rem', borderTop: '2px solid #e0e0e0', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1B5E20', marginBottom: '1rem' }}>
                    💰 Thông tin học phí
                </h3>

                <div className="form-grid-2">
                    {/* Học phí - required */}
                    <div className="form-group">
                        <label className="form-label">Học phí</label>
                        <input
                            name="tuition"
                            value={formData.tuition}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="VD: 15.000.000 VNĐ/năm"
                            required
                        />
                    </div>

                    {/* Học bổng - optional */}
                    <div className="form-group">
                        <label className="form-label">Học bổng / Ưu đãi</label>
                        <input
                            name="scholarship"
                            value={formData.scholarship || ''}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="VD: Giảm 30% cho SV xuất sắc"
                        />
                    </div>
                </div>
            </div>

            {/* Form actions: Cancel và Submit */}
            <div className="form-actions">
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Hủy bỏ
                </button>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Đang lưu...' : (isEdit ? 'Cập nhật' : 'Thêm mới')}
                </button>
            </div>
        </form>
    );
}
