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
import dynamic from 'next/dynamic';
import { NewsItem, CATEGORIES } from '../news/schema';
import { createNews, updateNews } from '../news/api';
import { uploadBase64Images } from '../utils/uploadBase64Images';

// Tải CKEditor qua dynamic import để tránh lỗi SSR (editor chỉ chạy trên client)
const CKEditorComponentCDN = dynamic(
    () => import('./CKEditorComponentCDN'),
    {
        ssr: false,
        loading: () => (
            <div style={{ border: '1px solid #d4d4d4', borderRadius: '4px', padding: '1rem', minHeight: '300px', color: '#888' }}>
                Đang tải trình soạn thảo...
            </div>
        ),
    }
);

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
    // Trạng thái kéo thả ảnh bìa
    const [isDragOver, setIsDragOver] = useState(false);
    // Trạng thái đang upload ảnh bìa khi submit (dùng để disable nút trong JSX)
    const [isUploadingImage, setIsUploadingImage] = useState(false);

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
     * Xử lý chọn ảnh bìa — encode sang base64 để xem trước ngay lập tức.
     * Ảnh chưa được upload lên server ở bước này.
     * Việc upload thật sự sẽ diễn ra khi người dùng bấm "Thêm mới" / "Cập nhật".
     */
    const handleImageUpload = (file: File) => {
        // Chỉ chấp nhận file ảnh
        if (!file.type.startsWith('image/')) {
            setError('Vui lòng chọn file ảnh hợp lệ');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            // Lưu base64 vào formData để hiển thị preview ngay — chưa lên server
            setFormData(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
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
            // Bước 1: Nếu ảnh bìa đang ở dạng base64 (chưa lên server),
            // upload lên server và thay thế bằng URL thật trước khi lưu bài viết
            let finalImage = formData.image;
            if (finalImage.startsWith('data:image/')) {
                setIsUploadingImage(true);
                // Lấy đuôi mở rộng từ MIME type (ví dụ: "data:image/png;base64,..." → "png")
                const mimeType = finalImage.substring(5, finalImage.indexOf(';'));
                const ext = mimeType.split('/')[1] || 'jpg';
                const filename = `thumbnail-${Date.now()}.${ext}`;
                // Chuyển base64 → Blob → File để gửi lên API
                const base64Data = finalImage.split(',')[1];
                const byteArray = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
                const file = new File([byteArray], filename, { type: mimeType });
                const fd = new FormData();
                fd.append('file', file);
                const res = await fetch('/api/upload', { method: 'POST', body: fd });
                if (!res.ok) throw new Error('Upload ảnh bìa thất bại');
                const { url } = await res.json();
                finalImage = url;
                setIsUploadingImage(false);
            }

            // Bước 2: Xử lý ảnh base64 trong nội dung CKEditor:
            // Tìm và upload từng ảnh base64 lên server,
            // thay thế src base64 bằng URL thật trước khi lưu bài viết
            const processedContent = await uploadBase64Images(formData.content);
            const dataToSave: NewsItem = {
                ...formData,
                image: finalImage,
                content: processedContent,
            };

            // Edit mode
            if (isEdit && initialData?.id) {
                const result = await updateNews(initialData.id, dataToSave);
                if (!result.success) throw new Error(result.message);
            }
            // Create mode
            else {
                const result = await createNews(dataToSave);
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

            {/* Ảnh bìa - upload click hoặc drag & drop */}
            <div className="form-group">
                <label className="form-label">Ảnh bìa</label>

                {/* Khi chưa có ảnh: hiển thị vùng upload */}
                {!formData.image ? (
                    <div
                        className={`thumbnail-dropzone${isDragOver ? ' drag-over' : ''}`}
                        onClick={() => document.getElementById('news-thumbnail-input')?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragOver(false);
                            const file = e.dataTransfer.files[0];
                            if (file) handleImageUpload(file);
                        }}
                    >
                        <input
                            id="news-thumbnail-input"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file);
                                // Reset input để có thể chọn lại cùng file
                                e.target.value = '';
                            }}
                        />
                        {isUploadingImage ? (
                            // Hiển thị trạng thái đang upload
                            <div className="dropzone-uploading">
                                <div className="dropzone-spinner" />
                                <span>Đang tải lên...</span>
                            </div>
                        ) : (
                            // Hiển thị hướng dẫn upload
                            <div className="dropzone-placeholder">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <p className="dropzone-title">Kéo thả ảnh vào đây</p>
                                <p className="dropzone-subtitle">hoặc <span>bấm để chọn ảnh</span> từ thiết bị</p>
                                <p className="dropzone-hint">PNG, JPG, WEBP — tối đa 10MB</p>
                            </div>
                        )}
                    </div>
                ) : (
                    // Khi đã có ảnh: hiển thị preview với nút xóa
                    <div className="thumbnail-preview-wrapper">
                        <img
                            src={formData.image}
                            alt="Ảnh bìa"
                            className="thumbnail-preview-img"
                        />
                        <div className="thumbnail-preview-actions">
                            <button
                                type="button"
                                className="thumbnail-change-btn"
                                onClick={() => document.getElementById('news-thumbnail-input')?.click()}
                                disabled={isUploadingImage}
                            >
                                <input
                                    id="news-thumbnail-input"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleImageUpload(file);
                                        e.target.value = '';
                                    }}
                                />
                                {isUploadingImage ? 'Đang tải lên...' : 'Thay ảnh'}
                            </button>
                            <button
                                type="button"
                                className="thumbnail-remove-btn"
                                onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                disabled={isUploadingImage}
                            >
                                Xóa ảnh
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Nội dung chi tiết - dùng CKEditor 5 nâng cao thay vì textarea */}
            <div className="form-group">
                <label className="form-label">Nội dung chi tiết</label>
                <CKEditorComponentCDN
                    value={formData.content}
                    onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                    placeholder="Nhập nội dung bài viết tại đây..."
                />
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
