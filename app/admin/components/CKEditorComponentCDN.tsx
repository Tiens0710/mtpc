'use client';

import { useEffect, useRef } from 'react';

// =============================================
// Khai báo kiểu cho CKEditor 5 được tải qua CDN
// =============================================
declare global {
    interface Window {
        ClassicEditor: any;
    }
}

// =============================================
// Props của component
// =============================================
interface CKEditorComponentCDNProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

// =============================================
// Bộ chuyển đổi ngôn ngữ tiếng Việt cho toolbar CKEditor 5
// Dùng khi gói locale 'vi' không tải được từ CDN
// =============================================
const VIET_TRANSLATIONS: Record<string, string> = {
    // Định dạng văn bản cơ bản
    'Bold': 'Đậm',
    'Italic': 'Nghiêng',
    'Underline': 'Gạch chân',
    'Strikethrough': 'Gạch ngang',
    'Subscript': 'Chỉ số dưới',
    'Superscript': 'Chỉ số trên',
    'Remove Format': 'Xóa định dạng',

    // Tiêu đề
    'Heading': 'Tiêu đề',
    'Paragraph': 'Đoạn văn',
    'Heading 1': 'Tiêu đề 1',
    'Heading 2': 'Tiêu đề 2',
    'Heading 3': 'Tiêu đề 3',
    'Heading 4': 'Tiêu đề 4',
    'Heading 5': 'Tiêu đề 5',
    'Heading 6': 'Tiêu đề 6',

    // Danh sách
    'Bulleted List': 'Danh sách không thứ tự',
    'Numbered List': 'Danh sách có thứ tự',
    'To-do List': 'Danh sách việc cần làm',
    'Decrease list indent': 'Giảm thụt lề',
    'Increase list indent': 'Tăng thụt lề',

    // Căn chỉnh
    'Text alignment': 'Căn chỉnh văn bản',
    'Align left': 'Căn trái',
    'Align right': 'Căn phải',
    'Align center': 'Căn giữa',
    'Justify': 'Căn đều',

    // Thụt lề
    'Indent': 'Tăng thụt lề',
    'Outdent': 'Giảm thụt lề',

    // Liên kết
    'Link': 'Liên kết',
    'Insert Link': 'Chèn liên kết',
    'Edit link': 'Sửa liên kết',
    'Unlink': 'Xóa liên kết',
    'Open link in new tab': 'Mở liên kết trong tab mới',
    'This link has no URL': 'Liên kết này không có URL',

    // Hình ảnh
    'Insert image': 'Chèn hình ảnh',
    'Image': 'Hình ảnh',
    'Upload from computer': 'Tải từ máy tính',
    'Image from URL': 'Hình ảnh từ URL',
    'Insert image via URL': 'Chèn hình ảnh qua URL',
    'Image URL': 'URL hình ảnh',
    'Caption for the image': 'Chú thích hình ảnh',
    'Caption for image: %0': 'Chú thích hình ảnh: %0',
    'Full size image': 'Hình ảnh toàn kích thước',
    'Side image': 'Hình ảnh cạnh bên',
    'Left aligned image': 'Hình ảnh căn trái',
    'Centered image': 'Hình ảnh căn giữa',
    'Right aligned image': 'Hình ảnh căn phải',
    'Resize image': 'Thay đổi kích thước hình ảnh',
    'Original': 'Gốc',
    'Resize image to %0': 'Thay đổi kích thước thành %0',
    'Resize image to the original size': 'Khôi phục kích thước gốc',
    'Change image text alternative': 'Thay đổi văn bản thay thế',
    'Text alternative': 'Văn bản thay thế',
    'Update image URL': 'Cập nhật URL hình ảnh',
    'Uploading image': 'Đang tải lên hình ảnh',

    // Bảng
    'Insert table': 'Chèn bảng',
    'Table': 'Bảng',
    'Table properties': 'Thuộc tính bảng',
    'Merge cells': 'Gộp ô',
    'Unmerge cells': 'Tách ô',
    'Insert column left': 'Chèn cột bên trái',
    'Insert column right': 'Chèn cột bên phải',
    'Delete column': 'Xóa cột',
    'Column': 'Cột',
    'Insert row above': 'Chèn hàng phía trên',
    'Insert row below': 'Chèn hàng phía dưới',
    'Delete row': 'Xóa hàng',
    'Row': 'Hàng',
    'Select row': 'Chọn hàng',
    'Select column': 'Chọn cột',
    'Select all': 'Chọn tất cả',

    // Trích dẫn
    'Block quote': 'Trích dẫn',

    // Phân cách
    'Horizontal line': 'Đường phân cách ngang',

    // Hoàn tác / Làm lại
    'Undo': 'Hoàn tác',
    'Redo': 'Làm lại',

    // Màu sắc
    'Font Color': 'Màu chữ',
    'Font Background Color': 'Màu nền chữ',
    'Font color': 'Màu chữ',
    'Font background color': 'Màu nền chữ',

    // Tô sáng
    'Highlight': 'Tô sáng',
    'Yellow marker': 'Bút dạ vàng',
    'Green marker': 'Bút dạ xanh lá',
    'Pink marker': 'Bút dạ hồng',
    'Blue marker': 'Bút dạ xanh dương',
    'Red pen': 'Bút đỏ',
    'Green pen': 'Bút xanh lá',

    // Cỡ chữ
    'Font Size': 'Cỡ chữ',
    'Font size': 'Cỡ chữ',
    'Default': 'Mặc định',
    'Tiny': 'Rất nhỏ',
    'Small': 'Nhỏ',
    'Big': 'To',
    'Huge': 'Rất to',

    // Font chữ
    'Font Family': 'Font chữ',
    'Font family': 'Font chữ',

    // Phương tiện
    'Insert media': 'Chèn phương tiện',
    'Media URL': 'URL phương tiện',

    // Mã nguồn
    'Code': 'Mã nguồn nội tuyến',
    'Code Block': 'Khối mã nguồn',
    'Insert code block': 'Chèn khối mã nguồn',

    // Thanh công cụ & giao diện
    'Edit block': 'Sửa khối',
    'Click to edit block': 'Nhấn để sửa khối',
    'Type or paste your content here!': 'Nhập hoặc dán nội dung tại đây!',
    'Rich Text Editor': 'Trình soạn thảo văn bản',
    'Rich Text Editor, %0': 'Trình soạn thảo - %0',
    'Editor toolbar': 'Thanh công cụ',
    'Dropdown menu': 'Menu thả xuống',
    'Find and replace': 'Tìm và thay thế',

    // Thông báo
    'Cannot upload file:': 'Không thể tải lên tệp:',
    'Upload in progress': 'Đang tải lên',
    'Upload failed': 'Tải lên thất bại',
    'Couldn\'t load image': 'Không thể tải hình ảnh',
};

