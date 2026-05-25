import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Điều khoản sử dụng',
    description: `Điều khoản sử dụng website ${siteConfig.school.nameFull}.`,
};

export default function DieuKhoanSuDungPage() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <section style={{
                padding: '4rem 1.5rem 3rem',
                background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                textAlign: 'center',
                color: 'white',
            }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Điều khoản sử dụng</h1>
                <p style={{ opacity: 0.85, fontSize: '1rem' }}>Cập nhật lần cuối: Tháng 06/2026</p>
            </section>

            <section style={{ padding: '4rem 1.5rem', maxWidth: 800, margin: '0 auto' }}>
                <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '1rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>1. Chấp nhận điều khoản</h2>
                    <p>
                        Khi truy cập và sử dụng website {siteConfig.urls.production}, bạn đồng ý tuân thủ
                        các điều khoản và điều kiện được nêu trong tài liệu này. Nếu bạn không đồng ý với bất kỳ điều khoản nào,
                        vui lòng không sử dụng website.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>2. Sử dụng website</h2>
                    <p>Website cung cấp thông tin về:</p>
                    <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Chương trình đào tạo và ngành học</li>
                        <li>Thông tin tuyển sinh và đăng ký xét tuyển</li>
                        <li>Tin tức, sự kiện của nhà trường</li>
                        <li>Dịch vụ xác thực bằng cấp blockchain</li>
                        <li>Công cụ tư vấn trực tuyến (chatbot)</li>
                    </ul>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>3. Thông tin đăng ký</h2>
                    <p>
                        Khi đăng ký tuyển sinh hoặc sử dụng biểu mẫu liên hệ, bạn cam kết cung cấp thông tin chính xác,
                        đầy đủ và cập nhật. {siteConfig.school.nameFull} không chịu trách nhiệm
                        đối với các sai sót do thông tin không chính xác từ người dùng.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>4. Sở hữu trí tuệ</h2>
                    <p>
                        Tất cả nội dung trên website bao gồm văn bản, hình ảnh, logo, biểu đồ và mã nguồn
                        là tài sản của {siteConfig.school.nameFull} hoặc được sử dụng có sự cho phép.
                        Nghiêm cấm sao chép, phân phối hoặc chỉnh sửa mà không có sự đồng ý bằng văn bản.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>5. Xác thực bằng cấp blockchain</h2>
                    <p>
                        Tính năng xác thực bằng cấp sử dụng công nghệ blockchain để xác minh tính xác thực của văn bằng.
                        Thông tin hiển thị chỉ mang tính tham khảo và không thay thế việc xác nhận chính thức từ nhà trường.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>6. Hạn chế trách nhiệm</h2>
                    <p>
                        {siteConfig.school.nameFull} nỗ lực cung cấp thông tin chính xác và cập nhật,
                        nhưng không đảm bảo tính hoàn hảo của tất cả nội dung. Thông tin trên website có thể thay đổi
                        mà không cần thông báo trước.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginTop: '2rem', marginBottom: '0.75rem' }}>7. Liên hệ</h2>
                    <p>
                        Nếu bạn có câu hỏi về điều khoản sử dụng, vui lòng liên hệ:<br />
                        <strong>{siteConfig.school.nameFull}</strong><br />
                        Địa chỉ: {siteConfig.address.full}
                    </p>
                </div>
            </section>
        </div>
    );
}