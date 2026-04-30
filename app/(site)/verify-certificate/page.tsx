"use client";

import { useState, type FormEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { verifyCertificate, type VerificationResult, IPFS_GATEWAY, NETWORK_NAME, CONTRACT_ADDRESS } from '../../lib/starknet';
const NFT_CONTRACT = '0x07d8d2ef74a887a268a5b4793db7d36e2ae229651c641520a05646ad923081cb';
import './verify-certificate.css';

/**
 * Trang xác thực bằng cấp — cho phép nhập mã bằng để kiểm tra trên blockchain
 */
export default function VerifyCertificatePage() {
    // State quản lý form và kết quả
    const [certificateId, setCertificateId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<VerificationResult | null>(null);
    // NFT preview state when opened with ?contract=&tokenId=
    const searchParams = useSearchParams();
    const contractParam = searchParams?.get('contract');
    const tokenIdParam = searchParams?.get('tokenId');

    const [nftPreview, setNftPreview] = useState<{
        name?: string;
        description?: string;
        image?: string;
        attributes?: Record<string, string>;
        voyagerUrl?: string;
        owner?: string;
    } | null>(null);

    /**
     * Xử lý submit form xác thực
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!certificateId.trim() || isLoading) return;

        setIsLoading(true);
        setNftPreview(null);
        setResult(null);

        try {
            const apiUrl = `/api/metadata?contract=${encodeURIComponent(NFT_CONTRACT)}&tokenId=${encodeURIComponent(certificateId.trim())}`;
            const res = await fetch(apiUrl);
            const json = await res.json();
            if (json.success) {
                setNftPreview({
                    name: json.name,
                    description: json.description,
                    image: json.image,
                    attributes: json.attributes,
                    voyagerUrl: json.voyagerUrl,
                    owner: json.owner,
                });
            } else {
                setResult({
                    success: false,
                    error: `Không tìm thấy token #${certificateId.trim()} trên blockchain.`,
                    verifiedOnChain: false,
                    timestamp: Date.now(),
                });
            }
        } catch {
            setResult({
                success: false,
                error: 'Đã xảy ra lỗi khi xác thực. Vui lòng thử lại sau.',
                verifiedOnChain: false,
                timestamp: Date.now(),
            });
        } finally {
            setIsLoading(false);
        }
    };

    // If opened with contract+tokenId, try fetch Voyager page and parse basic metadata/image
    useEffect(() => {
        if (!contractParam || !tokenIdParam) return;

        const apiUrl = `/api/metadata?contract=${encodeURIComponent(contractParam)}&tokenId=${encodeURIComponent(
            tokenIdParam
        )}`;

        async function fetchMetadata() {
            try {
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    setNftPreview({ voyagerUrl: `https://sepolia.voyager.online/nft/${contractParam}/${tokenIdParam}` });
                    return;
                }
                const j = await res.json();
                if (j?.success) {
                    setNftPreview({
                        name: j.name || undefined,
                        description: j.description || undefined,
                        image: j.image || undefined,
                        attributes: j.attributes || undefined,
                        voyagerUrl: j.voyagerUrl,
                        owner: j.owner || undefined,
                    });
                } else {
                    setNftPreview({ voyagerUrl: j.voyagerUrl || `https://sepolia.voyager.online/nft/${contractParam}/${tokenIdParam}` });
                }
            } catch (err) {
                setNftPreview({ voyagerUrl: `https://sepolia.voyager.online/nft/${contractParam}/${tokenIdParam}` });
            }
        }

        fetchMetadata();
    }, [contractParam, tokenIdParam]);

    /**
     * Rút gọn chuỗi hash để hiển thị
     */
    const shortenHash = (hash: string) => {
        if (hash.length <= 16) return hash;
        return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
    };

    return (
        <>
            {/* Hero Section */}
            <section className="verify-hero">
                <div className="verify-hero-content">
                    <span className="verify-hero-icon" role="img" aria-label="Blockchain">🔗</span>
                    <h1>Xác thực bằng cấp Blockchain</h1>
                    <p>
                        Nhập mã bằng cấp để xác minh tính hợp lệ thông qua
                        công nghệ blockchain Starknet. An toàn, minh bạch và không thể giả mạo.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="verify-main">
                {/* Search Card */}
                <div className="verify-search-card">
                    <form onSubmit={handleSubmit}>
                        <label className="verify-search-label" htmlFor="certificate-id-input">
                            Mã bằng cấp
                        </label>
                        <div className="verify-search-input-group">
                            <input
                                id="certificate-id-input"
                                type="text"
                                className="verify-search-input"
                                placeholder="Nhập mã token của bằng (VD: 1, 2, 3...)"
                                value={certificateId}
                                onChange={(e) => setCertificateId(e.target.value)}
                                disabled={isLoading}
                                autoComplete="off"
                                aria-describedby="search-hint"
                            />
                            <button
                                type="submit"
                                className="verify-search-btn"
                                disabled={isLoading || !certificateId.trim()}
                                aria-label="Xác thực bằng cấp"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                Xác thực
                            </button>
                        </div>
                        <div className="verify-search-hint" id="search-hint">
                            <span>💡</span>
                            <span>Nhập số token NFT (VD: <code>1</code>) được ghi trên bằng cấp của bạn</span>
                        </div>
                    </form>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="verify-loading" role="status" aria-live="polite">
                        <div className="verify-spinner" />
                        <p>Đang xác thực trên blockchain...</p>
                    </div>
                )}

                {/* NFT Preview — from Voyager/on-chain */}
                {nftPreview && (
                    <div className="nft-preview-card">
                        {/* Verified badge */}
                        <div className="nft-verified-banner">
                            <span>✅</span>
                            <span>Bằng cấp hợp lệ — Đã xác thực trên Starknet Sepolia</span>
                            <span className="nft-chain-badge">🔗 On-chain</span>
                        </div>

                        <div className="nft-preview-inner">
                            {/* NFT Image */}
                            <div className="nft-image-wrapper">
                                {nftPreview.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={nftPreview.image}
                                        alt={nftPreview.name || 'NFT'}
                                        className="nft-image"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="nft-image-placeholder">📄</div>
                                )}
                            </div>

                            {/* NFT Info */}
                            <div className="nft-info">
                                <p className="nft-school">TRƯỜNG TRUNG CẤP MIỀN TÂY</p>
                                <h3 className="nft-name">{nftPreview.name || 'MTPC Certificate'}</h3>
                                {nftPreview.description && (
                                    <p className="nft-description">{nftPreview.description}</p>
                                )}

                                {nftPreview.attributes && Object.keys(nftPreview.attributes).length > 0 && (
                                    <div className="nft-attributes">
                                        {Object.entries(nftPreview.attributes).map(([k, v]) => (
                                            <div key={k} className="nft-attr-item">
                                                <span className="nft-attr-label">{k}</span>
                                                <span className="nft-attr-value">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {nftPreview.owner && (
                                    <div className="nft-owner">
                                        <span className="nft-attr-label">Chủ sở hữu bằng</span>
                                        <span className="nft-owner-addr">
                                            {nftPreview.owner.slice(0, 12)}...{nftPreview.owner.slice(-10)}
                                        </span>
                                    </div>
                                )}

                                <div className="nft-actions">
                                    {nftPreview.voyagerUrl && (
                                        <a
                                            href={nftPreview.voyagerUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="nft-voyager-btn"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                            Xem trên Voyager
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {result && !result.success && (
                    <div className="verify-error" role="alert">
                        <span className="verify-error-icon">⚠️</span>
                        <div className="verify-error-content">
                            <h3>Không tìm thấy bằng cấp</h3>
                            <p>{result.error}</p>
                        </div>
                    </div>
                )}

                {/* Certificate Card — Hiển thị khi xác thực thành công */}
                {result && result.success && result.certificate && (
                    <div className="cert-card">
                        {/* Status Banner */}
                        <div className={`cert-status-banner ${result.certificate.status}`}>
                            <span className="cert-status-icon">
                                {result.certificate.status === 'valid' ? '✅' : '❌'}
                            </span>
                            <span className="cert-status-text">
                                {result.certificate.status === 'valid'
                                    ? 'Bằng cấp hợp lệ — Đã xác thực thành công'
                                    : 'Bằng cấp đã bị thu hồi'}
                            </span>
                            {result.verifiedOnChain && (
                                <span className="cert-status-chain">
                                    🔗 On-chain verified
                                </span>
                            )}
                        </div>

                        {/* Certificate Body */}
                        <div className="cert-body">
                            <div className="cert-content-wrapper">
                                {/* Thông tin bằng */}
                                <div className="cert-info">
                                    <p className="cert-school-name">TRƯỜNG TRUNG CẤP MIỀN TÂY</p>
                                    <h2 className="cert-title">Bằng tốt nghiệp Trung cấp</h2>

                                    <div className="cert-details">
                                        <div className="cert-detail-item">
                                            <span className="cert-detail-label">Mã bằng</span>
                                            <span className="cert-detail-value">{result.certificate.certificateId}</span>
                                        </div>
                                        <div className="cert-detail-item">
                                            <span className="cert-detail-label">Họ và tên</span>
                                            <span className="cert-detail-value">{result.certificate.studentName}</span>
                                        </div>
                                        <div className="cert-detail-item">
                                            <span className="cert-detail-label">Ngày sinh</span>
                                            <span className="cert-detail-value">{result.certificate.dateOfBirth}</span>
                                        </div>
                                        <div className="cert-detail-item">
                                            <span className="cert-detail-label">Ngành đào tạo</span>
                                            <span className="cert-detail-value">{result.certificate.program}</span>
                                        </div>
                                        <div className="cert-detail-item">
                                            <span className="cert-detail-label">Ngày cấp bằng</span>
                                            <span className="cert-detail-value">{result.certificate.issueDate}</span>
                                        </div>
                                        <div className="cert-detail-item">
                                            <span className="cert-detail-label">Năm tốt nghiệp</span>
                                            <span className="cert-detail-value">{result.certificate.graduationYear}</span>
                                        </div>
                                        <div className="cert-detail-item">
                                            <span className="cert-detail-label">Điểm trung bình</span>
                                            <span className="cert-detail-value">{result.certificate.gpa}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Ảnh bằng từ IPFS */}
                                <div className="cert-image-wrapper">
                                    {result.certificate.ipfsUrl ? (
                                        <img
                                            src={result.certificate.ipfsUrl}
                                            alt={`Bằng cấp của ${result.certificate.studentName}`}
                                            className="cert-image"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                const placeholder = target.nextElementSibling as HTMLElement;
                                                if (placeholder) placeholder.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div
                                        className="cert-image-placeholder"
                                        style={{ display: result.certificate.ipfsUrl ? 'none' : 'flex' }}
                                    >
                                        <span>📄</span>
                                        <span>Ảnh bằng cấp</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer — Thông tin blockchain */}
                            <div className="cert-footer">
                                <div className="cert-footer-item">
                                    <span>🌐</span>
                                    <span>{NETWORK_NAME}</span>
                                </div>
                                {result.certificate.ipfsHash && (
                                    <div className="cert-footer-item">
                                        <span>📦</span>
                                        <span>IPFS: {shortenHash(result.certificate.ipfsHash)}</span>
                                    </div>
                                )}
                                {result.certificate.txHash && (
                                    <div className="cert-footer-item">
                                        <span>🔗</span>
                                        <a
                                            href={`https://sepolia.starkscan.co/tx/${result.certificate.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cert-tx-link"
                                            aria-label="Xem transaction trên Starkscan"
                                        >
                                            TX: {shortenHash(result.certificate.txHash)}
                                        </a>
                                    </div>
                                )}
                                <div className="cert-footer-item">
                                    <span>📋</span>
                                    <span>Contract: {shortenHash(CONTRACT_ADDRESS)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Banner — Link đến trang blockchain info */}
                <div className="verify-info-banner">
                    <span className="verify-info-banner-icon">🎓</span>
                    <div className="verify-info-banner-content">
                        <h3>Tìm hiểu thêm về xác thực blockchain</h3>
                        <p>
                            Công nghệ blockchain giúp bằng cấp không thể bị giả mạo,
                            nhà tuyển dụng có thể xác minh ngay lập tức.
                        </p>
                        <Link href="/blockchain-info" className="verify-info-banner-link">
                            Xem hướng dẫn chi tiết
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
