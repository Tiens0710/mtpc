'use client';

import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

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
                            {siteConfig.school.description}
                        </p>
                        <div className="footer-new-social">
                            {siteConfig.social.facebook.startsWith('http') && siteConfig.social.facebook !== '__TODO__ https://facebook.com/MTPCCanTho hoặc URL thật' && (
                                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>
                            )}
                            {siteConfig.social.youtube.startsWith('http') && siteConfig.social.youtube !== '__TODO__ https://youtube.com/@mtpc hoặc URL thật' && (
                                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1B5E20" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-new-links">
                        <h4>Liên kết nhanh</h4>
                        <ul>
                            <li><a href="/gioi-thieu">Giới thiệu</a></li>
                            <li><a href="/tuyen-sinh">Tuyển sinh</a></li>
                            <li><a href="/nganh-dao-tao">Ngành đào tạo</a></li>
                            <li><a href="/tin-tuc">Tin tức & Sự kiện</a></li>
                            <li><a href="/sinh-vien">Sinh viên</a></li>
                            <li><a href="/verify-certificate">Xác thực bằng cấp</a></li>
                            <li><a href="/lien-he">Liên hệ</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="footer-new-contact">
                        <h4>Thông tin liên hệ</h4>
                        <ul>
                            <li>
                                <span className="material-symbols-outlined">location_on</span>
                                <span>{siteConfig.address.full}</span>
                            </li>
                            {siteConfig.contact.phoneMain && !siteConfig.contact.phoneMain.includes('__TODO__') && (
                                <li>
                                    <span className="material-symbols-outlined">phone</span>
                                    <a href={`tel:${siteConfig.contact.phoneMain}`}>{siteConfig.contact.phoneMain}</a>
                                </li>
                            )}
                            <li>
                                <span className="material-symbols-outlined">chat</span>
                                <a href={siteConfig.contact.zaloOA.url} target="_blank" rel="noopener noreferrer">
                                    Zalo OA: {siteConfig.contact.zaloOA.number}
                                </a>
                            </li>
                            {siteConfig.contact.email.admissions && !siteConfig.contact.email.admissions.includes('__TODO__') && (
                                <li>
                                    <span className="material-symbols-outlined">mail</span>
                                    <a href={`mailto:${siteConfig.contact.email.admissions}`}>{siteConfig.contact.email.admissions}</a>
                                </li>
                            )}
                            <li>
                                <span className="material-symbols-outlined">schedule</span>
                                <span>{siteConfig.contact.workingHours.weekday}</span>
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
                    <p>{siteConfig.copyright.text()}</p>
                    <div className="footer-bottom-links">
                        <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
                        <a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a>
                        <a href="/sitemap.xml">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
