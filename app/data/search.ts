// Dữ liệu tìm kiếm cho toàn bộ trang web
export interface SearchItem {
    id: string;
    title: string;
    description: string;
    category: 'page' | 'program' | 'news';
    href: string;
    keywords: string[];
}

export const searchData: SearchItem[] = [
    // Các trang
    {
        id: 'page-home',
        title: 'Trang Chủ',
        description: 'Trang chủ Trường Trung cấp Miền Tây',
        category: 'page',
        href: '/',
        keywords: ['trang chủ', 'home', 'giới thiệu', 'mtpc']
    },
    {
        id: 'page-tuyen-sinh',
        title: 'Thông tin Tuyển sinh',
        description: 'Thông tin tuyển sinh năm học 2026 - Điều kiện, ngành học, học phí',
        category: 'page',
        href: '/tuyen-sinh',
        keywords: ['tuyển sinh', 'đăng ký', 'nhập học', 'xét tuyển', 'điều kiện']
    },
    {
        id: 'page-dang-ky',
        title: 'Đăng ký xét tuyển',
        description: 'Đăng ký xét tuyển trực tuyến - Form đăng ký nhập học',
        category: 'page',
        href: '/tuyen-sinh/dang-ky',
        keywords: ['đăng ký', 'form', 'xét tuyển', 'nhập học', 'ghi danh']
    },
    {
        id: 'page-dao-tao',
        title: 'Chương trình Đào tạo',
        description: 'Các chương trình đào tạo và ngành học tại trường',
        category: 'page',
        href: '/dao-tao',
        keywords: ['đào tạo', 'chương trình', 'ngành học', 'khóa học']
    },
    {
        id: 'page-tin-tuc',
        title: 'Tin tức & Sự kiện',
        description: 'Tin tức mới nhất và các sự kiện của trường',
        category: 'page',
        href: '/tin-tuc',
        keywords: ['tin tức', 'sự kiện', 'thông báo', 'hoạt động']
    },
    {
        id: 'page-lien-he',
        title: 'Liên hệ',
        description: 'Thông tin liên hệ và địa chỉ trường',
        category: 'page',
        href: '/lien-he',
        keywords: ['liên hệ', 'địa chỉ', 'hotline', 'email', 'bản đồ']
    },

    // Ngành đào tạo
    {
        id: 'program-y-si',
        title: 'Y sĩ đa khoa',
        description: 'Đào tạo y sĩ đa khoa - Thời gian 2 năm - Chỉ tiêu 150',
        category: 'program',
        href: '/dao-tao#programs',
        keywords: ['y sĩ', 'y tế', 'sức khỏe', 'bác sĩ', 'khám bệnh']
    },
    {
        id: 'program-dieu-duong',
        title: 'Điều dưỡng',
        description: 'Đào tạo điều dưỡng chuyên nghiệp - Thời gian 2 năm - Chỉ tiêu 200',
        category: 'program',
        href: '/dao-tao#programs',
        keywords: ['điều dưỡng', 'y tá', 'chăm sóc', 'bệnh viện', 'y tế']
    },
    {
        id: 'program-duoc-si',
        title: 'Dược sĩ',
        description: 'Đào tạo dược sĩ trung cấp - Thời gian 2 năm - Chỉ tiêu 100',
        category: 'program',
        href: '/dao-tao#programs',
        keywords: ['dược sĩ', 'thuốc', 'nhà thuốc', 'dược phẩm']
    },
    {
        id: 'program-co-khi',
        title: 'Cơ khí',
        description: 'Đào tạo kỹ thuật viên cơ khí - Thời gian 2-3 năm - Chỉ tiêu 80',
        category: 'program',
        href: '/dao-tao#programs',
        keywords: ['cơ khí', 'máy móc', 'kỹ thuật', 'chế tạo']
    },
    {
        id: 'program-dien-tu',
        title: 'Điện tử',
        description: 'Đào tạo điện tử viễn thông - Thời gian 2-3 năm - Chỉ tiêu 80',
        category: 'program',
        href: '/dao-tao#programs',
        keywords: ['điện tử', 'viễn thông', 'mạch điện', 'công nghệ']
    },
    {
        id: 'program-tmdt',
        title: 'Thương mại điện tử',
        description: 'Đào tạo thương mại điện tử - Thời gian 2-3 năm - Chỉ tiêu 100',
        category: 'program',
        href: '/dao-tao#programs',
        keywords: ['thương mại điện tử', 'bán hàng online', 'marketing', 'kinh doanh']
    },

    // Thông tin khác
    {
        id: 'info-hoc-phi',
        title: 'Học phí',
        description: 'Thông tin học phí các ngành đào tạo năm 2026',
        category: 'page',
        href: '/tuyen-sinh/dang-ky',
        keywords: ['học phí', 'chi phí', 'tiền học', 'ưu đãi', 'giảm giá']
    },
    {
        id: 'info-faq',
        title: 'Hỏi đáp thường gặp',
        description: 'Các câu hỏi thường gặp về tuyển sinh và đào tạo',
        category: 'page',
        href: '/tuyen-sinh/dang-ky',
        keywords: ['hỏi đáp', 'FAQ', 'câu hỏi', 'thắc mắc', 'giải đáp']
    },
    {
        id: 'info-tam-nhin',
        title: 'Tầm nhìn',
        description: 'Tầm nhìn của Trường Trung cấp Miền Tây - Trở thành trường đào tạo nghề hàng đầu khu vực',
        category: 'page',
        href: '/#about',
        keywords: ['tầm nhìn', 'vision', 'mục tiêu', 'định hướng', 'phát triển']
    },
    {
        id: 'info-su-menh',
        title: 'Sứ mệnh',
        description: 'Sứ mệnh đào tạo nguồn nhân lực chất lượng cao, đáp ứng nhu cầu xã hội',
        category: 'page',
        href: '/#about',
        keywords: ['sứ mệnh', 'mission', 'trách nhiệm', 'đào tạo', 'nhân lực']
    },
    {
        id: 'info-gia-tri',
        title: 'Giá trị cốt lõi',
        description: 'Chất lượng - Sáng tạo - Trách nhiệm - Hợp tác',
        category: 'page',
        href: '/#about',
        keywords: ['giá trị', 'core values', 'chất lượng', 'sáng tạo', 'trách nhiệm']
    },
];

// Hàm tìm kiếm
export function searchContent(query: string): SearchItem[] {
    if (!query.trim()) return [];

    const normalizedQuery = query.toLowerCase().trim();
    const words = normalizedQuery.split(/\s+/);

    return searchData
        .map(item => {
            let score = 0;
            const titleLower = item.title.toLowerCase();
            const descLower = item.description.toLowerCase();
            const keywordsLower = item.keywords.join(' ').toLowerCase();

            // Exact title match
            if (titleLower.includes(normalizedQuery)) score += 10;

            // Word matches
            words.forEach(word => {
                if (titleLower.includes(word)) score += 5;
                if (descLower.includes(word)) score += 3;
                if (keywordsLower.includes(word)) score += 2;
            });

            return { item, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map(({ item }) => item);
}
