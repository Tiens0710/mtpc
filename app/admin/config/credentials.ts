// File cấu hình chứa thông tin đăng nhập admin
// Dễ dàng cập nhật credentials tại đây
// NOTE: Trong production, credentials nên được lưu trữ ở backend và xác thực qua API

export const adminCredentials = {
    username: 'admin',
    password: 'carodong'
} as const;

export type AdminCredentials = typeof adminCredentials;
