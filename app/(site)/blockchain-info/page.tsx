'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCertificateStats, NETWORK_NAME, CONTRACT_ADDRESS, type BlockchainStats } from '../../lib/starknet';
import './blockchain-info.css';

/**
 * Trang thông tin blockchain — giải thích công nghệ và hướng dẫn xác thực bằng cấp
 */
export default function BlockchainInfoPage() {
    // State quản lý FAQ accordion
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // State cho tab hướng dẫn (sinh viên / nhà tuyển dụng)
    const [activeTab, setActiveTab] = useState<'student' | 'employer'>('student');

    // Thống kê blockchain
    const [stats, setStats] = useState<BlockchainStats | null>(null);

    // Lấy thống kê khi trang load
    useEffect(() => {
        getCertificateStats().then(setStats);
    }, []);

    /** Toggle mở/đóng FAQ */
    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Dữ liệu FAQ
    const faqItems = [
        {
            question: 'Blockchain là gì?',
            answer: 'Blockchain là một công nghệ sổ cái phân tán, nơi dữ liệu được lưu trữ trên nhiều máy tính trong mạng lưới. Mỗi khối dữ liệu được liên kết với khối trước đó bằng mã hóa, tạo thành một chuỗi (chain) không thể thay đổi. Điều này đảm bảo tính minh bạch và an toàn tuyệt đối cho dữ liệu.',
        },
        {
            question: 'Tại sao dùng blockchain cho bằng cấp?',
            answer: 'Bằng cấp trên blockchain không thể bị giả mạo, sửa đổi hoặc xóa bỏ. Nhà tuyển dụng có thể xác minh tức thì mà không cần liên hệ trường. Sinh viên có thể chứng minh bằng cấp của mình ở bất kỳ đâu trên thế giới, chỉ cần mã bằng cấp.',
        },
        {
            question: 'Starknet là gì?',
            answer: 'Starknet là một layer-2 scaling solution trên Ethereum, sử dụng công nghệ STARK proofs. Starknet cho phép xử lý giao dịch nhanh hơn và rẻ hơn so với Ethereum mainnet, đồng thời vẫn đảm bảo an toàn nhờ tính bảo mật của Ethereum.',
        },
        {
            question: 'Chi phí xác thực bằng có tốn phí không?',
            answer: 'Hoàn toàn miễn phí! Việc xác thực bằng cấp chỉ là đọc dữ liệu từ blockchain (view function), không tạo giao dịch mới nên không phát sinh phí gas.',
        },
        {
            question: 'Làm sao để biết bằng cấp của tôi đã được đưa lên blockchain?',
            answer: 'Sau khi tốt nghiệp, trường sẽ cấp cho bạn mã bằng cấp (VD: MTPC-2024-001). Bạn có thể dùng mã này để xác thực trên trang "Xác thực bằng cấp" của website trường.',
        },
        {
            question: 'IPFS là gì? Tại sao ảnh bằng lưu trên IPFS?',
            answer: 'IPFS (InterPlanetary File System) là hệ thống lưu trữ phân tán. Ảnh bằng cấp được lưu trên IPFS để đảm bảo file không bị mất, không bị thay đổi, và có thể truy cập từ bất kỳ đâu thông qua content hash duy nhất.',
        },
    ];

    /** Rút gọn address */
    const shortenAddress = (addr: string) => {
        return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bc-hero">
                <div className="bc-hero-content">
                    <span className="bc-hero-icon">⛓️</span>
                    <h1>Công nghệ Blockchain trong Giáo dục</h1>
                    <p>
                        Trường Trung cấp Miền Tây tiên phong ứng dụng công nghệ blockchain Starknet
                        để xác thực bằng cấp — đảm bảo minh bạch, an toàn và không thể giả mạo.
                    </p>
                    <Link href="/verify-certificate" className="bc-hero-cta">
                        🔐 Xác thực bằng cấp ngay
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Stats */}
            <div className="bc-container bc-stats">
                <div className="bc-stats-grid">
                    <div className="bc-stat-card">
                        <span className="bc-stat-icon">📜</span>
                        <div>
                            <span className="bc-stat-value">{stats?.totalCertificates ?? '—'}</span>
                            <span className="bc-stat-label">Bằng cấp đã cấp</span>
                        </div>
                    </div>
                    <div className="bc-stat-card">
                        <span className="bc-stat-icon">🌐</span>
                        <div>
                            <span className="bc-stat-value">{NETWORK_NAME.split(' ')[0]}</span>
                            <span className="bc-stat-label">Mạng blockchain</span>
                        </div>
                    </div>
                    <div className="bc-stat-card">
                        <span className="bc-stat-icon">🔒</span>
                        <div>
                            <span className="bc-stat-value">100%</span>
                            <span className="bc-stat-label">Bảo mật & minh bạch</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bc-container">
                {/* Giải thích blockchain */}
                <section className="bc-section">
                    <span className="bc-section-tag">🔗 Công nghệ</span>
                    <h2>Blockchain hoạt động như thế nào?</h2>
                    <p className="bc-section-desc">
                        Blockchain là sổ cái kỹ thuật số phân tán, nơi mỗi thông tin bằng cấp được mã hóa
                        và lưu trữ vĩnh viễn trên mạng lưới. Không một ai có thể sửa đổi hay xóa bỏ dữ liệu.
                    </p>

                    <div className="bc-features">
                        <div className="bc-feature-card">
                            <span className="bc-feature-icon">🛡️</span>
                            <h3>Không thể giả mạo</h3>
                            <p>Dữ liệu trên blockchain được mã hóa bằng thuật toán cryptographic, không thể bị sửa đổi hay giả mạo.</p>
                        </div>
                        <div className="bc-feature-card">
                            <span className="bc-feature-icon">⚡</span>
                            <h3>Xác thực tức thì</h3>
                            <p>Nhà tuyển dụng có thể xác minh bằng cấp chỉ trong vài giây, không cần liên hệ trường.</p>
                        </div>
                        <div className="bc-feature-card">
                            <span className="bc-feature-icon">🌍</span>
                            <h3>Truy cập toàn cầu</h3>
                            <p>Bằng cấp có thể được xác thực từ bất kỳ đâu trên thế giới, chỉ cần kết nối internet.</p>
                        </div>
                        <div className="bc-feature-card">
                            <span className="bc-feature-icon">💰</span>
                            <h3>Miễn phí hoàn toàn</h3>
                            <p>Việc xác thực bằng cấp không tốn bất kỳ chi phí nào cho sinh viên hay nhà tuyển dụng.</p>
                        </div>
                    </div>
                </section>

                {/* Hướng dẫn */}
                <section className="bc-section">
                    <span className="bc-section-tag">📖 Hướng dẫn</span>
                    <h2>Cách xác thực bằng cấp</h2>
                    <p className="bc-section-desc">
                        Chọn vai trò của bạn để xem hướng dẫn phù hợp.
                    </p>

                    {/* Tabs */}
                    <div className="bc-tabs" role="tablist">
                        <button
                            className={`bc-tab ${activeTab === 'student' ? 'active' : ''}`}
                            onClick={() => setActiveTab('student')}
                            role="tab"
                            aria-selected={activeTab === 'student'}
                        >
                            🎓 Sinh viên
                        </button>
                        <button
                            className={`bc-tab ${activeTab === 'employer' ? 'active' : ''}`}
                            onClick={() => setActiveTab('employer')}
                            role="tab"
                            aria-selected={activeTab === 'employer'}
                        >
                            🏢 Nhà tuyển dụng
                        </button>
                    </div>

                    {/* Tab Content — Sinh viên */}
                    {activeTab === 'student' && (
                        <div className="bc-steps" role="tabpanel">
                            <div className="bc-step">
                                <div className="bc-step-number">1</div>
                                <div className="bc-step-content">
                                    <h3>Lấy mã bằng cấp</h3>
                                    <p>Sau khi tốt nghiệp, bạn sẽ nhận được mã bằng cấp (VD: MTPC-2024-001) được in trên bằng tốt nghiệp và thông báo qua email.</p>
                                </div>
                            </div>
                            <div className="bc-step">
                                <div className="bc-step-number">2</div>
                                <div className="bc-step-content">
                                    <h3>Truy cập trang xác thực</h3>
                                    <p>Vào website trường, nhấn nút &quot;🔐 Xác thực bằng&quot; trên thanh menu hoặc truy cập trực tiếp trang xác thực bằng cấp.</p>
                                </div>
                            </div>
                            <div className="bc-step">
                                <div className="bc-step-number">3</div>
                                <div className="bc-step-content">
                                    <h3>Nhập mã và xác thực</h3>
                                    <p>Nhập mã bằng cấp vào ô tìm kiếm, nhấn &quot;Xác thực&quot;. Hệ thống sẽ kiểm tra trên blockchain và hiển thị kết quả trong vài giây.</p>
                                </div>
                            </div>
                            <div className="bc-step">
                                <div className="bc-step-number">4</div>
                                <div className="bc-step-content">
                                    <h3>Chia sẻ kết quả</h3>
                                    <p>Bạn có thể chụp màn hình kết quả hoặc gửi mã bằng cho nhà tuyển dụng để họ tự xác minh.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab Content — Nhà tuyển dụng */}
                    {activeTab === 'employer' && (
                        <div className="bc-steps" role="tabpanel">
                            <div className="bc-step">
                                <div className="bc-step-number">1</div>
                                <div className="bc-step-content">
                                    <h3>Yêu cầu mã bằng cấp</h3>
                                    <p>Yêu cầu ứng viên cung cấp mã bằng cấp blockchain (có dạng MTPC-XXXX-XXX) khi nộp hồ sơ ứng tuyển.</p>
                                </div>
                            </div>
                            <div className="bc-step">
                                <div className="bc-step-number">2</div>
                                <div className="bc-step-content">
                                    <h3>Truy cập trang xác thực</h3>
                                    <p>Vào trang xác thực bằng cấp của Trường Trung cấp Miền Tây, nhập mã bằng để kiểm tra.</p>
                                </div>
                            </div>
                            <div className="bc-step">
                                <div className="bc-step-number">3</div>
                                <div className="bc-step-content">
                                    <h3>Kiểm tra thông tin</h3>
                                    <p>Đối chiếu thông tin hiển thị (họ tên, ngành học, năm tốt nghiệp) với hồ sơ ứng viên. Kết quả được verify trực tiếp từ blockchain.</p>
                                </div>
                            </div>
                            <div className="bc-step">
                                <div className="bc-step-number">4</div>
                                <div className="bc-step-content">
                                    <h3>Xem chi tiết kỹ thuật</h3>
                                    <p>Bạn có thể kiểm tra transaction hash trên Starkscan explorer để xác minh độc lập. Liên hệ trường nếu cần hỗ trợ thêm.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* FAQ */}
                <section className="bc-section">
                    <span className="bc-section-tag">❓ FAQ</span>
                    <h2>Câu hỏi thường gặp</h2>
                    <p className="bc-section-desc">
                        Giải đáp các thắc mắc phổ biến về xác thực bằng cấp blockchain.
                    </p>

                    <div className="bc-faq-list">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bc-faq-item">
                                <button
                                    className="bc-faq-question"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openFaq === index}
                                >
                                    <span>{item.question}</span>
                                    <svg
                                        className={`bc-faq-arrow ${openFaq === index ? 'open' : ''}`}
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                <div className={`bc-faq-answer ${openFaq === index ? 'open' : ''}`}>
                                    <div className="bc-faq-answer-inner">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Thông tin kỹ thuật */}
                <section className="bc-section">
                    <span className="bc-section-tag">⚙️ Kỹ thuật</span>
                    <h2>Thông tin Smart Contract</h2>
                    <p className="bc-section-desc">
                        Chi tiết kỹ thuật cho các developer muốn tìm hiểu thêm.
                    </p>

                    <div className="bc-features">
                        <div className="bc-feature-card">
                            <span className="bc-feature-icon">📋</span>
                            <h3>Contract Address</h3>
                            <p style={{ wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                {shortenAddress(CONTRACT_ADDRESS)}
                            </p>
                        </div>
                        <div className="bc-feature-card">
                            <span className="bc-feature-icon">🌐</span>
                            <h3>Network</h3>
                            <p>{NETWORK_NAME}</p>
                        </div>
                        <div className="bc-feature-card">
                            <span className="bc-feature-icon">🔍</span>
                            <h3>Explorer</h3>
                            <p>
                                <a
                                    href={`https://sepolia.starkscan.co/contract/${CONTRACT_ADDRESS}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--primary-green)', textDecoration: 'none', fontWeight: 600 }}
                                >
                                    Xem trên Starkscan →
                                </a>
                            </p>
                        </div>
                        <div className="bc-feature-card">
                            <span className="bc-feature-icon">📦</span>
                            <h3>IPFS Gateway</h3>
                            <p style={{ fontSize: '0.85rem' }}>Pinata Cloud Gateway</p>
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <div className="bc-cta-banner">
                    <h2>Sẵn sàng xác thực bằng cấp?</h2>
                    <p>Nhập mã bằng cấp để kiểm tra ngay trên blockchain Starknet</p>
                    <Link href="/verify-certificate" className="bc-cta-btn">
                        🔐 Xác thực ngay
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    );
}
