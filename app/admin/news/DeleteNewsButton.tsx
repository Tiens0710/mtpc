'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteNews } from './actions';

export default function DeleteNewsButton({ id, title }: { id: string, title: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return;

        setIsDeleting(true);
        try {
            await deleteNews(id);
            router.refresh();
        } catch (error) {
            alert('Có lỗi xảy ra khi xóa');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="action-btn delete"
            disabled={isDeleting}
            title="Xóa"
        >
            <span className="material-symbols-outlined icon-sm">delete</span>
        </button>
    );
}
