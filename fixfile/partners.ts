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
  //
  // Đề xuất các nhóm cần bổ sung để có trust signal đầy đủ:
  //   1. Bệnh viện đối tác (cho SV thực tập): BV Đa khoa TP Cần Thơ,
  //      BV Đa khoa Trung ương Cần Thơ, BV ĐK quận Ninh Kiều...
  //   2. Nhà thuốc/chuỗi dược: Long Châu, Pharmacity, An Khang...
  //   3. Doanh nghiệp IT: FPT, các công ty IT Cần Thơ
  //   4. Cơ quan nhà nước: Sở Y tế Cần Thơ, Sở LĐTBXH Cần Thơ
  //   5. Quân đội/Công an (đối với chương trình BĐXN)
  //
  // Ví dụ template để Hiệp thêm:
  /*
  {
    id: 'bv-dk-can-tho',
    name: 'Bệnh viện Đa khoa Thành phố Cần Thơ',
    shortName: 'BV ĐK Cần Thơ',
    logo: '/partners/bv-dk-ct.png',
    url: 'https://bvdkct.com.vn',
    type: 'hospital',
    description: 'Cơ sở thực tập chính cho SV Y sĩ, Điều dưỡng',
    scope: 'Thực tập lâm sàng',
    since: 2015,
  },
  */
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
