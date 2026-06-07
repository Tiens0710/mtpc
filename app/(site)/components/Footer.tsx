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

                    {/* Column 4: Facebook Fanpage */}
                    <div className="footer-new-fanpage">
                        <div className="fb-card">
                            {/* Banner */}
                            <div className="fb-card-banner">
                                <Image
                                    src="/fb_banner.webp"
                                    alt="MTPC Banner"
                                    fill
                                    sizes="380px"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            {/* Content */}
                            <div className="fb-card-body">
                                <div className="fb-card-info">
                                    <div className="fb-card-avatar">
                                        <Image
                                            src="/fb_avt.webp"
                                            alt="MTPC"
                                            fill
                                            sizes="56px"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="fb-card-text">
                                        <h5 className="fb-card-name">Trường Trung cấp Miền Tây</h5>
                                        <p className="fb-card-followers">1.1K người theo dõi • 0 đang theo dõi</p>
                                    </div>
                                </div>
                                <div className="fb-card-actions">
                                    <a
                                        href="https://m.me/61558944491398"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="fb-btn fb-btn-message"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.836 1.466 5.37 3.74 6.993V22l3.472-1.907C10.154 20.384 11.057 20.5 12 20.5c5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.003 12.115l-2.553-2.724-4.97 2.724 5.46-5.798 2.608 2.724 4.915-2.724-5.46 5.798z"/>
                                        </svg>
                                        Nhắn tin
                                    </a>
                                    <a
                                        href="https://www.facebook.com/people/Tr%C6%B0%E1%BB%9Dng-Trung-C%E1%BA%A5p-Mi%E1%BB%81n-T%C3%A2y/61558944491398/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="fb-btn fb-btn-follow"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <line x1="20" y1="8" x2="20" y2="14" />
                                            <line x1="23" y1="11" x2="17" y2="11" />
                                        </svg>
                                        Theo dõi
                                    </a>
                                </div>
                            </div>
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
