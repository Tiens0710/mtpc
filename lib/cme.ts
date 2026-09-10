export type CmeCourse = {
  slug: string;
  title: string;
  audience: string;
  instructor: string;
  startDate: string;
  registrationDate: string;
  format: string;
  duration: string;
  tuition: string;
  certificate: string;
  image: string;
  status: 'Đang mở đăng ký' | 'Sắp mở đăng ký';
  month: string;
};

/** Dữ liệu mẫu cho giao diện CME, có thể thay bằng API khi trung tâm có lịch chính thức. */
export const cmeCourses: CmeCourse[] = [
  {
    slug: 'cap-cuu-ngo-doc-thuong-gap-o-tre-em',
    title: 'Xử trí cấp cứu ngộ độc thường gặp ở trẻ em',
    audience: 'Người hành nghề khám bệnh, chữa bệnh nhi khoa',
    instructor: 'BS. BSCKII. Lê Văn Tâm',
    startDate: '08:00 – 04/10/2026',
    registrationDate: '17:00 – 03/10/2026',
    format: 'Trực tuyến – Google Meet',
    duration: '8 tiết CME',
    tuition: '200.000đ / học viên',
    certificate: 'Giấy chứng nhận CME 8 tiết',
    image: '/images/y-si.png',
    status: 'Đang mở đăng ký',
    month: '10',
  },
  {
    slug: 'tam-ly-giao-tiep-cua-nhan-vien-y-te',
    title: 'Tâm lý giao tiếp của nhân viên y tế',
    audience: 'Nhân viên y tế, điều dưỡng và học viên khối sức khỏe',
    instructor: 'TS. Trần Thị Hạnh',
    startDate: '08:00 – 27/09/2026',
    registrationDate: '17:00 – 26/09/2026',
    format: 'Trực tuyến – Google Meet',
    duration: '8 tiết CME',
    tuition: '200.000đ / học viên',
    certificate: 'Giấy chứng nhận CME 8 tiết',
    image: '/images/dieu-duong.png',
    status: 'Đang mở đăng ký',
    month: '09',
  },
  {
    slug: 'an-toan-tiem-chung',
    title: 'An toàn tiêm, an toàn tiêm chủng',
    audience: 'Bác sĩ, điều dưỡng, nữ hộ sinh và kỹ thuật viên',
    instructor: 'TS. Ngô Minh Đạt',
    startDate: '08:00 – 20/09/2026',
    registrationDate: '17:00 – 19/09/2026',
    format: 'Trực tuyến – Google Meet',
    duration: '8 tiết CME',
    tuition: '200.000đ / học viên',
    certificate: 'Giấy chứng nhận CME 8 tiết',
    image: '/images/principal.png',
    status: 'Sắp mở đăng ký',
    month: '09',
  },
  {
    slug: 'so-cap-cuu-va-dieu-tri-ngo-doc-cap',
    title: 'Sơ cấp cứu và điều trị ngộ độc cấp',
    audience: 'Nhân viên y tế tại cơ sở khám chữa bệnh',
    instructor: 'ThS.BSCKII. Lê Văn Tâm',
    startDate: '08:00 – 19/09/2026',
    registrationDate: '17:00 – 18/09/2026',
    format: 'Trực tuyến – Google Meet',
    duration: '8 tiết CME',
    tuition: '200.000đ / học viên',
    certificate: 'Giấy chứng nhận CME 8 tiết',
    image: '/ctump.jpg',
    status: 'Sắp mở đăng ký',
    month: '09',
  },
];

export const cmeInstructors = [
  { initials: 'ND', name: 'BS. BS. Lê Ngọc Duy', role: 'Trưởng khoa Cấp cứu Chống độc, Bệnh viện Nhi Trung ương' },
  { initials: 'TH', name: 'TS. Trần Thị Hạnh', role: 'Phó Trưởng Khoa Học sức khỏe, Trường Đại học Cửu Long' },
  { initials: 'MD', name: 'TS. Ngô Minh Đạt', role: 'Phó Giám đốc Điều dưỡng miền Bắc, Hệ thống bệnh viện Hồng Ngọc' },
  { initials: 'VT', name: 'Thượng tọa BSCKII. Lê Văn Tâm', role: 'Phó khoa Điều trị rắn cắn, Trung tâm Chống độc' },
  { initials: 'HT', name: 'TS.DS Nguyễn Hương Thảo', role: 'Bộ môn Dược lâm sàng, Đại học Y Dược TP. Hồ Chí Minh' },
  { initials: 'TT', name: 'BSCKII. Nguyễn Thị Thoa', role: 'Trưởng Phòng Nghiệp vụ Y, Sở Y tế thành phố' },
  { initials: 'NA', name: 'TS. Đặng Nguyễn Ngọc An', role: 'Giảng viên khối sức khỏe, Đại học Y Dược TP. Hồ Chí Minh' },
  { initials: 'HN', name: 'BS. BS. Nguyễn Hoài Nam', role: 'Giảng viên cấp cứu và hồi sức tích cực' },
];

export const cmeFaqs = [
  { question: 'Ai có thể tham dự các lớp CME?', answer: 'Các lớp phù hợp với bác sĩ, dược sĩ, điều dưỡng, hộ sinh, kỹ thuật viên và nhân viên y tế có nhu cầu cập nhật kiến thức chuyên môn. Điều kiện cụ thể sẽ được ghi rõ trong từng khóa học.' },
  { question: 'Tôi đăng ký lớp học bằng cách nào?', answer: 'Bạn chọn khóa học phù hợp, bấm “Đăng ký”, điền thông tin liên hệ và hoàn tất học phí theo hướng dẫn của Trung tâm.' },
  { question: 'Tôi sẽ nhận giấy chứng nhận như thế nào?', answer: 'Sau khi hoàn thành chương trình và đáp ứng yêu cầu điểm danh/đánh giá, Trung tâm sẽ gửi hướng dẫn nhận giấy chứng nhận CME đến email hoặc số điện thoại đăng ký.' },
  { question: 'Thông tin lớp học có thể thay đổi không?', answer: 'Lịch học có thể được điều chỉnh theo tình hình thực tế. Mọi thay đổi sẽ được thông báo trước đến học viên qua kênh liên hệ đã đăng ký.' },
];
