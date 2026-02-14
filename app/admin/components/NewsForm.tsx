/**
 * NewsForm Component
 * 
 * Form component để tạo mới hoặc chỉnh sửa bài viết tin tức/sự kiện
 * 
 * Features:
 * - Dual mode: create hoặc edit
 * - Fields: title, description, content, image, category, featured checkbox
 * - Category select với options từ CATEGORIES constant
 * - Featured checkbox để đánh dấu tin nổi bật
 * - Validation cho title, description, category
 * 
 * @component Client Component
 */

'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { NewsItem, CATEGORIES } from '../news/schema';
import { createNews, updateNews } from '../news/actions';

// Props interface
interface NewsFormProps {
    initialData?: NewsItem;  // Data để edit
    isEdit?: boolean;        // Edit mode flag
}

export default function NewsForm({ initialData, isEdit = false }: NewsFormProps) {
    const router = useRouter();

    // State management
    const [formData, setFormData] = useState<NewsItem>(initialData || {
        title: '',
        description: '',
        content: '',
        image: '',
        category: 'thong-bao',  // Default category
        featured: false,
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Handle input/textarea/select changes
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * Handle checkbox changes (featured)
     */
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked,
        }));
    };

    /**
     * Validate form data
     * @returns Error message hoặc empty string
     */
    const validate = () => {
        if (!formData.title) return 'Tiêu đề là bắt buộc';
        if (!formData.description) return 'Mô tả ngắn là bắt buộc';
        if (!formData.category) return 'Vui lòng chọn danh mục';
        return '';
    };

    /**
     * Handle form submit
     * Create hoặc update news item
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Edit mode
            if (isEdit && initialData?.id) {
                const result = await updateNews(initialData.id, formData);
                if (!result.success) throw new Error(result.message);
            }
            // Create mode
            else {
                const result = await createNews(formData);
                if (!result.success) throw new Error(result.message);
            }

            // Redirect về list
            router.push('/admin/news');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form" style={{ maxWidth: '900px' }}>
            {/* Error message */}
            {error && <div className="form-error">{error}</div>}

            {/* Grid 2 columns: Title và Category */}
            <div className="form-grid-2">
                {/* Tiêu đề */}
                <div className="form-group">
                    <label className="form-label">Tiêu đề tin tức</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Nhập tiêu đề..."
                        required
                    />
                </div>

                {/* Category select */}
                <div className="form-group">
                    <label className="form-label">Danh mục</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-input"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Mô tả ngắn (Sapo) */}
            <div className="form-group">
                <label className="form-label">Mô tả ngắn (Sapo)</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                    rows={3}
                    placeholder="Mô tả ngắn gọn về nội dung..."
                    required
                ></textarea>
            </div>

            {/* Image URL */}
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

            {/* Nội dung chi tiết */}
            <div className="form-group">
                <label className="form-label">Nội dung chi tiết</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="form-textarea"
                    rows={10}
                    placeholder="Nội dung bài viết..."
                ></textarea>
            </div>

            {/* Featured checkbox */}
            <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                    <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleCheckboxChange}
                        style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontWeight: 500 }}>Tin nổi bật</span>
                </label>
            </div>

            {/* Form actions */}
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
