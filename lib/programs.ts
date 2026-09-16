/**
 * Dữ liệu các ngành đào tạo của Trường Trung cấp Miền Tây.
 *
 * ⚠️ ĐÃ SỬA: Loại bỏ Cơ khí, Điện tử, Thương mại điện tử (không phải ngành
 * trường đang đào tạo). Bổ sung Hộ sinh và đổi "TMĐT" → "CNTT-AI".
 *
 * Theo dữ liệu trường: 5 ngành trung cấp chính + chương trình sơ cấp.
 */

export type ProgramCategory = 'y-te' | 'cong-nghe' | 'dich-vu';
export type ProgramLevel = 'trung-cap' | 'so-cap';

export type Program = {
  /** Slug dùng trong URL: /dao-tao/{slug} */
  slug: string;
  /** Mã ngành chính thức (theo Thông tư Bộ chủ quản) */
  code: string;
  /** Tên đầy đủ của ngành */
  name: string;
  /** Tên gọi ngắn dùng trong nav/breadcrumb */
  shortName: string;
  category: ProgramCategory;
  level: ProgramLevel;
  /** Mô tả ngắn cho card list */
  description: string;
  /** Hiển thị dạng "2 năm" hoặc "3 - 6 tháng" */
  duration: string;
  /** Số tháng (cho việc filter/sort) */
  durationMonths: number;
  /** Bằng cấp sau khi hoàn thành */
  certificate: string;
  /** Chỉ tiêu tuyển mỗi năm */
  enrollment: number;
  /** Học phí mỗi năm (VND) */
  tuitionPerYear: number;
  /** Ưu đãi (nếu có) */
  tuitionNote?: string;
  /** Highlights bullet để show ở card */
  highlights: string[];
  /** Đường nghề nghiệp đầu ra */
  careerPaths: string[];
  /** Đường dẫn ảnh đại diện */
  image: string;
};

