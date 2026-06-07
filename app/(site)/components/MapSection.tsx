'use client';

import { siteConfig } from '@/lib/site-config';

export default function MapSection() {
    const { address, contact } = siteConfig;

    return (
        <section className="map-section">
            <div className="map-container">
                {/* Header */}
                <div className="map-header">
                    <h2 className="map-title">
                        Liên hệ
                        <span className="map-title-accent"> với chúng tôi</span>
                    </h2>
                    <p className="map-subtitle">
                        Trường Trung cấp Miền Tây — địa chỉ đào tạo uy tín tại Cần Thơ
                    </p>
                </div>

                <div className="map-content">
                    {/* Map */}
                    <div className="map-embed">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3!2d105.7609!3d10.0417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAyJzMwLjEiTiAxMDXCsDQ1JzM5LjIiRQ!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '16px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Vị trí Trường Trung cấp Miền Tây"
                        />
                    </div>

                    {/* Info cards */}
                    <div className="map-info">
                        <div className="map-info-card">
                            <div className="map-info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="map-info-title">Địa chỉ</h4>
                                <p className="map-info-text">{address.full}</p>
                            </div>
                        </div>

                        <div className="map-info-card">
                            <div className="map-info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="map-info-title">Hotline tuyển sinh</h4>
                                <p className="map-info-text">{contact.zaloOA.number}</p>
                            </div>
                        </div>

                        <div className="map-info-card">
                            <div className="map-info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="map-info-title">Giờ làm việc</h4>
                                <p className="map-info-text">{contact.workingHours.weekday}</p>
                            </div>
                        </div>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${address.full}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="adm-cta-btn"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                <polygon points="3 11 22 2 13 21 11 13 3 11" />
                            </svg>
                            Chỉ đường tới trường
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
