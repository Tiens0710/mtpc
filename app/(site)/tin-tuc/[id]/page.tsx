import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getNewsById } from '@/app/admin/news/api';
import { categories, newsData } from '../mockData';
import { Metadata } from 'next';
import '../tin-tuc.css';

type Props = {
    params: Promise<{ id: string }>;
};

// Chuẩn SEO cho trang bài viết
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params; // Next.js 15 requires awaiting params
    
    try {
        const realNews = await getNewsById(id);
        if (realNews) {
            // Fix host URL: Ảnh được upload và lưu trong public/uploads của Next.js Front-end
            // Do đó giữ nguyên đường dẫn tương đối (bắt đầu bằng '/')
            const imageUrl = realNews.image;

            return {
                title: `${realNews.title} | Trường Trung Cấp Miền Tây`,
                description: realNews.description || 'Cập nhật thông tin mới nhất tại MTPC.',
                openGraph: {
                    title: realNews.title,
                    description: realNews.description || 'Cập nhật thông tin mới nhất tại MTPC.',
                    images: imageUrl ? [imageUrl] : undefined,
                }
            };
        }
    } catch {
        // Fall qua logic mock data nếu fetch lỗi hoặc không tìm thấy bài
    }

    const mockItem = newsData.find(item => item.link.split('/').pop() === id);
    if (mockItem) {
        return {
            title: `${mockItem.title} | Trường Trung Cấp Miền Tây`,
            description: mockItem.description,
            openGraph: {
                title: mockItem.title,
                description: mockItem.description,
                images: [mockItem.image],
            }
        };
    }

    return { title: 'Không tìm thấy trang | Trường Trung Cấp Miền Tây' };
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params; // Next.js 15 pattern

    let newsItem = null;

    // 1. Cố gắng lấy data thật từ DB
    try {
        const realNews = await getNewsById(id);
        if (realNews) {
            // Fix host URL: Ảnh lưu ở thư mục public/uploads/ của Next.js Front-end
            const imageUrl = realNews.image || '/slide-1.jpg';

            newsItem = {
                title: realNews.title,
                description: realNews.description,
                content: realNews.content,
                image: imageUrl,
                category: categories.find(c => c.id === realNews.category)?.label || realNews.category,
                // Fallback valid Date object
                date: new Date(realNews.createdAt || Date.now()).toLocaleDateString('vi-VN'),
            };
        }
    } catch (err) {
        console.error('Lỗi khi fetch tin tức thật:', err);
    }

    // 2. Chuyển sang fallback bằng mockData nếu không có data thật
    if (!newsItem) {
        const mockItem = newsData.find(item => item.link.split('/').pop() === id);
        if (mockItem) {
            newsItem = {
                title: mockItem.title,
                description: mockItem.description,
                // Dựng thẻ p giả lập nội dung từ CKEditor cho bản demo
                content: `<p class="mb-4 text-lg font-medium">${mockItem.description}</p><p>Đây là nội dung hiển thị demo (bản nháp). Nội dung chính thức sẽ được nhập trên hệ thống Admin của nhà trường.</p>`,
                image: mockItem.image,
                category: mockItem.categoryLabel,
                date: '14/04/2026',
            };
        }
    }

    // 3. Nếu đéo có bài nào (cả trên DB lẫn mock) thì báo 404
    if (!newsItem) {
        notFound();
    }

    return (
        <main className="news-detail-main">
            <nav className="news-breadcrumb text-sm mb-4" aria-label="Breadcrumb">
                <a href="/" aria-label="Trang chủ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', marginBottom: '2px'}}>
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Trang chủ
                </a>
                <span className="breadcrumb-separator">/</span>
                <a href="/tin-tuc">Tin tức</a>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current" title={newsItem.title}>{newsItem.title}</span>
            </nav>

            <article className="news-detail-article">
                {/* Hero header của bài viết */}
                <div className="news-detail-hero">
                    <img
                        src={newsItem.image}
                        alt={newsItem.title}
                        className="object-contain w-full h-full absolute inset-0"
                        style={{ objectFit: 'contain', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: '#f9fafb' }}
                    />
                </div>

                {/* Phần ruột bài viết */}
                <div className="news-detail-content">
                    <div className="news-detail-meta">
                        <span className="news-detail-badge">
                            {newsItem.category}
                        </span>
                        <time className="news-detail-date">{newsItem.date}</time>
                    </div>

                    <h1 className="news-detail-title">
                        {newsItem.title}
                    </h1>

                    <div 
                        className="news-detail-body"
                        dangerouslySetInnerHTML={{ __html: newsItem.content }}
                    />
                </div>
            </article>
        </main>
    );
}