// ============================================================
// 5 NGÀNH TRUNG CẤP CHÍNH (chính khóa)
// ============================================================
export const programs: Program[] = [
  {
    slug: 'y-si-da-khoa',
    code: '5720101',
    name: 'Y sĩ đa khoa',
    shortName: 'Y sĩ',
    category: 'y-te',
    level: 'trung-cap',
    description:
      'Đào tạo y sĩ đa khoa có năng lực khám và điều trị bệnh thông thường, sơ cấp cứu, chăm sóc sức khỏe ban đầu tại tuyến cơ sở y tế.',
    duration: '2 năm',
    durationMonths: 24,
    certificate: 'Trung cấp Y sĩ đa khoa',
    enrollment: 150,
    tuitionPerYear: 12_000_000,
    tuitionNote: 'Ưu đãi nhập học sớm năm đầu',
    highlights: [
      'Thực hành lâm sàng tại cơ sở y tế đối tác',
      'Giảng viên có chứng chỉ hành nghề (CCHN)',
      'Giáo trình cập nhật theo phác đồ Bộ Y tế',
    ],
    careerPaths: [
      'Y sĩ tại trạm y tế xã/phường',
      'Phụ tá bác sĩ tại phòng khám tư',
      'Chăm sóc sức khỏe gia đình, dịch vụ home-care',
    ],
    image: '/images/y-si.png',
  },
  {
    slug: 'duoc-si-trung-hoc',
    code: '5720201',
    name: 'Dược sĩ trung học',
    shortName: 'Dược',
    category: 'y-te',
    level: 'trung-cap',
    description:
      'Đào tạo dược sĩ trung học có kiến thức về thuốc, kỹ năng cấp phát và tư vấn sử dụng thuốc an toàn cho người bệnh.',
    duration: '2 năm',
    durationMonths: 24,
    certificate: 'Trung cấp Dược sĩ',
    enrollment: 120,
    tuitionPerYear: 13_000_000,
    tuitionNote: 'Ưu đãi nhập học sớm năm đầu',
    highlights: [
      'Thực tập tại nhà thuốc lớn ở Cần Thơ',
      'Học phần dược lâm sàng & quản lý nhà thuốc',
      'Cơ hội mở nhà thuốc sau khi có CCHN',
    ],
    careerPaths: [
      'Dược sĩ nhà thuốc tư nhân hoặc chuỗi',
      'Trình dược viên cho công ty dược',
      'Quản lý kho dược tại bệnh viện',
    ],
    image: '/images/y-si.png',
  },
  {
    slug: 'dieu-duong',
    code: '5720301',
    name: 'Điều dưỡng',
    shortName: 'Điều dưỡng',
    category: 'y-te',
    level: 'trung-cap',
    description:
      'Đào tạo điều dưỡng viên có kỹ năng chăm sóc người bệnh toàn diện, hỗ trợ điều trị tại bệnh viện và cơ sở y tế.',
    duration: '2 năm',
    durationMonths: 24,
    certificate: 'Trung cấp Điều dưỡng',
    enrollment: 200,
    tuitionPerYear: 11_000_000,
    tuitionNote: 'Ưu đãi nhập học sớm năm đầu',
    highlights: [
      'Thực hành tại các bệnh viện đối tác',
      'Phòng skills lab mô phỏng đầy đủ',
      'Cơ hội đi xuất khẩu lao động Nhật Bản, Đức',
    ],
    careerPaths: [
      'Điều dưỡng bệnh viện công/tư',
      'Điều dưỡng dịch vụ home-care',
      'Xuất khẩu lao động ngành điều dưỡng',
    ],
    image: '/images/dieu-duong.png',
  },
  {
    slug: 'ho-sinh',
    code: '5720303',
    name: 'Hộ sinh',
    shortName: 'Hộ sinh',
    category: 'y-te',
    level: 'trung-cap',
    description:
      'Đào tạo hộ sinh viên có kỹ năng chăm sóc sản phụ, đỡ đẻ thường và chăm sóc trẻ sơ sinh tại các cơ sở y tế.',
    duration: '2 năm',
    durationMonths: 24,
    certificate: 'Trung cấp Hộ sinh',
    enrollment: 80,
    tuitionPerYear: 11_500_000,
    tuitionNote: 'Ưu đãi nhập học sớm năm đầu',
    highlights: [
      'Thực hành tại khoa sản các bệnh viện',
      'Học phần chăm sóc trẻ sơ sinh chuyên sâu',
      'Nhu cầu hộ sinh tuyến cơ sở rất cao',
    ],
    careerPaths: [
      'Hộ sinh khoa sản bệnh viện',
      'Hộ sinh trạm y tế xã/phường',
      'Tư vấn sức khỏe sinh sản',
    ],
    image: '/images/dieu-duong.png',
  },
  {
    slug: 'cong-nghe-thong-tin-ung-dung-ai',
    code: '5480201',
    name: 'Công nghệ thông tin - Ứng dụng Trí tuệ nhân tạo',
    shortName: 'CNTT-AI',
    category: 'cong-nghe',
    level: 'trung-cap',
    description:
      'Chương trình CNTT định hướng ứng dụng AI thực tế: prompt engineering, AI workflow, tự động hóa văn phòng và lập trình hỗ trợ.',
    duration: '2 - 3 năm',
    durationMonths: 30,
    certificate: 'Trung cấp CNTT (định hướng AI)',
    enrollment: 100,
    tuitionPerYear: 10_000_000,
    tuitionNote: 'Hỗ trợ laptop cho học viên xuất sắc',
    highlights: [
      'Học cách dùng Claude, ChatGPT, Gemini làm công cụ làm việc',
      'Project thực tế: xây AI agent cho doanh nghiệp nhỏ',
      'Cấp chứng chỉ kép: CNTT + AI Applications',
    ],
    careerPaths: [
      'IT Support / Helpdesk tại doanh nghiệp',
      'AI Operator / Prompt Engineer',
      'Tự động hóa văn phòng cho SME',
    ],
    image: '/images/dien-tu.png',
  },
];

