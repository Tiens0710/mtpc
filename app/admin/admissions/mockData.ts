import { FeeItem, FAQItem } from './schema';

export const mockFees: FeeItem[] = [
    {
        id: '1',
        major: 'Y sĩ đa khoa',
        tuition: '12.000.000đ/năm',
        scholarship: 'Giảm 30% năm đầu'
    },
    {
        id: '2',
        major: 'Điều dưỡng',
        tuition: '11.000.000đ/năm',
        scholarship: 'Giảm 30% năm đầu'
    },
    {
        id: '3',
        major: 'Dược sĩ',
        tuition: '13.000.000đ/năm',
        scholarship: 'Giảm 25% năm đầu'
    },
    {
        id: '4',
        major: 'Cơ khí',
        tuition: '9.000.000đ/năm',
        scholarship: 'Miễn phí đồng phục'
    },
    {
        id: '5',
        major: 'Điện tử',
        tuition: '9.500.000đ/năm',
        scholarship: 'Miễn phí đồng phục'
    },
    {
        id: '6',
        major: 'Thương mại điện tử',
        tuition: '10.000.000đ/năm',
        scholarship: 'Hỗ trợ laptop'
    },
];

export const mockFAQs: FAQItem[] = [
    {
        id: '1',
        question: 'Trường có ký túc xá cho sinh viên ở xa không?',
        answer: 'Có. Ký túc xá hiện đại, an ninh 24/7, chi phí hợp lý cho sinh viên ở xa.'
    },
    {
        id: '2',
        question: 'Cơ hội việc làm sau khi ra trường?',
        answer: 'Cam kết 100% giới thiệu việc làm tại mạng lưới 200+ doanh nghiệp đối tác trong và ngoài nước.'
    },
    {
        id: '3',
        question: 'Học phí có thể đóng theo từng kỳ không?',
        answer: 'Có, nhà trường hỗ trợ đóng học phí theo từng học kỳ hoặc theo tháng để giảm áp lực tài chính.'
    },
    {
        id: '4',
        question: 'Trường có chính sách hỗ trợ việc làm sau tốt nghiệp?',
        answer: 'Có, trường có quan hệ hợp tác với nhiều doanh nghiệp và bệnh viện. Tỷ lệ có việc làm sau tốt nghiệp đạt trên 95%.'
    },
];