// =============================================
// Hàm áp dụng bản dịch tiếng Việt vào CKEditor
// =============================================
function applyVietnameseTranslations(editor: any) {
    // Áp dụng bản dịch vào hệ thống i18n của CKEditor
    const locale = editor.locale;
    if (!locale) return;

    const originalT = locale.t.bind(locale);

    // Ghi đè hàm dịch để dùng bảng chuyển ngữ tiếng Việt
    locale.t = (str: string, values?: any[]) => {
        if (VIET_TRANSLATIONS[str]) {
            const translated = VIET_TRANSLATIONS[str];
            // Thay thế placeholder %0, %1, ... nếu có
            if (values && values.length) {
                return translated.replace(/%(\d+)/g, (_: string, i: string) => values[parseInt(i)] ?? '');
            }
            return translated;
        }
        return originalT(str, values);
    };
}

// =============================================
// Hàm tải script CKEditor 5 từ CDN
// =============================================
function loadCKEditorScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        // Nếu đã tải rồi thì không tải lại
        if (window.ClassicEditor) {
            resolve();
            return;
        }

        // Kiểm tra script đang được tải
        const existingScript = document.getElementById('ckeditor5-cdn');
        if (existingScript) {
            existingScript.addEventListener('load', () => resolve());
            existingScript.addEventListener('error', () => reject(new Error('Không thể tải CKEditor từ CDN')));
            return;
        }

        // Tạo và chèn script tag
        const script = document.createElement('script');
        script.id = 'ckeditor5-cdn';
        script.src = 'https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Không thể tải CKEditor từ CDN'));
        document.head.appendChild(script);
    });
}

