export interface NewsItem {
    id?: string;
    slug?: string;
    title: string;
    description: string;
    content: string;
    image: string;
    category: 'tuyen-sinh' | 'su-kien' | 'thong-bao' | 'dao-tao';
    featured: boolean;
    date?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const CATEGORIES = [
    { id: 'tuyen-sinh', label: 'Tuyển sinh' },
    { id: 'su-kien', label: 'Sự kiện' },
    { id: 'thong-bao', label: 'Thông báo' },
    { id: 'dao-tao', label: 'Đào tạo' },
];
