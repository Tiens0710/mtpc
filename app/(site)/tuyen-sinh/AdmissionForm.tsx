'use client';

import { useState } from 'react';

export default function AdmissionForm() {
    const [formData, setFormData] = useState({
        fullname: '',
        dob: '',
        phone: '',
        email: '',
        education: '',
        major: '',
        policy: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const value = target instanceof HTMLInputElement && target.type === 'checkbox'
            ? target.checked
            : target.value;
        setFormData({ ...formData, [target.name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.policy) {
            alert('Vui lòng đồng ý với quy định tuyển sinh.');
            return;
        }
        alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        console.log(formData);
    };

    return (
        <div className="ts-form-card">
            <div className="ts-form-header">
                <h2>
                    <span className="material-symbols-outlined">edit_document</span>
                    Đăng ký xét tuyển trực tuyến
                </h2>
            </div>
            <div className="ts-form-body">
                <form onSubmit={handleSubmit}>
                    <div className="ts-form-row">
                        <div className="ts-form-group">
                            <label className="ts-form-label" htmlFor="fullname">
                                Họ và tên thí sinh <span className="required">*</span>
                            </label>
                            <input
                                className="ts-form-input"
                                id="fullname"
                                name="fullname"
                                type="text"
                                placeholder="Nhập họ và tên..."
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="ts-form-group">
                            <label className="ts-form-label" htmlFor="dob">
                                Ngày sinh <span className="required">*</span>
                            </label>
                            <input
                                className="ts-form-input"
                                id="dob"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="ts-form-row">
                        <div className="ts-form-group">
                            <label className="ts-form-label" htmlFor="phone">
                                Số điện thoại <span className="required">*</span>
                            </label>
                            <input
                                className="ts-form-input"
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Nhập số điện thoại..."
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="ts-form-group">
                            <label className="ts-form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="ts-form-input"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <hr className="ts-form-separator" />

                    <div className="ts-form-row">
                        <div className="ts-form-group">
                            <label className="ts-form-label" htmlFor="education">
                                Trình độ văn hóa hiện tại <span className="required">*</span>
                            </label>
                            <select
                                className="ts-form-input"
                                id="education"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Chọn trình độ --</option>
                                <option value="thpt">Đã tốt nghiệp THPT</option>
                                <option value="thcs">Đã tốt nghiệp THCS</option>
                                <option value="lop12">Đang học lớp 12</option>
                            </select>
                        </div>
                        <div className="ts-form-group">
                            <label className="ts-form-label" htmlFor="major">
                                Nguyện vọng ngành học <span className="required">*</span>
                            </label>
                                <select
                                className="ts-form-input"
                                id="major"
                                name="major"
                                value={formData.major}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Chọn ngành đăng ký --</option>
                                <option value="y-si-da-khoa">Y sĩ đa khoa</option>
                                <option value="duoc-si-trung-hoc">Dược sĩ trung học</option>
                                <option value="dieu-duong">Điều dưỡng</option>
                                <option value="ho-sinh">Hộ sinh</option>
                                <option value="cntt-ai">Công nghệ thông tin (định hướng AI)</option>
                            </select>
                        </div>
                    </div>

                    <div className="ts-form-policy">
                        <input
                            type="checkbox"
                            id="policy"
                            name="policy"
                            checked={formData.policy}
                            onChange={handleChange}
                        />
                        <label htmlFor="policy">
                            Tôi cam kết thông tin khai báo là trung thực và đồng ý với các quy định tuyển sinh của nhà trường.
                        </label>
                    </div>

                    <div className="ts-form-actions">
                        <button type="submit" className="ts-btn-submit">
                            <span className="material-symbols-outlined">send</span>
                            Gửi hồ sơ đăng ký
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