// ============================================================
// CHƯƠNG TRÌNH SƠ CẤP (đào tạo ngắn hạn)
// ============================================================
export const shortCoursePrograms: Program[] = [
  {
    slug: 'tro-thu-nha-khoa',
    code: 'SC-YT-01',
    name: 'Trợ thủ nha khoa',
    shortName: 'Trợ thủ nha khoa',
    category: 'y-te',
    level: 'so-cap',
    description:
      'Chương trình trang bị kỹ năng hỗ trợ bác sĩ nha khoa, chuẩn bị dụng cụ, kiểm soát nhiễm khuẩn và chăm sóc người bệnh tại phòng khám răng hàm mặt.',
    duration: '3 - 6 tháng',
    durationMonths: 6,
    certificate: 'Chứng chỉ đào tạo Trợ thủ nha khoa',
    enrollment: 60,
    tuitionPerYear: 0,
    tuitionNote: 'Liên hệ phòng đào tạo để nhận lịch khai giảng gần nhất',
    highlights: [
      'Thực hành quy trình hỗ trợ tại ghế nha khoa',
      'Rèn kỹ năng chuẩn bị, bảo quản và tiệt khuẩn dụng cụ',
      'Học giao tiếp, tiếp đón và hướng dẫn người bệnh',
    ],
    careerPaths: [
      'Trợ thủ tại phòng khám nha khoa',
      'Nhân viên hỗ trợ tại trung tâm răng hàm mặt',
      'Phụ trách dụng cụ và chăm sóc khách hàng nha khoa',
    ],
    image: '/images/tro-thu-nha-khoa.webp',
  },
  {
    slug: 'xoa-bop-vat-ly-tri-lieu',
    code: 'SC-YT-02',
    name: 'Xoa bóp vật lý trị liệu',
    shortName: 'Xoa bóp VLTL',
    category: 'y-te',
    level: 'so-cap',
    description:
      'Đào tạo kiến thức giải phẫu cơ bản và kỹ thuật xoa bóp hỗ trợ phục hồi chức năng, giúp học viên thực hành đúng quy trình và bảo đảm an toàn.',
    duration: '3 - 6 tháng',
    durationMonths: 6,
    certificate: 'Chứng chỉ đào tạo Xoa bóp vật lý trị liệu',
    enrollment: 60,
    tuitionPerYear: 0,
    tuitionNote: 'Liên hệ phòng đào tạo để nhận lịch khai giảng gần nhất',
    highlights: [
      'Học giải phẫu và sinh lý vận động ứng dụng',
      'Thực hành kỹ thuật xoa bóp trên từng vùng cơ thể',
      'Chú trọng sàng lọc chống chỉ định và an toàn người bệnh',
    ],
    careerPaths: [
      'Kỹ thuật viên hỗ trợ tại cơ sở phục hồi chức năng',
      'Nhân viên tại cơ sở chăm sóc sức khỏe được cấp phép',
      'Tiếp tục học chuyên sâu về vật lý trị liệu và phục hồi chức năng',
    ],
    image: '/images/xoa-bop-vat-ly-tri-lieu.webp',
  },
  {
    slug: 'dieu-duong-hoi-suc-cap-cuu',
    code: 'BD-YT-03',
    name: 'Điều dưỡng hồi sức cấp cứu',
    shortName: 'Điều dưỡng HSCC',
    category: 'y-te',
    level: 'so-cap',
    description:
      'Chương trình bồi dưỡng kỹ năng nhận định, theo dõi và hỗ trợ xử trí người bệnh cấp cứu trong môi trường mô phỏng hồi sức tích cực.',
    duration: '3 tháng',
    durationMonths: 3,
    certificate: 'Chứng chỉ bồi dưỡng Điều dưỡng hồi sức cấp cứu',
    enrollment: 50,
    tuitionPerYear: 0,
    tuitionNote: 'Liên hệ phòng đào tạo để được tư vấn điều kiện tham dự',
    highlights: [
      'Thực hành cấp cứu ngừng tuần hoàn trên mô hình',
      'Làm quen thiết bị theo dõi và dụng cụ hồi sức cơ bản',
      'Rèn phối hợp nhóm và bàn giao người bệnh cấp cứu',
    ],
    careerPaths: [
      'Bổ sung năng lực làm việc tại khoa Cấp cứu',
      'Hỗ trợ chăm sóc tại khoa Hồi sức tích cực',
      'Nâng cao kỹ năng phản ứng nhanh trong cơ sở y tế',
    ],
    image: '/images/dieu-duong-hoi-suc-cap-cuu.webp',
  },
  {
    slug: 'thu-ky-y-khoa',
    code: 'SC-DV-01',
    name: 'Thư ký y khoa',
    shortName: 'Thư ký y khoa',
    category: 'dich-vu',
    level: 'so-cap',
    description:
      'Đào tạo nghiệp vụ hành chính y tế, tiếp đón, sắp xếp lịch khám và hỗ trợ quản lý hồ sơ trong bệnh viện, phòng khám và cơ sở chăm sóc sức khỏe.',
    duration: '3 - 6 tháng',
    durationMonths: 6,
    certificate: 'Chứng chỉ đào tạo Thư ký y khoa',
    enrollment: 80,
    tuitionPerYear: 0,
    tuitionNote: 'Liên hệ phòng đào tạo để nhận lịch khai giảng gần nhất',
    highlights: [
      'Thực hành quy trình tiếp đón và điều phối lịch khám',
      'Nắm thuật ngữ y khoa và nguyên tắc bảo mật hồ sơ',
      'Rèn kỹ năng tin học văn phòng và giao tiếp dịch vụ y tế',
    ],
    careerPaths: [
      'Thư ký tại bệnh viện hoặc phòng khám',
      'Nhân viên tiếp đón và điều phối lịch khám',
      'Nhân viên hành chính tại cơ sở chăm sóc sức khỏe',
    ],
    image: '/images/thu-ky-y-khoa.webp',
  },
  {
    slug: 'sua-chua-may-tinh',
    code: 'SC-CNTT-01',
    name: 'Sửa chữa máy tính',
    shortName: 'Sửa chữa máy tính',
    category: 'cong-nghe',
    level: 'so-cap',
    description:
      'Khóa sơ cấp 570 giờ — kỹ năng lắp ráp, cài đặt, chẩn đoán và sửa chữa PC, laptop cho người mới bắt đầu.',
    duration: '3 - 6 tháng',
    durationMonths: 6,
    certificate: 'Chứng chỉ Sơ cấp nghề Sửa chữa máy tính',
    enrollment: 60,
    tuitionPerYear: 0, // tính theo khóa
    tuitionNote: 'Học phí trọn khóa - liên hệ phòng đào tạo',
    highlights: [
      '90 giờ lý thuyết + 480 giờ thực hành (570 tổng giờ)',
      '10 module từ MĐ01 đến MĐ10',
      'Hoàn thành nhận chứng chỉ sơ cấp do trường cấp',
    ],
    careerPaths: [
      'Kỹ thuật viên sửa chữa cửa hàng máy tính',
      'Tự mở dịch vụ sửa chữa tại nhà',
      'Tiếp theo có thể học liên thông lên Trung cấp CNTT',
    ],
    image: '/images/co-khi.png',
  },
];

// ============================================================
// HELPER EXPORTS
// ============================================================
export const allPrograms: Program[] = [...programs, ...shortCoursePrograms];

export const programsByCategory = {
  'y-te': programs.filter((p) => p.category === 'y-te'),
  'cong-nghe': programs.filter((p) => p.category === 'cong-nghe'),
  'dich-vu': programs.filter((p) => p.category === 'dich-vu'),
} as const;

export function getProgramBySlug(slug: string): Program | undefined {
  return allPrograms.find((p) => p.slug === slug);
}

/** Format học phí VND → "12.000.000đ" */
export function formatTuition(amount: number): string {
  if (amount === 0) return 'Liên hệ phòng đào tạo';
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}
