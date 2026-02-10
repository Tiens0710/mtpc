import DashboardContent from '../components/DashboardContent';
import './styles/index.css';

// Metadata cho SEO
export const metadata = {
    title: 'Admin Dashboard | MTPC',
    description: 'Trang quản trị chính',
};

export default function AdminDashboard() {
    return <DashboardContent />;
}
