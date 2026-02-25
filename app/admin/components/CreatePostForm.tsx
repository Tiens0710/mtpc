'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Tải CKEditor qua dynamic import để tránh lỗi SSR
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

/**
 * Component Form cho phép tạo bài viết mới
 * Bao gồm tiêu đề, ảnh bìa (upload) và nội dung (CKEditor 5)
 */
export default function CreatePostForm() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Giả lập gọi API bài viết
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Post Data:', { title, thumbnail, content });
        alert('Đã lưu bài viết (Giả lập)!');

        setIsSubmitting(false);
        router.push('/admin/noi-dung');
    };

    return (
        <div className="create-post-container">
            {/* Header */}
            <div className="page-header">
                <div className="header-left">
                    <Link href="/admin/noi-dung" className="btn-back">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Quay lại
                    </Link>
                    <h1 className="page-title">Tạo bài viết mới</h1>
                </div>
            </div>

            <div className="editor-card">
                <form onSubmit={handleSubmit} className="post-form">
                    {/* Input Tiêu đề */}
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Tiêu đề bài viết</label>
                        <input
                            type="text"
                            id="title"
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tiêu đề bài viết..."
                            required
                        />
                    </div>

                    {/* Upload Ảnh bìa */}
                    <div className="form-group">
                        <label htmlFor="thumbnail" className="form-label">Ảnh bìa</label>
                        <div className="file-upload-wrapper">
                            <input
                                type="file"
                                id="thumbnail"
                                className="file-input"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const imageUrl = URL.createObjectURL(file);
                                        setThumbnail(imageUrl);
                                    }
                                }}
                            />
                            <div className="file-upload-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                                <span>{thumbnail ? 'Thay đổi ảnh' : 'Tải lên ảnh bìa'}</span>
                            </div>
                        </div>
                        {thumbnail && (
                            <div className="thumbnail-preview">
                                <img src={thumbnail} alt="Thumbnail preview" />
                                <button
                                    type="button"
                                    className="btn-remove-thumbnail"
                                    onClick={() => setThumbnail('')}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Editor Nội dung */}
                    <div className="form-group">
                        <label className="form-label">Nội dung</label>
                        <CKEditorComponentCDN
                            value={content}
                            onChange={setContent}
                            placeholder="Viết nội dung của bạn ở đây..."
                        />
                    </div>

                    {/* Các nút hành động */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="btn-save"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Đang lưu...' : 'Lưu bài viết'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
