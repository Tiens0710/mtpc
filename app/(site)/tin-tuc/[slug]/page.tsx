import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getNewsBySlug, getNewsById } from '@/app/admin/news/api';
import { Metadata } from 'next';
import '../tin-tuc.css';

type Props = {
    params: Promise<{ slug: string }>;
};

// Hàm tiện ích hỗ trợ fallback (tìm slug không ra thì tìm bằng ID cũ)
async function fetchNews(slugOrId: string) {
    let result = await getNewsBySlug(slugOrId);
    if (!result) {
        result = await getNewsById(slugOrId);
    }
    return result;
}

// Chuẩn SEO cho trang bài viết
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    
    try {
        const realNews = await fetchNews(slug);
        if (realNews) {
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
    } catch (error) {
        console.error("Lỗi fetch cho metadata", error);
    }

    return {
        title: 'Tin tức | MTPC',
    };
}

const CATEGORY_MAP: Record<string, string> = {
    'tuyen-sinh': 'Tuyển sinh',
    'su-kien': 'Sự kiện',
    'thong-bao': 'Thông báo',
    'dao-tao': 'Đào tạo',
};

export default async function NewsDetailPage({ params }: Props) {
    const { slug } = await params;
    
    let realNews;
    try {
        realNews = await fetchNews(slug);
    } catch (error) {
        console.error("Lỗi fetch cho page", error);
        notFound();
    }

    if (!realNews) {
        notFound();
    }

    const categoryLabel = realNews.category ? CATEGORY_MAP[realNews.category] || realNews.category : 'Tin tức';

    return (
        <main className="news-detail-main">
            <article className="news-detail-container">
                <div className="news-detail-content-wrapper">
                    {/* Category Label */}
                    <div className="news-detail-category">
                        <span className="news-detail-badge">
                            {categoryLabel}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="news-detail-title">
                        {realNews.title}
                    </h1>
                    
                    {/* Meta info */}
                    <div className="news-detail-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="news-detail-icon" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span className="news-detail-date">{realNews.createdAt ? new Date(realNews.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}</span>
                    </div>

                    {/* Sapo / Description */}
                    {realNews.description && (
                        <h2 className="news-detail-sapo">
                            {realNews.description}
                        </h2>
                    )}

                    {/* Cover Image */}
                    {realNews.image && (
                        <figure className="news-detail-figure">
                            <Image 
                                src={realNews.image} 
                                alt={realNews.title || 'Ảnh bài viết'}
                                width={900}
                                height={500}
                                className="news-detail-image"
                                priority
                            />
                        </figure>
                    )}

                    {/* Content */}
                    <div 
                        className="news-detail-body"
                        dangerouslySetInnerHTML={{ __html: realNews.content }}
                    />
                </div>
            </article>
        </main>
    );
}
