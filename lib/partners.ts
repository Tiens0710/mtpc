/**
 * Danh sách đối tác chiến lược của MTPC.
 *
 * ⚠️ ĐÃ FIX: Trước đây website có các entry "Đối tác 2", "Đối tác 3" với
 * cùng 1 logo `ctump.jpg` lặp lại 3 lần — đây là placeholder. Đã loại.
 *
 * Quy tắc thêm đối tác:
 *   1. Phải có logo chất lượng cao (PNG transparent ≥ 200x200 hoặc SVG)
 *   2. Phải có sự đồng ý của đối tác về việc dùng logo
 *   3. URL trỏ về website thật của đối tác (mở tab mới)
 *   4. Phân loại đúng type để filter trên UI
 */

export type PartnerType =
  | 'university' // Trường đại học liên kết liên thông
  | 'hospital' // Bệnh viện thực tập
  | 'enterprise' // Doanh nghiệp tuyển dụng SV
  | 'association' // Hiệp hội nghề
  | 'government'; // Cơ quan nhà nước

export type Partner = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  url?: string;
  type: PartnerType;
  description?: string;
  /** Phạm vi hợp tác */
  scope?: string;
  /** Năm bắt đầu hợp tác */
  since?: number;
};

// ============================================================
// ĐỐI TÁC HIỆN CÓ (đã xác minh)
// ============================================================
export const partners: Partner[] = [
  {
    id: 'ctump',
    name: 'Trường Đại học Y Dược Cần Thơ',
    shortName: 'CTUMP',
    logo: '/partners/ctump.jpg',
    url: 'https://ctump.edu.vn',
    type: 'university',
    description: 'Đối tác liên thông và đào tạo chuyên sâu ngành y dược',
    scope: 'Liên thông trung cấp → đại học',
  },

  // ============================================================
  // __TODO__ Hiệp thêm đối tác thật ở đây
  // ============================================================
];

// ============================================================
// HELPER
// ============================================================
export const partnersByType = {
  university: partners.filter((p) => p.type === 'university'),
  hospital: partners.filter((p) => p.type === 'hospital'),
  enterprise: partners.filter((p) => p.type === 'enterprise'),
  association: partners.filter((p) => p.type === 'association'),
  government: partners.filter((p) => p.type === 'government'),
} as const;

/**
 * Nếu chưa có đủ đối tác thật, KHÔNG render section đối tác trên UI.
 * Tránh tình trạng phải dùng placeholder gây mất uy tín.
 */
export const MIN_PARTNERS_TO_SHOW = 3;
export const shouldShowPartnersSection = partners.length >= MIN_PARTNERS_TO_SHOW;