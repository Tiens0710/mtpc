export type ShortCourseLandingContent = {
  heroLead: string;
  visualIntro: string;
  sectionImage: string;
  sectionImageAlt: string;
  audiences: string[];
  curriculum: Array<{ title: string; description: string }>;
  supportNote: string;
};

export const shortCourseLandings: Record<string, ShortCourseLandingContent> = {
  'tro-thu-nha-khoa': {
    heroLead: 'Rèn kỹ năng hỗ trợ tại ghế, kiểm soát dụng cụ và chăm sóc người bệnh trong môi trường nha khoa.',
    visualIntro: 'Thực hành trực tiếp từng thao tác trong môi trường mô phỏng nha khoa.',
    sectionImage: '/images/short-courses/tro-thu-nha-khoa-thuc-hanh.webp',
    sectionImageAlt: 'Học viên chuẩn bị dụng cụ nha khoa dưới sự hướng dẫn của giảng viên',
    audiences: [
      'Người muốn bắt đầu công việc trong lĩnh vực nha khoa',
      'Nhân viên phòng khám cần chuẩn hóa kỹ năng hỗ trợ',
      'Người yêu thích môi trường chăm sóc sức khỏe và dịch vụ',
    ],
    curriculum: [
      { title: 'Nền tảng nha khoa', description: 'Nhận biết cấu trúc răng, thuật ngữ và quy trình điều trị thường gặp.' },
      { title: 'Hỗ trợ tại ghế', description: 'Chuẩn bị vị trí làm việc, chuyển dụng cụ và phối hợp trong ca điều trị.' },
      { title: 'Kiểm soát nhiễm khuẩn', description: 'Làm sạch, đóng gói, tiệt khuẩn và bảo quản dụng cụ đúng quy trình.' },
      { title: 'Tiếp đón người bệnh', description: 'Hướng dẫn, trấn an và giao tiếp chuyên nghiệp trước và sau điều trị.' },
      { title: 'Vận hành phòng khám', description: 'Sắp xếp hồ sơ, vật tư và lịch hẹn hỗ trợ hoạt động hằng ngày.' },
    ],
    supportNote: 'Phù hợp cho người mới bắt đầu. Nhà trường tư vấn lộ trình dựa trên nền tảng và mục tiêu nghề nghiệp của từng học viên.',
  },
  'xoa-bop-vat-ly-tri-lieu': {
    heroLead: 'Học kỹ thuật xoa bóp hỗ trợ phục hồi vận động theo nguyên tắc an toàn và đúng chỉ định.',
    visualIntro: 'Quan sát, thực hiện và được chỉnh sửa kỹ thuật ngay trong buổi học.',
    sectionImage: '/images/short-courses/xoa-bop-vat-ly-tri-lieu-thuc-hanh.webp',
    sectionImageAlt: 'Giảng viên hướng dẫn học viên kỹ thuật xoa bóp vai an toàn',
    audiences: [
      'Người muốn theo đuổi công việc chăm sóc và phục hồi sức khỏe',
      'Nhân viên cơ sở dịch vụ cần bổ sung kỹ thuật nền tảng',
      'Người muốn học tiếp chuyên sâu về phục hồi chức năng',
    ],
    curriculum: [
      { title: 'Giải phẫu ứng dụng', description: 'Hiểu nhóm cơ, khớp và vận động liên quan đến từng vùng cơ thể.' },
      { title: 'Đánh giá ban đầu', description: 'Thu thập thông tin, quan sát vận động và nhận biết dấu hiệu cần lưu ý.' },
      { title: 'Kỹ thuật nền tảng', description: 'Thực hành các thao tác xoa, bóp, day và miết theo đúng trình tự.' },
      { title: 'An toàn người bệnh', description: 'Sàng lọc chống chỉ định và xử lý tình huống trong phạm vi được đào tạo.' },
      { title: 'Giao tiếp chuyên môn', description: 'Hướng dẫn tư thế và trao đổi rõ ràng trong suốt buổi thực hành.' },
    ],
    supportNote: 'Chương trình chú trọng an toàn và giới hạn nghề nghiệp. Học viên được hướng dẫn khi nào cần chuyển người bệnh đến cơ sở chuyên môn.',
  },
  'dieu-duong-hoi-suc-cap-cuu': {
    heroLead: 'Bồi dưỡng phản xạ nhận định, theo dõi và phối hợp xử trí trong các tình huống cấp cứu thường gặp.',
    visualIntro: 'Luyện phản xạ cấp cứu qua tình huống mô phỏng và phối hợp theo nhóm.',
    sectionImage: '/images/short-courses/dieu-duong-hoi-suc-cap-cuu-thuc-hanh.webp',
    sectionImageAlt: 'Nhóm học viên điều dưỡng thực hành hồi sức trên mô hình',
    audiences: [
      'Điều dưỡng muốn củng cố kỹ năng hồi sức và cấp cứu',
      'Nhân sự y tế chuẩn bị làm việc tại khoa có người bệnh nặng',
      'Cơ sở y tế cần bồi dưỡng kỹ năng phản ứng nhanh cho đội ngũ',
    ],
    curriculum: [
      { title: 'Nhận định cấp cứu', description: 'Đánh giá ban đầu, nhận biết dấu hiệu nguy hiểm và ưu tiên xử trí.' },
      { title: 'Hồi sức cơ bản', description: 'Thực hành cấp cứu ngừng tuần hoàn trên mô hình theo quy trình.' },
      { title: 'Theo dõi người bệnh', description: 'Làm quen thông số, thiết bị theo dõi và ghi nhận diễn biến.' },
      { title: 'Dụng cụ hồi sức', description: 'Chuẩn bị và hỗ trợ sử dụng các phương tiện cấp cứu cơ bản.' },
      { title: 'Phối hợp và bàn giao', description: 'Phân vai, giao tiếp ngắn gọn và bàn giao thông tin quan trọng.' },
    ],
    supportNote: 'Đây là chương trình bồi dưỡng. Điều kiện tham dự và phạm vi thực hành sẽ được phòng đào tạo tư vấn trước khi nhập học.',
  },
  'thu-ky-y-khoa': {
    heroLead: 'Xây nền tảng hành chính y tế, điều phối lịch khám và giao tiếp chuyên nghiệp với người bệnh.',
    visualIntro: 'Thực hành tiếp đón, sắp lịch và xử lý hồ sơ trong bối cảnh phòng khám.',
    sectionImage: '/images/short-courses/thu-ky-y-khoa-thuc-hanh.webp',
    sectionImageAlt: 'Học viên thư ký y khoa thực hành tiếp đón người bệnh tại quầy',
    audiences: [
      'Người muốn làm công việc hành chính trong môi trường y tế',
      'Nhân viên tiếp đón cần chuẩn hóa quy trình phục vụ người bệnh',
      'Người có thế mạnh giao tiếp, tổ chức và tin học văn phòng',
    ],
    curriculum: [
      { title: 'Thuật ngữ y khoa', description: 'Làm quen cách gọi, biểu mẫu và thông tin thường gặp trong cơ sở y tế.' },
      { title: 'Tiếp đón người bệnh', description: 'Hướng dẫn thủ tục, giao tiếp rõ ràng và xử lý tình huống tại quầy.' },
      { title: 'Điều phối lịch khám', description: 'Sắp xếp lịch hẹn, luồng khám và phối hợp giữa các bộ phận.' },
      { title: 'Quản lý hồ sơ', description: 'Lưu trữ, tra cứu và bảo mật thông tin người bệnh đúng nguyên tắc.' },
      { title: 'Tin học văn phòng', description: 'Thực hành công cụ hỗ trợ báo cáo, lịch làm việc và văn bản hành chính.' },
    ],
    supportNote: 'Không yêu cầu kinh nghiệm y tế trước đó. Học viên được hướng dẫn từ nghiệp vụ cơ bản đến quy trình phối hợp tại cơ sở khám chữa bệnh.',
  },
};

export function getShortCourseLanding(slug: string) {
  return shortCourseLandings[slug];
}
