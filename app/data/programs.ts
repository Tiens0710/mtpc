// Dữ liệu ngành đào tạo dùng chung cho các trang
export const programs = [
    {
        id: 1,
        name: "Cơ khí",
        description: "Đào tạo kỹ thuật viên cơ khí với kiến thức chuyên sâu về thiết kế, chế tạo và bảo trì các thiết bị cơ khí.",
        duration: "2 - 3 năm",
        image: "/images/co-khi.png",
        quota: 80
    },
    {
        id: 2,
        name: "Điện tử",
        description: "Chương trình đào tạo về điện tử viễn thông, mạch điện tử, và hệ thống nhúng.",
        duration: "2 - 3 năm",
        image: "/images/dien-tu.png",
        quota: 80
    },
    {
        id: 3,
        name: "Y sĩ đa khoa",
        description: "Đào tạo y sĩ đa khoa với chương trình học chất lượng cao, kết hợp lý thuyết và thực hành lâm sàng.",
        duration: "2 năm",
        image: "/images/y-si.png",
        quota: 150
    },
    {
        id: 4,
        name: "Điều dưỡng",
        description: "Chương trình đào tạo điều dưỡng chuyên nghiệp, trang bị kiến thức chăm sóc sức khỏe toàn diện.",
        duration: "2 năm",
        image: "/images/dieu-duong.png",
        quota: 200
    },
    {
        id: 5,
        name: "Thương mại điện tử",
        description: "Đào tạo chuyên gia thương mại điện tử với kiến thức marketing online, quản trị website.",
        duration: "2 - 3 năm",
        image: "/images/thuong-mai-dien-tu.png",
        quota: 100
    },
    {
        id: 6,
        name: "Dược sĩ",
        description: "Đào tạo dược sĩ trung cấp với kiến thức về dược phẩm, bào chế và quản lý nhà thuốc.",
        duration: "2 năm",
        image: "/images/duoc-si.png",
        quota: 100
    }
];

export type Program = typeof programs[number];
