/**
 * API Route: POST /api/upload
 *
 * Nhận file ảnh từ client (form-data), lưu vào thư mục public/uploads/,
 * và trả về URL công khai để dùng trong nội dung bài viết.
 *
 * Luồng:
 * - Client gửi POST với FormData chứa trường 'file'
 * - Server lưu file vào public/uploads/ với tên unique
 * - Server trả về { url: '/uploads/filename.ext' }
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Thư mục lưu ảnh (public/uploads/ được phục vụ tĩnh bởi Next.js)
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: NextRequest) {
    try {
        // Đọc form data từ request
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        // Kiểm tra file có tồn tại không
        if (!file) {
            return NextResponse.json(
                { error: 'Không tìm thấy file trong request' },
                { status: 400 }
            );
        }

        // Kiểm tra loại file (chỉ cho phép ảnh)
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'Chỉ chấp nhận file ảnh' },
                { status: 400 }
            );
        }

        // Kiểm tra kích thước file (tối đa 10MB)
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'File ảnh không được vượt quá 10MB' },
                { status: 400 }
            );
        }

        // Lấy phần mở rộng file từ MIME type hoặc tên file gốc
        // Ví dụ: image/jpeg → jpg, image/png → png
        const mimeToExt: Record<string, string> = {
            'image/jpeg': 'jpg',
            'image/jpg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/webp': 'webp',
            'image/svg+xml': 'svg',
            'image/bmp': 'bmp',
        };
        const ext = mimeToExt[file.type] || 'jpg';

        // Tạo tên file unique bằng timestamp + số ngẫu nhiên
        const uniqueName = `upload-${Date.now()}-${Math.floor(Math.random() * 10000)}.${ext}`;

        // Đảm bảo thư mục uploads tồn tại, tạo nếu chưa có
        await mkdir(UPLOAD_DIR, { recursive: true });

        // Đọc nội dung file thành buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ghi file vào đĩa
        const filePath = path.join(UPLOAD_DIR, uniqueName);
        await writeFile(filePath, buffer);

        // Trả về URL công khai của ảnh đã upload
        const publicUrl = `/uploads/${uniqueName}`;
        return NextResponse.json({ url: publicUrl }, { status: 200 });

    } catch (err) {
        console.error('[API /api/upload] Lỗi upload ảnh:', err);
        return NextResponse.json(
            { error: 'Lỗi server khi xử lý ảnh' },
            { status: 500 }
        );
    }
}
