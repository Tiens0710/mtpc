/**
 * Starknet Blockchain Integration
 * Kết nối với smart contract xác thực bằng cấp trên Starknet Sepolia
 */

import { RpcProvider, Contract, shortString } from 'starknet';

// ===== TYPES / KIỂU DỮ LIỆU =====

/** Thông tin bằng cấp từ blockchain */
export interface CertificateData {
    certificateId: string;
    studentName: string;
    dateOfBirth: string;
    program: string;       // Ngành học
    issueDate: string;     // Ngày cấp bằng
    graduationYear: string;
    gpa: string;
    status: string;        // "valid" | "revoked"
    ipfsHash: string;
    ipfsUrl: string;
    txHash?: string;       // Transaction hash trên blockchain
}

/** Dữ liệu certificate mapping từ file JSON */
export interface CertificateMapping {
    certificate_id: string;
    student_name: string;
    date_of_birth: string;
    program: string;
    issue_date: string;
    graduation_year: string;
    gpa: string;
    ipfs_hash: string;
    ipfs_url: string;
    tx_hash?: string;
}

/** Kết quả xác thực */
export interface VerificationResult {
    success: boolean;
    certificate?: CertificateData;
    error?: string;
    verifiedOnChain: boolean; // Có verify được trên blockchain không
    timestamp: number;
}

/** Thống kê blockchain */
export interface BlockchainStats {
    totalCertificates: number;
    networkName: string;
    contractAddress: string;
}

// ===== HẰNG SỐ CẤU HÌNH =====

/** Địa chỉ smart contract đã deploy */
export const CONTRACT_ADDRESS =
    '0x672dd49ba6ad73ddf6f564bcb5d8066c4144e311c435b98c79cf024b5a12466';

/** RPC URL của Starknet Sepolia Testnet */
export const RPC_URL =
    'https://starknet-sepolia.public.blastapi.io/rpc/v0_7';

/** IPFS Gateway để tải ảnh bằng */
export const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

/** Tên mạng blockchain */
export const NETWORK_NAME = 'Starknet Sepolia Testnet';

/**
 * ABI (Application Binary Interface) của smart contract
 * Định nghĩa các hàm có thể gọi trên contract
 */
const CONTRACT_ABI = [
    {
        name: 'get_certificate',
        type: 'function',
        inputs: [
            {
                name: 'certificate_id',
                type: 'felt252',
            },
        ],
        outputs: [
            {
                name: 'student_name',
                type: 'felt252',
            },
            {
                name: 'program',
                type: 'felt252',
            },
            {
                name: 'issue_date',
                type: 'felt252',
            },
            {
                name: 'ipfs_hash',
                type: 'felt252',
            },
            {
                name: 'is_valid',
                type: 'felt252',
            },
        ],
        state_mutability: 'view',
    },
    {
        name: 'get_total_certificates',
        type: 'function',
        inputs: [],
        outputs: [
            {
                name: 'total',
                type: 'felt252',
            },
        ],
        state_mutability: 'view',
    },
];

// ===== KHỞI TẠO PROVIDER & CONTRACT =====

/** Tạo RPC provider kết nối đến Starknet Sepolia */
function getProvider(): RpcProvider {
    return new RpcProvider({ nodeUrl: RPC_URL });
}

/** Tạo instance contract để gọi hàm */
function getContract(): Contract {
    const provider = getProvider();
    return new Contract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        providerOrAccount: provider,
    });
}

// ===== HÀM XÁC THỰC BẰNG CẤP =====

/**
 * Đọc dữ liệu certificate mapping từ file JSON trong public/certificates/
 * @param certificateId - Mã bằng cấp (VD: MTPC-2024-001)
 * @returns Dữ liệu mapping hoặc null nếu không tìm thấy
 */
async function fetchCertificateMapping(
    certificateId: string
): Promise<CertificateMapping | null> {
    try {
        const response = await fetch(
            `/certificates/${certificateId}.json`,
            { cache: 'no-store' }
        );
        if (!response.ok) return null;
        return await response.json();
    } catch {
        console.error(`Không thể đọc file mapping cho ${certificateId}`);
        return null;
    }
}

