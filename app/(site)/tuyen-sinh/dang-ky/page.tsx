'use client';

import { useState } from 'react';
import Image from 'next/image';
import './dang-ky.css';

export default function DangKyXetTuyenPage() {
    const [formData, setFormData] = useState({
        heDaoTao: '',
        hoTen: '',
        ngaySinh: '',
        soDienThoai: '',
        trinhDo: '',
        nganhHoc: '',
    });

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        console.log(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const faqItems = [
        {
            question: 'Thời gian xét tuyển kéo dài bao lâu?',
            answer: 'Thời gian xét tuyển thường mất 3-5 ngày làm việc. Sau khi nộp hồ sơ, nhà trường sẽ liên hệ thông báo kết quả qua điện thoại hoặc email.'
        },
        {
            question: 'Tôi có thể đăng ký nhiều ngành cùng lúc không?',
            answer: 'Bạn có thể đăng ký tối đa 2 ngành theo thứ tự ưu tiên. Nhà trường sẽ xét tuyển theo ngành ưu tiên số 1 trước.'
        },
        {
            question: 'Học phí có thể đóng theo từng kỳ không?',
            answer: 'Có, nhà trường hỗ trợ đóng học phí theo từng học kỳ hoặc theo tháng để giảm áp lực tài chính cho học sinh.'
        },
        {
            question: 'Trường có chính sách hỗ trợ việc làm sau tốt nghiệp?',
            answer: 'Có, trường có quan hệ hợp tác với nhiều doanh nghiệp và bệnh viện. Tỷ lệ có việc làm sau tốt nghiệp đạt trên 95%.'
        },
    ];

    const feeData = [
        { nganh: 'Y sĩ đa khoa', hocPhi: '12.000.000đ/năm', uuDai: 'Giảm 30% năm đầu' },
        { nganh: 'Điều dưỡng', hocPhi: '11.000.000đ/năm', uuDai: 'Giảm 30% năm đầu' },
        { nganh: 'Dược sĩ', hocPhi: '13.000.000đ/năm', uuDai: 'Giảm 25% năm đầu' },
        { nganh: 'Cơ khí', hocPhi: '9.000.000đ/năm', uuDai: 'Miễn phí đồng phục' },
        { nganh: 'Điện tử', hocPhi: '9.500.000đ/năm', uuDai: 'Miễn phí đồng phục' },
        { nganh: 'Thương mại điện tử', hocPhi: '10.000.000đ/năm', uuDai: 'Hỗ trợ laptop' },
    ];

    return (
        <div className="register-page">
            {/* Hero Banner */}
            <div className="register-hero">
                <Image
                    src="/dangkyxettuyen.png"
                    alt="Đăng ký xét tuyển"
                    fill
                    priority
                    className="register-hero-image"
                />
                <div className="register-hero-overlay">
                    <h1 className="register-hero-title">XÂY DỰNG SỰ NGHIỆP<br />BẮT ĐẦU TỪ ĐÂY</h1>
                    <p className="register-hero-subtitle">
                        Đăng ký xét tuyển - Trường Trung cấp Miền Tây
                    </p>
                </div>
            </div>

            <div className="register-content">
                <div className="register-grid">
                    {/* Form Column */}
                    <div className="form-column">
                        <div className="register-form-wrapper">
                            <h2 className="form-title">Thông tin đăng ký</h2>

                            <form className="register-form" onSubmit={handleSubmit}>
                                {/* Hệ đào tạo */}
                                <div className="form-group">
                                    <label className="form-label">Hệ đào tạo *</label>
                                    <div className="radio-group">
                                        <label className="radio-item">
                                            <input type="radio" name="heDaoTao" value="Sơ cấp" onChange={handleChange} required />
                                            <span>Sơ cấp</span>
                                        </label>
                                        <label className="radio-item">
                                            <input type="radio" name="heDaoTao" value="Trung cấp" onChange={handleChange} />
                                            <span>Trung cấp</span>
                                        </label>
                                        <label className="radio-item">
                                            <input type="radio" name="heDaoTao" value="Cao đẳng" onChange={handleChange} />
                                            <span>Cao đẳng</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Họ và tên */}
                                <div className="form-group">
                                    <label className="form-label">Họ và tên *</label>
                                    <input type="text" name="hoTen" className="form-input" placeholder="Nhập họ và tên" value={formData.hoTen} onChange={handleChange} required />
                                </div>

                                {/* Ngày sinh */}
                                <div className="form-group">
                                    <label className="form-label">Ngày tháng năm sinh *</label>
                                    <input type="date" name="ngaySinh" className="form-input" value={formData.ngaySinh} onChange={handleChange} required />
                                </div>

                                {/* Số điện thoại */}
                                <div className="form-group">
                                    <label className="form-label">Số điện thoại *</label>
                                    <input type="tel" name="soDienThoai" className="form-input" placeholder="Nhập số điện thoại" value={formData.soDienThoai} onChange={handleChange} required />
                                </div>

                                {/* Đã tốt nghiệp */}
                                <div className="form-group">
                                    <label className="form-label">Đã tốt nghiệp *</label>
                                    <select name="trinhDo" className="form-input" value={formData.trinhDo} onChange={handleChange} required>
                                        <option value="">-- Chọn trình độ --</option>
                                        <option value="THCS">Trung học cơ sở (THCS)</option>
                                        <option value="THPT">Trung học phổ thông (THPT)</option>
                                        <option value="TC">Trung cấp (TC)</option>
                                        <option value="CD">Cao đẳng (CĐ)</option>
                                        <option value="DH">Đại học (ĐH)</option>
                                        <option value="Khac">Khác</option>
                                    </select>
                                </div>

                                {/* Chọn ngành học */}
                                <div className="form-group">
                                    <label className="form-label">Chọn ngành học *</label>
                                    <select name="nganhHoc" className="form-input" value={formData.nganhHoc} onChange={handleChange} required>
                                        <option value="">-- Chọn ngành học --</option>
                                        <option value="Y sĩ đa khoa">Y sĩ đa khoa</option>
                                        <option value="Điều dưỡng">Điều dưỡng</option>
                                        <option value="Dược sĩ">Dược sĩ</option>
                                        <option value="Cơ khí">Cơ khí</option>
                                        <option value="Điện tử">Điện tử</option>
                                        <option value="Thương mại điện tử">Thương mại điện tử</option>
                                    </select>
                                </div>

                                {/* Nút gửi */}
                                <button type="submit" className="btn-submit">
                                    GỬI ĐĂNG KÝ
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Info Column */}
                    <div className="info-column">
                        {/* Học phí */}
                        <div className="info-box">
                            <h3 className="info-title">💰 Học phí 2026</h3>
                            <div className="fee-list">
                                {feeData.map((item, index) => (
                                    <div key={index} className="fee-item">
                                        <div className="fee-name">{item.nganh}</div>
                                        <div className="fee-price">{item.hocPhi}</div>
                                        <div className="fee-promo">{item.uuDai}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hỏi đáp */}
                        <div className="info-box">
                            <h3 className="info-title">❓ Hỏi đáp thường gặp</h3>
                            <div className="faq-list">
                                {faqItems.map((item, index) => (
                                    <div key={index} className="faq-item">
                                        <button
                                            className={`faq-question ${openFaq === index ? 'active' : ''}`}
                                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        >
                                            {item.question}
                                            <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                                        </button>
                                        {openFaq === index && (
                                            <div className="faq-answer">{item.answer}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Liên hệ */}
                        <div className="info-box contact-box">
                            <h3 className="info-title">📞 Liên hệ tư vấn</h3>
                            <p>Hotline: <strong>(0292) 222 55 77</strong></p>
                            <p>Email: tuyensinh@mtpc.edu.vn</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
