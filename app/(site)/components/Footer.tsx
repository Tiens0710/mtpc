'use client';

import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer-new">
            {/* Main Footer */}
            <div className="footer-new-main">
                <div className="footer-new-container">
                    {/* Column 1: Branding */}
                    <div className="footer-new-brand">
                        <div className="footer-new-logo">
                            <Image src="/logo.png" alt="MTPC" width={280} height={80} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        </div>
                        <p className="footer-new-desc">
                            Trường Cao đẳng uy tín hàng đầu tại ĐBSCL. Đơn vị đào tạo nguồn nhân lực chất lượng cao theo tiêu chuẩn quốc tế.
                        </p>
                        <div className="footer-new-social">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1B5E20" />
                                </svg>
                            </a>
                        </div>
                        <div className="footer-new-badges">
                            <span className="footer-badge">ISO 9001</span>
                            <span className="footer-badge">VCCI</span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-new-links">
                        <h4>Liên kết nhanh</h4>
                        <ul>
                            <li><a href="/gioi-thieu">Giới thiệu chung</a></li>
                            <li><a href="/tuyen-sinh">Tuyển sinh 2026</a></li>
                            <li><a href="/doi-song-sinh-vien">Đời sống sinh viên</a></li>
                            <li><a href="/hop-tac">Hợp tác doanh nghiệp</a></li>
                            <li><a href="/tra-cuu">Tra cứu văn bằng</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="footer-new-contact">
                        <h4>Thông tin liên hệ</h4>
                        <ul>
                            <li>
                                <span className="material-symbols-outlined">location_on</span>
                                <span>123 Đường 3/2, Quận Ninh Kiều, TP. Cần Thơ, Việt Nam</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined">phone</span>
                                <a href="tel:02923888999">(0292) 3 888 999</a>
                            </li>
                            <li>
                                <span className="material-symbols-outlined">mail</span>
                                <a href="mailto:tuyensinh@mtpc.edu.vn">tuyensinh@mtpc.edu.vn</a>
                            </li>
                            <li>
                                <span className="material-symbols-outlined">schedule</span>
                                <span>Thứ 2 - Thứ 7: 7:30 - 17:00</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Map */}
                    <div className="footer-new-map">
                        <h4>Bản đồ chỉ đường</h4>
                        <div className="footer-map-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.6985845517625!2d105.76096287479425!3d10.04171239006586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08813cdc5f82b%3A0x9431648e2300b3f!2zVHLGsOG7nW5nIFRydW5nIGPhuqVwIE1p4buBbiBUw6J5!5e0!3m2!1svi!2s!4v1770992301128!5m2!1svi!2s"
                                width="100%"
                                height="180"
                                style={{ border: 0, borderRadius: '8px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Bản đồ Trường Trung cấp Miền Tây"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-new-bottom">
                <div className="footer-new-container">
                    <p>© 2026 Mien Tay Professional College.</p>
                    <div className="footer-bottom-links">
                        <a href="/chinh-sach">Chính sách bảo mật</a>
                        <a href="/quy-che">Quy chế hoạt động</a>
                        <a href="/sitemap">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
