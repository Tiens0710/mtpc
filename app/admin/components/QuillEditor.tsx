'use client';

import { useEffect, useRef } from 'react';

// Định nghĩa kiểu cho Quill (vì dùng CDN nên không có type definition sẵn)
declare global {
    interface Window {
        Quill: any;
    }
}

interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function QuillEditor({ value, onChange, placeholder }: QuillEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);

    useEffect(() => {
        const initQuill = () => {
            if (editorRef.current && !quillRef.current && window.Quill) {
                // Khởi tạo Quill
                quillRef.current = new window.Quill(editorRef.current, {
                    theme: 'snow',
                    placeholder: placeholder || 'Nhập nội dung bài viết...',
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['link', 'image'],
                            ['clean']
                        ]
                    }
                });

                // Set initial value
                if (value) {
                    quillRef.current.root.innerHTML = value;
                }

                // Listen for changes
                quillRef.current.on('text-change', () => {
                    const content = quillRef.current.root.innerHTML;
                    onChange(content);
                });
            }
        };

        if (window.Quill) {
            initQuill();
            return;
        }

        // Load CSS dynamically
        const CSS_ID = 'quill-css-cdn';
        if (!document.getElementById(CSS_ID)) {
            const link = document.createElement('link');
            link.id = CSS_ID;
            link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        const SCRIPT_ID = 'quill-js-cdn';
        let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement;

        if (!script) {
            script = document.createElement('script');
            script.id = SCRIPT_ID;
            script.src = 'https://cdn.quilljs.com/1.3.6/quill.min.js';
            script.async = true;
            document.body.appendChild(script);
        }

        const handleLoad = () => initQuill();
        script.addEventListener('load', handleLoad);

        return () => {
            script.removeEventListener('load', handleLoad);
        };
    }, []);

    // Update content if value changes externally (optional, careful with loops)
    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            // Chỉ update nếu khác biệt để tránh mất cursor
            // quillRef.current.root.innerHTML = value; 
        }
    }, [value]);

    return (
        <div className="quill-editor-container">
            <div ref={editorRef} style={{ height: '300px', background: 'white' }} />
        </div>
    );
}
