/**
 * uploadBase64Images.ts
 *
 * Tiện ích xử lý ảnh base64 trong nội dung HTML từ CKEditor.
 *
 * Luồng hoạt động:
 * 1. Trong lúc soạn thảo: ảnh được nhúng tạm dưới dạng base64 (data:image/...)
 * 2. Khi submit form: hàm này quét HTML, tìm tất cả ảnh base64,
 *    upload từng ảnh lên server qua API /api/upload,
 *    rồi thay thế src base64 bằng URL thật từ server.
 */

/**
 * Chuyển đổi chuỗi base64 data URL thành đối tượng File
 * Ví dụ: "data:image/png;base64,iVBORw0..." → File object
 */
function base64ToFile(dataUrl: string, filename: string): File {
    // Tách phần header (data:image/png;base64) và phần dữ liệu
    const [header, data] = dataUrl.split(',');

    // Lấy MIME type từ header (ví dụ: image/png)
    const mimeMatch = header.match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

    // Decode chuỗi base64 thành binary string
    const binaryString = atob(data);

    // Chuyển binary string thành Uint8Array
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    // Tạo File object từ dữ liệu nhị phân
    return new File([byteArray], filename, { type: mimeType });
}

/**
 * Upload một ảnh base64 lên server
 * Trả về URL của ảnh đã upload trên server (/uploads/filename.ext)
 */
async function uploadSingleImage(base64DataUrl: string, index: number): Promise<string> {
    // Lấy phần mở rộng file từ MIME type (image/png → png)
    const mimeMatch = base64DataUrl.match(/data:image\/([^;]+);/);
    const ext = mimeMatch ? mimeMatch[1] : 'jpg';

    // Tạo tên file unique dựa trên thời gian và index
    const filename = `image-${Date.now()}-${index}.${ext}`;

    // Chuyển base64 thành File object
    const file = base64ToFile(base64DataUrl, filename);

    // Tạo FormData để gửi lên server
    const formData = new FormData();
    formData.append('file', file);

    // Gọi API upload
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Upload ảnh thất bại: ${response.statusText}`);
    }

    const result = await response.json();

    // API trả về { url: '/uploads/filename.ext' }
    return result.url as string;
}

/**
 * Hàm chính: quét HTML, tìm ảnh base64, upload lên server và thay thế src
 *
 * @param html - Chuỗi HTML từ CKEditor (có thể chứa ảnh base64)
 * @returns Chuỗi HTML mới với tất cả ảnh base64 đã được thay bằng URL server
 */
export async function uploadBase64Images(html: string): Promise<string> {
    // Biểu thức chính quy để tìm tất cả thẻ img có src là base64
    // Hỗ trợ cả dấu nháy đơn và nháy kép
    const base64ImgPattern = /src="(data:image\/[^"]+)"/g;

    // Thu thập tất cả chuỗi base64 cần xử lý
    const matches: Array<{ fullMatch: string; base64: string }> = [];
    let match;

    while ((match = base64ImgPattern.exec(html)) !== null) {
        matches.push({
            fullMatch: match[0],    // Toàn bộ src="data:image/..." 
            base64: match[1],       // Chỉ phần data URL
        });
    }

    // Nếu không có ảnh base64 nào thì trả về HTML gốc ngay
    if (matches.length === 0) {
        return html;
    }

    // Upload từng ảnh lên server song song để tiết kiệm thời gian
    const uploadResults = await Promise.all(
        matches.map(async ({ base64 }, index) => {
            try {
                const serverUrl = await uploadSingleImage(base64, index);
                return { base64, serverUrl, success: true };
            } catch (err) {
                // Nếu upload thất bại, giữ nguyên base64 (không làm mất dữ liệu)
                console.error(`[uploadBase64Images] Lỗi upload ảnh ${index}:`, err);
                return { base64, serverUrl: base64, success: false };
            }
        })
    );

    // Thay thế từng src base64 bằng URL server trong chuỗi HTML
    let processedHtml = html;
    for (const { base64, serverUrl } of uploadResults) {
        // Thay thế chính xác src base64 bằng src URL server
        processedHtml = processedHtml.replace(
            `src="${base64}"`,
            `src="${serverUrl}"`
        );
    }

    return processedHtml;
}
