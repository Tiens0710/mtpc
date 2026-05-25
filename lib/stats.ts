/**
 * Số liệu thống kê (stats) hiển thị trên trang Tuyển sinh & trang chủ.
 *
 * ⚠️ NGUYÊN TẮC: Mọi số liệu PHẢI có nguồn / năm khảo sát.
 * KHÔNG hiển thị số "tô vẽ" không có cơ sở.
 *
 * Nếu chưa có số thật → set `value: null` và section sẽ ẨN tự động.
 */

export type Stat = {
  /** Giá trị hiển thị, null = ẩn section này */
  value: string | number | null;
  /** Nhãn tiếng Việt */
  label: string;
  /** Nguồn / phương pháp tính - hiển thị tooltip */
  source?: string;
  /** Icon name (nếu dùng Material Symbols) */
  icon?: string;
};

export const stats: Record<string, Stat> = {
  yearsOfOperation: {
    // 2010 → 2026 = 16 năm, làm tròn xuống "15+" để an toàn
    value: '15+',
    label: 'Năm hình thành & phát triển',
    source: 'Tính từ QĐ thành lập 3096/2010 ngày 15/11/2010',
    icon: 'workspace_premium',
  },

  programs: {
    value: 5,
    label: 'Ngành đào tạo trung cấp',
    source: 'Y sĩ, Dược, Điều dưỡng, Hộ sinh, CNTT-AI',
    icon: 'school',
  },

  // ============================================================
  // CÁC STAT CẦN DỮ LIỆU THẬT TỪ TRƯỜNG
  // Set value: null → section sẽ KHÔNG hiển thị (an toàn)
  // ============================================================

  employmentRate: {
    value: null, // __TODO__ điền tỷ lệ thật + năm khảo sát
    label: 'Sinh viên có việc làm sau tốt nghiệp',
    source: 'Khảo sát SV tốt nghiệp khóa __, N=__',
    icon: 'work',
  },

  partnersCount: {
    value: null, // __TODO__ chỉ enable khi có đủ đối tác thật
    label: 'Đối tác doanh nghiệp & bệnh viện',
    source: 'Tính đến __/2026',
    icon: 'handshake',
  },

  studentsTotal: {
    value: null, // __TODO__ tổng số SV đã đào tạo
    label: 'Sinh viên đã tốt nghiệp',
    source: 'Tổng từ năm thành lập đến nay',
    icon: 'groups',
  },

  qualityCert: {
    value: null, // __TODO__ chỉ enable nếu có ISO/VCCI thật
    label: 'Chứng nhận chất lượng',
    source: 'Số hiệu cert: __',
    icon: 'verified',
  },
};

/**
 * Chỉ trả về các stat CÓ giá trị (value !== null) để render.
 * Filter null tự động → không cần if-else trong JSX.
 */
export const visibleStats = Object.entries(stats)
  .filter(([_, stat]) => stat.value !== null)
  .map(([key, stat]) => ({ key, ...stat }));

/**
 * Bao nhiêu stat đang có giá trị?
 * Dùng để quyết định layout: 2 stat → grid-cols-2, 4 stat → grid-cols-4...
 */
export const visibleStatsCount = visibleStats.length;