// =============================================
// Component CKEditor 5 tải qua CDN
// =============================================
export default function CKEditorComponentCDN({
    value,
    onChange,
    placeholder = 'Nhập nội dung bài viết tại đây...',
}: CKEditorComponentCDNProps) {
    // Tham chiếu đến phần tử DOM sẽ chứa editor
    const editorRef = useRef<HTMLDivElement>(null);
    // Tham chiếu đến instance của editor để có thể hủy khi unmount
    const editorInstanceRef = useRef<any>(null);
    // Cờ theo dõi trạng thái khởi tạo để tránh khởi tạo 2 lần
    const isInitializingRef = useRef(false);

    useEffect(() => {
        // Nếu đang khởi tạo hoặc đã có instance thì bỏ qua
        if (isInitializingRef.current || editorInstanceRef.current) return;
        isInitializingRef.current = true;

        // =========================================
        // Bộ chuyển đổi ảnh Base64 (dùng trong lúc soạn thảo)
        // Ảnh được nhúng tạm dưới dạng base64 để xem trước ngay lập tức.
        // Khi form được submit, hàm uploadBase64Images sẽ thay thế
        // các src base64 này bằng URL thật từ server.
        // =========================================
        function Base64UploadAdapter(loader: any) {
            return {
                upload() {
                    return loader.file.then(
                        (file: File) =>
                            new Promise<{ default: string }>((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    // Trả về data URL base64 để hiển thị tạm trong editor
                                    resolve({ default: reader.result as string });
                                };
                                reader.onerror = (err) => {
                                    reject(err);
                                };
                                reader.readAsDataURL(file);
                            })
                    );
                },
                abort() {
                    // Không cần xử lý abort vì là base64 local
                },
            };
        }

        // Plugin đăng ký Base64UploadAdapter vào CKEditor
        function Base64UploadAdapterPlugin(editor: any) {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
                return Base64UploadAdapter(loader);
            };
        }

        // Khởi tạo editor sau khi tải CDN thành công
        const initEditor = async () => {
            try {
                await loadCKEditorScript();

                if (!editorRef.current || !window.ClassicEditor) return;

                const editor = await window.ClassicEditor.create(editorRef.current, {
                    // Cấu hình plugin upload để nhúng ảnh base64 tạm thời
                    extraPlugins: [Base64UploadAdapterPlugin],

                    // Cấu hình toolbar đầy đủ với tất cả tính năng cần thiết
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'fontSize',
                            'fontFamily',
                            '|',
                            'fontColor',
                            'fontBackgroundColor',
                            'highlight',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            'code',
                            'removeFormat',
                            '|',
                            'link',
                            'insertImage',
                            'insertTable',
                            'blockQuote',
                            'codeBlock',
                            'horizontalLine',
                            '|',
                            'alignment',
                            '|',
                            'bulletedList',
                            'numberedList',
                            'outdent',
                            'indent',
                            '|',
                            'undo',
                            'redo',
                            '|',
                            'findAndReplace',
                        ],
                        shouldNotGroupWhenFull: true,
                    },

                    // Cấu hình các cấp tiêu đề
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Đoạn văn', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Tiêu đề 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Tiêu đề 2', class: 'ck-heading_heading2' },
                            { model: 'heading3', view: 'h3', title: 'Tiêu đề 3', class: 'ck-heading_heading3' },
                            { model: 'heading4', view: 'h4', title: 'Tiêu đề 4', class: 'ck-heading_heading4' },
                        ],
                    },

                    // Cấu hình cỡ chữ
                    fontSize: {
                        options: [10, 11, 12, 14, 'default', 16, 18, 20, 24, 28, 36],
                        supportAllValues: false,
                    },

                    // Cấu hình font chữ
                    fontFamily: {
                        options: [
                            'default',
                            'Arial, Helvetica, sans-serif',
                            'Times New Roman, Times, serif',
                            'Courier New, Courier, monospace',
                            'Verdana, Geneva, sans-serif',
                            'Georgia, serif',
                            'Trebuchet MS, Helvetica, sans-serif',
                        ],
                        supportAllValues: false,
                    },

                    // Cấu hình ảnh: cho phép resize và đổi style
                    image: {
                        toolbar: [
                            'imageStyle:block',
                            'imageStyle:side',
                            '|',
                            'toggleImageCaption',
                            'imageTextAlternative',
                            '|',
                            'resizeImage',
                        ],
                        resizeOptions: [
                            { name: 'resizeImage:original', value: null, label: 'Gốc' },
                            { name: 'resizeImage:25', value: '25', label: '25%' },
                            { name: 'resizeImage:50', value: '50', label: '50%' },
                            { name: 'resizeImage:75', value: '75', label: '75%' },
                        ],
                        resizeUnit: '%',
                    },

                    // Cấu hình bảng
                    table: {
                        contentToolbar: [
                            'tableColumn',
                            'tableRow',
                            'mergeTableCells',
                            'tableProperties',
                            'tableCellProperties',
                        ],
                    },

                    // Giá trị ban đầu của editor
                    initialData: value || '',

                    // Placeholder khi editor rỗng
                    placeholder,
                });

                // Lưu instance để có thể hủy khi unmount
                editorInstanceRef.current = editor;

                // Áp dụng bản dịch tiếng Việt vào CKEditor
                applyVietnameseTranslations(editor);

                // Lắng nghe sự kiện thay đổi nội dung để đồng bộ với React state
                editor.model.document.on('change:data', () => {
                    const newData = editor.getData();
                    onChange(newData);
                });
            } catch (err) {
                console.error('[CKEditor] Lỗi khởi tạo editor:', err);
            } finally {
                isInitializingRef.current = false;
            }
        };

        initEditor();

        // Dọn dẹp: hủy editor khi component bị unmount
        return () => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current
                    .destroy()
                    .catch((err: any) => console.error('[CKEditor] Lỗi khi hủy editor:', err));
                editorInstanceRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Đồng bộ giá trị từ bên ngoài vào editor (ví dụ: reset form)
    // Chỉ cập nhật khi giá trị thực sự thay đổi so với nội dung editor
    useEffect(() => {
        const editor = editorInstanceRef.current;
        if (!editor) return;

        const currentData = editor.getData();
        if (currentData !== value) {
            editor.setData(value || '');
        }
    }, [value]);

    return (
        // Wrapper bọc phần tử DOM mà CKEditor sẽ gắn vào
        <div className="ckeditor-wrapper">
            <div ref={editorRef} />
        </div>
    );
}
