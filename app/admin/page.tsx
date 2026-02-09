/**
 * Admin Login Page
 * Route: /admin
 * 
 * Trang đăng nhập cho admin panel
 * Sử dụng LoginForm component để xử lý authentication
 */

import LoginForm from './components/LoginForm';

// Metadata cho SEO
export const metadata = {
    title: 'Admin Login | MTPC',
    description: 'Trang đăng nhập quản trị viên',
};

export default function AdminLoginPage() {
    return <LoginForm />;
}
