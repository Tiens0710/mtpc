import type { Metadata } from 'next';
import CmeClient from './CmeClient';

export const metadata: Metadata = {
  title: 'Cập nhật kiến thức CME',
  description: 'Lịch học và thông báo chiêu sinh các chương trình đào tạo liên tục CME tại Trường Trung cấp Miền Tây.',
};

export default function CmePage() {
  return <CmeClient />;
}
