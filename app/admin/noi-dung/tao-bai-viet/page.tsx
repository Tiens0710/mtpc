'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QuillEditor from '../../components/QuillEditor';
import './style.css';

export default function CreatePostPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Post Data:', { title, content });
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
                    {/* Title Input */}
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

                    {/* Editor */}
                    <div className="form-group">
                        <label className="form-label">Nội dung</label>
                        <QuillEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Viết nội dung của bạn ở đây..."
                        />
                    </div>

                    {/* Actions */}
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
