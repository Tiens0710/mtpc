'use server';

import { NewsItem } from './schema';

// Mock database
let newsData: NewsItem[] = [
    {
        id: '1',
        category: 'tuyen-sinh',
        title: 'Trường Trung Cấp Miền Tây công bố thông tin tuyển sinh năm học 2026',
        description: 'Năm học mới sắp đến, trường Trung Cấp Miền Tây chính thức công bố thông tin tuyển sinh với nhiều ngành học mới.',
        content: 'Nội dung chi tiết về thông tin tuyển sinh...',
        image: '/slide-1.jpg',
        featured: true,
        date: '2026-02-10',
    },
    {
        id: '2',
        category: 'su-kien',
        title: 'Lễ tốt nghiệp khóa 2025 - Kết quả học tập ấn tượng',
        description: 'Lễ tốt nghiệp năm nay ghi nhận nhiều sinh viên xuất sắc với thành tích học tập và rèn luyện vượt trội.',
        content: 'Nội dung chi tiết về lễ tốt nghiệp...',
        image: '/slide-3.jpg',
        featured: false,
        date: '2026-02-08',
    },
];

export async function getNews(): Promise<NewsItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return newsData;
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return newsData.find(p => p.id === id);
}

export async function createNews(data: NewsItem): Promise<{ success: boolean; message: string; data?: NewsItem }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newItem = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
    };

    newsData.push(newItem);
    return { success: true, message: 'Thêm tin tức thành công', data: newItem };
}

export async function updateNews(id: string, data: NewsItem): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = newsData.findIndex(p => p.id === id);
    if (index === -1) {
        return { success: false, message: 'Không tìm thấy tin tức' };
    }

    newsData[index] = { ...data, id, date: newsData[index].date };
    return { success: true, message: 'Cập nhật thành công' };
}

export async function deleteNews(id: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    newsData = newsData.filter(p => p.id !== id);
    return { success: true, message: 'Xóa tin tức thành công' };
}
