import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Chính sách bảo mật',
    description: `Chính sách bảo mật thông tin cá nhân của ${siteConfig.school.nameFull}.`,
};

export default function ChinhSachBaoMatPage() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <section style={{
                padding: '4rem 1.5rem 3rem',
                background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                textAlign: 'center',
                color: 'white',
            }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Chính sách bảo mật</h1>
                <p style={{ opacity: 0.85, fontSize: '1rem' }}>Cập nhật lần cuối: Tháng 06/2026</p>
            </section>

            <section style={{ padding: '4rem 1.5rem', maxWidth: 800, margin: '0 auto' }}>
                <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '1rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>1. Thu thập thông tin</h2>
                    <p>
                        {siteConfig.school.nameFull} thu thập thông tin cá nhân khi bạn đăng ký tuyển sinh, gửi biểu mẫu liên hệ,
                        hoặc sử dụng các dịch vụ trực tuyến của chúng tôi. Thông tin bao gồm: họ tên, số điện thoại, email,
                        địa chỉ, và các thông tin liên quan đến hồ sơ tuyển sinh.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>2. Mục đích sử dụng</h2>
                    <p>Thông tin cá nhân được sử dụng cho các mục đích:</p>
                    <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Xử lý hồ sơ tuyển sinh và liên lạc với thí sinh</li>
                        <li>Quản lý quá trình đào tạo và hỗ trợ sinh viên</li>
                        <li>Gửi thông báo về chương trình đào tạo, sự kiện của nhà trường</li>
                        <li>Cải thiện chất lượng dịch vụ trên website</li>
                    </ul>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>3. Bảo mật thông tin</h2>
                    <p>
                        Chúng tôi cam kết bảo mật thông tin cá nhân của bạn bằng các biện pháp kỹ thuật và quản lý phù hợp.
                        Thông tin chỉ được truy cập bởi nhân viên được ủy quyền và không được chia sẻ cho bên thứ ba
                        trừ khi có sự đồng ý của bạn hoặc theo yêu cầu của pháp luật.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>4. Cookie và công nghệ theo dõi</h2>
                    <p>
                        Website có thể sử dụng cookie để cải thiện trải nghiệm người dùng. Bạn có thể tùy chỉnh cài đặt cookie
                        trong trình duyệt của mình.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>5. Quyền của bạn</h2>
                    <p>Bạn có quyền:</p>
                    <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân</li>
                        <li>Từ chối nhận thông báo tiếp thị</li>
                        <li>Rút lại sự đồng ý xử lý dữ liệu</li>
                    </ul>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>6. Liên hệ</h2>
                    <p>
                        Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:<br />
                        <strong>{siteConfig.school.nameFull}</strong><br />
                        Địa chỉ: {siteConfig.address.full}<br />
                        Email: {siteConfig.contact.email.admissions && !siteConfig.contact.email.admissions.includes('__TODO__') ? siteConfig.contact.email.admissions : 'info@mtpc.edu.vn'}
                    </p>
                </div>
            </section>
        </div>
    );
}