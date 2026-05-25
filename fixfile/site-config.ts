/**
 * Cấu hình trung tâm của website MTPC.
 *
 * Đây là SINGLE SOURCE OF TRUTH cho mọi thông tin định danh trường.
 * - Mọi component/page PHẢI import từ file này.
 * - KHÔNG hardcode tên trường, địa chỉ, SĐT, email trong JSX.
 * - Khi cập nhật thông tin trường, CHỈ sửa file này.
 *
 * Các giá trị có dấu `__TODO__` cần Hiệp xác minh và điền lại trước khi deploy.
 */

export const siteConfig = {
  // ============================================================
  // DANH XƯNG & THƯƠNG HIỆU
  // ============================================================
  //
  // ⚠️ QUAN TRỌNG: Trường là TRUNG CẤP (vocational), KHÔNG phải Cao đẳng.
  // Trong copy public KHÔNG bao giờ dùng các từ:
  //   - "Cao đẳng"
  //   - "Professional College" (gây hiểu nhầm là cao đẳng)
  // Tên tiếng Anh chính thức: "Mien Tay Vocational College"
  // ============================================================
  school: {
    nameShort: 'MTPC',
    nameFull: 'Trường Trung cấp Miền Tây',
    nameEn: 'Mien Tay Vocational College',
    tagline: 'Chất lượng là nền tảng',
    description:
      'Đào tạo các ngành Y tế và Công nghệ thông tin theo định hướng ứng dụng thực tiễn tại Đồng bằng sông Cửu Long.',
  },

  // ============================================================
  // PHÁP LÝ & THÀNH LẬP
  // ============================================================
  legal: {
    foundingYear: 2010,
    // Trường thành lập theo QĐ 3096/2010 ngày 15/11/2010 → 2026 là năm thứ 16
    yearsOfOperation: () => new Date().getFullYear() - 2010,
    foundingDecree: 'Quyết định số 3096/2010/QĐ-UBND ngày 15/11/2010 của UBND TP Cần Thơ',
    amendmentDecree: 'Quyết định số 771/QĐ-UBND ngày 30/03/2013 của UBND TP Cần Thơ',
  },

  // ============================================================
  // LÃNH ĐẠO
  // ============================================================
  leadership: {
    principal: {
      name: 'Nguyễn Thị Anh Thư',
      title: 'Hiệu trưởng',
    },
  },

  // ============================================================
  // ĐỊA CHỈ
  // ============================================================
  address: {
    street: '192-194 Ngô Quyền',
    ward: 'Phường An Hòa',
    district: 'Quận Ninh Kiều',
    city: 'TP. Cần Thơ',
    country: 'Việt Nam',
    full: '192-194 Ngô Quyền, P. An Hòa, Q. Ninh Kiều, TP. Cần Thơ',
    // Toạ độ địa lý cho map embed - cần Hiệp xác minh chính xác với địa chỉ 192-194 Ngô Quyền
    coords: {
      lat: 10.0417, // __TODO__ verify
      lng: 105.7609, // __TODO__ verify
    },
    // URL embed Google Maps - cần generate lại từ địa chỉ thật
    // Vào https://www.google.com/maps → tìm địa chỉ → Share → Embed → copy iframe src
    googleMapsEmbedUrl: '__TODO__ generate from real address 192-194 Ngô Quyền',
  },

  // ============================================================
  // LIÊN HỆ
  // ============================================================
  contact: {
    // ⚠️ __TODO__ Hiệp điền số chính thức của trường, hiện 2 số trên website đang mâu thuẫn:
    //   - Footer:    (0292) 3 888 999
    //   - Form ts:   (0292) 222 55 77
    phoneMain: '__TODO__ SĐT chính của trường',
    phoneAdmissions: '__TODO__ SĐT phòng tuyển sinh (có thể trùng phoneMain)',

    // Zalo OA là kênh ưu tiên cho học viên trẻ - đã verified
    zaloOA: {
      number: '0375 711 766',
      url: 'https://zalo.me/0375711766',
      label: 'Zalo OA Tuyển sinh',
    },

    email: {
      admissions: '__TODO__ email tuyển sinh chính thức (gợi ý: tuyensinh@mtpc.edu.vn)',
      info: '__TODO__ email thông tin chung',
    },

    workingHours: {
      weekday: 'Thứ 2 - Thứ 7: 7:30 - 17:00',
      sunday: 'Chủ nhật: Nghỉ',
    },
  },

  // ============================================================
  // CONTACT NỘI BỘ (chỉ dùng trong admin/CRM, KHÔNG public)
  // ============================================================
  internalContact: {
    coordinator: {
      name: 'Cô Đỗ Thị Hoài Thu',
      phone: '0367 641 132',
      role: 'Điều phối / RSVP',
    },
  },

  // ============================================================
  // SOCIAL MEDIA
  // ============================================================
  // ⚠️ __TODO__ Hiệp thay bằng link page MTPC thật.
  // Hiện tại website đang link về trang chủ facebook.com, youtube.com - không có giá trị
  social: {
    facebook: '__TODO__ https://facebook.com/MTPCCanTho hoặc URL thật',
    youtube: '__TODO__ https://youtube.com/@mtpc hoặc URL thật',
    tiktok: '__TODO__ https://tiktok.com/@mtpc hoặc URL thật',
    zalo: 'https://zalo.me/0375711766', // verified
  },

  // ============================================================
  // TẦM NHÌN & SỨ MỆNH
  // ============================================================
  //
  // ⚠️ Câu vision cũ trên website ("trường trung cấp trẻ được ngưỡng mộ nhất
  // châu Á vào năm 2030") nghe rất giống template copy từ VinUni/RMIT, không
  // phù hợp với thực tế trường nghề ở ĐBSCL.
  //
  // Đề xuất câu mới dưới đây tập trung vào USP thật của trường:
  //   - Vùng phục vụ: ĐBSCL
  //   - Lĩnh vực: y tế + CNTT ứng dụng
  //   - Hướng tiếp cận: thực hành, đào tạo nhân lực sẵn dùng
  vision:
    'Trở thành cơ sở đào tạo trung cấp uy tín hàng đầu vùng Đồng bằng sông Cửu Long, cung cấp nguồn nhân lực thực hành chất lượng cao cho ngành y tế và công nghệ.',

  mission:
    'Đào tạo người học có tay nghề vững, đạo đức nghề nghiệp tốt và khả năng thích ứng cao, đáp ứng nhu cầu nhân lực thực tế của doanh nghiệp và cơ sở y tế khu vực.',

  coreValues: ['Chất lượng', 'Thực hành', 'Trách nhiệm', 'Đổi mới'],

  // ============================================================
  // DOMAIN & SEO
  // ============================================================
  urls: {
    production: 'https://mtpc.edu.vn', // __TODO__ verify DNS đã trỏ chưa
    staging: 'https://mtpc-one.vercel.app',
    canonical: 'https://mtpc.edu.vn', // dùng cho canonical link, OG URL
  },

  seo: {
    defaultTitle: 'Trường Trung cấp Miền Tây - MTPC',
    titleTemplate: '%s | MTPC - Trường Trung cấp Miền Tây',
    defaultDescription:
      'Trường Trung cấp Miền Tây (MTPC) tại Cần Thơ - Đào tạo Y sĩ, Dược, Điều dưỡng, Hộ sinh, CNTT ứng dụng AI. Bằng cấp xác thực blockchain.',
    keywords: [
      'MTPC',
      'Trường Trung cấp Miền Tây',
      'tuyển sinh Cần Thơ',
      'y sĩ đa khoa',
      'dược sĩ',
      'điều dưỡng',
      'hộ sinh',
      'CNTT AI',
      'trường nghề Cần Thơ',
    ],
    ogImage: '/og-image.jpg', // __TODO__ tạo OG image 1200x630 chuyên nghiệp
    locale: 'vi_VN',
  },

  // ============================================================
  // COPYRIGHT
  // ============================================================
  copyright: {
    year: new Date().getFullYear(),
    holder: 'Trường Trung cấp Miền Tây',
    text: () => `© ${new Date().getFullYear()} Trường Trung cấp Miền Tây. Tất cả các quyền được bảo lưu.`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
