/**
 * Admin Dashboard Index Page
 * 
 * Trang dashboard chính của admin panel
 * - Fetch data từ multiple sources concurrently
 * - Pass counts đến DashboardContent component
 * - DashboardContent hiển thị: welcome section, visitor chart, và dashboard cards
 * 
 * @page Server Component
 */

import DashboardContent from '../components/DashboardContent';
import './styles/index.css';
import { getPrograms } from '../programs/actions';
import { getNews } from '../news/actions';
import { getFees, getFAQs, getInquiries } from '../admissions/actions';

// SEO metadata
export const metadata = {
    title: 'Admin Dashboard | MTPC',
    description: 'Trang quản trị chính',
};

export default async function AdminDashboard() {
    /**
     * Fetch tất cả data concurrently để tối ưu performance
     * Sử dụng Promise.all để fetch parallel thay vì sequential
     */
    const [programs, news, fees, faqs, inquiries] = await Promise.all([
        getPrograms(),      // Danh sách chương trình đào tạo
        getNews(),          // Danh sách tin tức
        getFees(),          // Danh sách học phí
        getFAQs(),          // Danh sách FAQ
        getInquiries()      // Danh sách inquiry/đăng ký
    ]);

    // Render DashboardContent với counts
    return (
        <DashboardContent
            programsCount={programs.length}
            newsCount={news.length}
            feesCount={fees.length}
            faqsCount={faqs.length}
            inquiriesCount={inquiries.length}
        />
    );
}
