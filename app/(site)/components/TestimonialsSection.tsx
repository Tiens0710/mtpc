// ============================================================
// Testimonials Section — "Khách hàng nói gì về chúng tôi"
// Infinite scroll carousel hiển thị đánh giá từ sinh viên MTPC
// ============================================================
const testimonials = [
    {
        id: 'anh-tu',
        content:
            '"Mình theo học ngành Y sĩ đa khoa, giảng viên rất tận tâm, thực hành lâm sàng nhiều. Ra trường mình có việc ngay tại phòng khám tư nhân ở Cần Thơ."',
        author: 'Nguyễn Anh Thư',
        role: 'Cựu sinh viên — Y sĩ đa khoa',
        rating: 5,
    },
    {
        id: 'thu-trang',
        content:
            '"Ban đầu mình lo không theo được ngành Dược, nhưng nhà trường hỗ trợ rất tốt. Thực tập tại nhà thuốc lớn ở Cần Thơ giúp mình tự tin đi làm luôn sau tốt nghiệp."',
        author: 'Trần Thu Trang',
        role: 'Cựu sinh viên — Dược sĩ trung học',
        rating: 5,
    },
    {
        id: 'hoang-lan',
        content:
            '"Ngành Điều dưỡng tại MTPC đào tạo rất bài bản. Phòng skills lab mô phỏng giúp mình chuẩn bị tốt cho công việc. Hiện mình đang làm tại Bệnh viện Đa khoa Cần Thơ."',
        author: 'Phạm Hoàng Lan',
        role: 'Cựu sinh viên — Điều dưỡng',
        rating: 5,
    },
    {
        id: 'minh-tam',
        content:
            '"Mình đăng ký xét tuyển online rất dễ, phòng tuyển sinh hướng dẫn tận tình. Chương trình CNTT-AI thực tế, học xong mình làm AI Operator tại một công ty startup."',
        author: 'Lê Minh Tâm',
        role: 'Cựu sinh viên — CNTT Ứng dụng AI',
        rating: 5,
    },
    {
        id: 'ngoc-bich',
        content:
            '"Hộ sinh là ngành mình yêu thích từ nhỏ. MTPC có cơ sở vật chất tốt, thực hành tại khoa sản bệnh viện giúp mình vững tay nghề. Rất hài lòng!"',
        author: 'Võ Ngọc Bích',
        role: 'Cựu sinh viên — Hộ sinh',
        rating: 5,
    },
    {
        id: 'thanhtam',
        content:
            '"Con tôi theo học tại MTPC, nhà trường có ký túc xá sạch sẽ, an ninh 24/7. Giảng viên quan tâm học viên như con em trong gia đình."',
        author: 'Chị Mai',
        role: 'Phụ huynh sinh viên',
        rating: 5,
    },
];

export default function TestimonialsSection() {
    return (
        <section className="testimonials-section">
            {/* Background dot pattern */}
            <div className="testimonials-bg-dots" />

            {/* Ambient glow */}
            <div className="testimonials-bg-glow" />

            {/* Top & bottom accent lines */}
            <div className="testimonials-divider-top" />
            <div className="testimonials-divider-bottom" />

            <div className="testimonials-inner">
                {/* Header */}
                <div className="testimonials-header">
                    <div className="testimonials-badge-row">
                        <span className="testimonials-deco-line-left" />
                        <span className="testimonials-badge">
                            <span className="testimonials-badge-dot" />
                            Đánh giá
                        </span>
                        <span className="testimonials-deco-line-right" />
                    </div>
                    <h2 className="testimonials-title">
                        Cựu sinh viên nói gì về MTPC
                    </h2>
                    <div className="testimonials-title-underline" />
                    <p className="testimonials-desc">
                        Hơn 5.000 sinh viên đã tin tưởng và chọn MTPC là nơi khởi đầu sự nghiệp
                    </p>
                </div>

                {/* Edge fades */}
                <div className="testimonials-edge-left" />
                <div className="testimonials-edge-right" />

                {/* Infinite scroll carousel */}
                <div className="testimonials-scroll-container">
                    <div className="testimonials-scroll-track">
                        {[...testimonials, ...testimonials].map((testimonial, i) => (
                            <div key={`card-${testimonial.id}-${i}`} className="testimonial-card">
                                {/* Top accent bar */}
                                <div className="testimonial-card-accent" />

                                <div className="testimonial-card-body">
                                    {/* Quote icon */}
                                    <div className="testimonial-quote-icon">&ldquo;</div>

                                    {/* Star Rating + Verified */}
                                    <div className="testimonial-top-row">
                                        <div className="testimonial-stars">
                                            {[...Array(testimonial.rating)].map((_, si) => (
                                                <svg key={si} className="testimonial-star" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="testimonial-verified">
                                            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Đã xác minh
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <p className="testimonial-content">
                                        {testimonial.content}
                                    </p>

                                    {/* Amber divider */}
                                    <div className="testimonial-divider" />

                                    {/* Author */}
                                    <div className="testimonial-author">
                                        <div className="testimonial-avatar-placeholder">
                                            {testimonial.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="testimonial-author-name">{testimonial.author}</p>
                                            <p className="testimonial-author-role">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}