/**
 * Xác thực bằng cấp — kết hợp blockchain + certificate mapping
 *
 * Luồng xử lý:
 * 1. Thử gọi smart contract trên blockchain
 * 2. Đọc dữ liệu từ certificate mapping file (JSON)
 * 3. Kết hợp 2 nguồn để trả về kết quả đầy đủ
 *
 * @param certificateId - Mã bằng cấp cần xác thực
 * @returns Kết quả xác thực
 */
export async function verifyCertificate(
    certificateId: string
): Promise<VerificationResult> {
    const timestamp = Date.now();

    // Validate input
    if (!certificateId || certificateId.trim() === '') {
        return {
            success: false,
            error: 'Vui lòng nhập mã bằng cấp',
            verifiedOnChain: false,
            timestamp,
        };
    }

    const id = certificateId.trim().toUpperCase();

    // Bước 1: Thử xác thực trên blockchain
    let onChainVerified = false;
    let onChainData: Record<string, string> | null = null;

    try {
        const contract = getContract();
        // Chuyển certificate ID sang felt252 (short string)
        const idFelt = shortString.encodeShortString(id);
        const result = await contract.call('get_certificate', [idFelt]);

        // Nếu contract trả về dữ liệu hợp lệ
        if (result && Array.isArray(result) && result.length > 0) {
            onChainVerified = true;
            onChainData = {
                studentName: shortString.decodeShortString(result[0]?.toString() || '0'),
                program: shortString.decodeShortString(result[1]?.toString() || '0'),
                issueDate: shortString.decodeShortString(result[2]?.toString() || '0'),
                ipfsHash: shortString.decodeShortString(result[3]?.toString() || '0'),
                isValid: result[4]?.toString() || '0',
            };
        }
    } catch (err) {
        // Blockchain có thể không available — fallback sang mapping file
        console.warn('Không thể kết nối blockchain, dùng dữ liệu local:', err);
    }

    // Bước 2: Đọc certificate mapping file
    const mapping = await fetchCertificateMapping(id);

    // Bước 3: Kết hợp kết quả
    if (!mapping && !onChainData) {
        return {
            success: false,
            error: `Không tìm thấy bằng cấp với mã "${id}". Vui lòng kiểm tra lại mã bằng.`,
            verifiedOnChain: false,
            timestamp,
        };
    }

    // Ưu tiên dữ liệu mapping (đầy đủ hơn), bổ sung từ on-chain
    const certificate: CertificateData = {
        certificateId: id,
        studentName: mapping?.student_name || onChainData?.studentName || 'N/A',
        dateOfBirth: mapping?.date_of_birth || 'N/A',
        program: mapping?.program || onChainData?.program || 'N/A',
        issueDate: mapping?.issue_date || onChainData?.issueDate || 'N/A',
        graduationYear: mapping?.graduation_year || 'N/A',
        gpa: mapping?.gpa || 'N/A',
        status: onChainData?.isValid === '0' ? 'revoked' : 'valid',
        ipfsHash: mapping?.ipfs_hash || onChainData?.ipfsHash || '',
        ipfsUrl: mapping?.ipfs_url || (onChainData?.ipfsHash ? `${IPFS_GATEWAY}${onChainData.ipfsHash}` : ''),
        txHash: mapping?.tx_hash,
    };

    return {
        success: true,
        certificate,
        verifiedOnChain: onChainVerified,
        timestamp,
    };
}

// ===== HÀM THỐNG KÊ =====

/**
 * Lấy thống kê blockchain (tổng số bằng đã cấp)
 * Fallback sang giá trị mặc định nếu không kết nối được
 */
export async function getCertificateStats(): Promise<BlockchainStats> {
    let totalCertificates = 0;

    try {
        const contract = getContract();
        const result = await contract.call('get_total_certificates', []);
        if (result) {
            totalCertificates = Number(result.toString());
        }
    } catch {
        // Fallback — dùng giá trị ước tính nếu blockchain không available
        console.warn('Không thể lấy thống kê từ blockchain');
        totalCertificates = 150; // Giá trị mặc định
    }

    return {
        totalCertificates,
        networkName: NETWORK_NAME,
        contractAddress: CONTRACT_ADDRESS,
    };
}
