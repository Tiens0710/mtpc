import { NewsItem } from './schema';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export async function getNews(): Promise<NewsItem[]> {
    const res = await fetch(`${API_BASE_URL}/news`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Không thể tải danh sách tin tức');
    return res.json();
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
    if (!id || id === 'undefined') return undefined;

    const res = await fetch(`${API_BASE_URL}/news/${id}`, { cache: 'no-store' });
    if (!res.ok) return undefined;
    
    const text = await res.text();
    if (!text) return undefined;

    try {
        return JSON.parse(text);
    } catch (e) {
        console.error(`[API Lỗi] Parse JSON thất bại với id=${id}:`, e);
        return undefined;
    }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
    const res = await fetch(`${API_BASE_URL}/news/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return undefined;
    return res.json();
}

export async function createNews(data: NewsItem): Promise<{ success: boolean; message: string; data?: NewsItem }> {
    const res = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    
    if (!res.ok) {
        throw new Error('Lỗi khi thêm tin tức mới');
    }
    
    return res.json();
}

export async function updateNews(id: string, data: NewsItem): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Lỗi khi cập nhật tin tức');
    }

    return res.json();
}

export async function deleteNews(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Lỗi khi xóa tin tức');
    }

    return res.json();
}
