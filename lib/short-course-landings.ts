export type ShortCourseLandingContent = {
  heroLead: string;
  visualIntro: string;
  industryTitle: string;
  industryIntro: string;
  outcomes: Array<{ icon: string; title: string; text: string }>;
  workplaces: string[];
  sectionImage: string;
  sectionImageAlt: string;
  audiences: string[];
  curriculum: Array<{ title: string; description: string }>;
  supportNote: string;
};

export const shortCourseLandings: Record<string, ShortCourseLandingContent> = {
  'tro-thu-nha-khoa': {
    heroLead: 'Hỗ trợ bác sĩ, chuẩn bị dụng cụ và chăm sóc người bệnh tại phòng nha.',
    visualIntro: 'Thực hành trực tiếp từng thao tác trong môi trường mô phỏng nha khoa.',
    industryTitle: 'Người đứng sau một ca điều trị trơn tru',
    industryIntro: 'Trợ thủ nha khoa là vị trí phối hợp cùng bác sĩ trong suốt quy trình khám và điều trị. Công việc đòi hỏi sự cẩn thận, nhanh nhạy và thái độ chăm sóc người bệnh.',
    outcomes: [
      { icon: 'medical_services', title: 'Chuẩn bị trước ca', text: 'Sắp xếp ghế, khay dụng cụ và vật tư theo từng tình huống.' },
      { icon: 'dentistry', title: 'Phối hợp tại ghế', text: 'Chuyển dụng cụ đúng lúc và hỗ trợ bác sĩ trong ca điều trị.' },
      { icon: 'clean_hands', title: 'Chăm sóc sau điều trị', text: 'Hướng dẫn người bệnh, xử lý dụng cụ và giữ phòng khám an toàn.' },
    ],
    workplaces: ['Phòng khám nha khoa', 'Trung tâm răng hàm mặt', 'Bộ phận chăm sóc khách hàng'],
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
    heroLead: 'Học xoa bóp an toàn, hỗ trợ phục hồi vận động.',
    visualIntro: 'Quan sát, thực hiện và được chỉnh sửa kỹ thuật ngay trong buổi học.',
    industryTitle: 'Biến kiến thức vận động thành thao tác an toàn',
    industryIntro: 'Xoa bóp vật lý trị liệu kết hợp kiến thức giải phẫu với kỹ thuật thực hành trên từng vùng cơ thể. Người học cần biết quan sát, lắng nghe và tôn trọng giới hạn an toàn.',
    outcomes: [
      { icon: 'accessibility_new', title: 'Hiểu cơ thể', text: 'Nắm nhóm cơ, khớp và vận động liên quan đến từng vùng.' },
      { icon: 'self_improvement', title: 'Thực hiện kỹ thuật', text: 'Luyện thao tác xoa, bóp, day và miết theo trình tự.' },
      { icon: 'health_and_safety', title: 'Biết giới hạn', text: 'Sàng lọc chống chỉ định và nhận biết khi cần chuyển tuyến.' },
    ],
    workplaces: ['Cơ sở phục hồi chức năng', 'Cơ sở chăm sóc sức khỏe', 'Dịch vụ chăm sóc được cấp phép'],
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
    heroLead: 'Luyện phản xạ cấp cứu và phối hợp chăm sóc người bệnh.',
    visualIntro: 'Luyện phản xạ cấp cứu qua tình huống mô phỏng và phối hợp theo nhóm.',
    industryTitle: 'Bình tĩnh trước mỗi tình huống cấp cứu',
    industryIntro: 'Điều dưỡng hồi sức cấp cứu cần phản ứng có thứ tự, theo dõi sát và phối hợp chính xác. Chương trình tập trung vào các tình huống mô phỏng để người học luyện phản xạ trong môi trường an toàn.',
    outcomes: [
      { icon: 'monitor_heart', title: 'Nhận định nhanh', text: 'Đánh giá dấu hiệu nguy hiểm và xác định ưu tiên ban đầu.' },
      { icon: 'emergency', title: 'Hỗ trợ hồi sức', text: 'Thực hành cấp cứu trên mô hình và làm quen dụng cụ hồi sức.' },
      { icon: 'groups', title: 'Phối hợp trong kíp', text: 'Phân vai, giao tiếp ngắn gọn và bàn giao thông tin quan trọng.' },
    ],
    workplaces: ['Khoa Cấp cứu', 'Khoa Hồi sức tích cực', 'Đội ngũ y tế cơ sở'],
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
    heroLead: 'Nắm nghiệp vụ tiếp đón, điều phối và hồ sơ y tế.',
    visualIntro: 'Thực hành tiếp đón, sắp lịch và xử lý hồ sơ trong bối cảnh phòng khám.',
    industryTitle: 'Điểm chạm đầu tiên của người bệnh',
    industryIntro: 'Thư ký y khoa kết nối người bệnh với bác sĩ và các bộ phận trong cơ sở y tế. Công việc cần sự chỉn chu trong giao tiếp, điều phối và bảo mật thông tin.',
    outcomes: [
      { icon: 'front_hand', title: 'Đón tiếp rõ ràng', text: 'Hướng dẫn thủ tục và giao tiếp chuyên nghiệp ngay từ quầy.' },
      { icon: 'event_available', title: 'Điều phối trơn tru', text: 'Sắp lịch hẹn, luồng khám và thông tin giữa các bộ phận.' },
      { icon: 'folder_shared', title: 'Hồ sơ chuẩn xác', text: 'Dùng thuật ngữ đúng, lưu trữ và bảo mật hồ sơ người bệnh.' },
    ],
    workplaces: ['Bệnh viện', 'Phòng khám', 'Cơ sở chăm sóc sức khỏe'],
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
