// File cấu hình chứa thông tin đăng nhập admin
// Dễ dàng cập nhật credentials tại đây
// Lưu ý: Trong production, thông tin đăng nhập nên được lưu trữ ở backend và xác thực qua API

export const adminCredentials = {
    username: 'admin',
    password: 'carodong'
} as const;

export type AdminCredentials = typeof adminCredentials;
