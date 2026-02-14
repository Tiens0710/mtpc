'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProgram } from './actions';

export default function DeleteButton({ id, name }: { id: string, name: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Bạn có chắc chắn muốn xóa chương trình "${name}"?`)) return;

        setIsDeleting(true);
        try {
            await deleteProgram(id);
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
