'use client';

import { useState, useRef, useEffect } from 'react';
import './chatbot.css';

// === ĐỊNH NGHĨA KIỂU DỮ LIỆU ===
interface Message {
    id: number;
    text: string;
    isUser: boolean;
    time: string;
}

// === COMPONENT CHÍNH: CHATBOT ===
export default function Chatbot() {
    // State quản lý mở/đóng chat window
    const [isOpen, setIsOpen] = useState(false);

    // State lưu trữ danh sách tin nhắn
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Xin chào! 👋 Tôi là trợ lý ảo của Trường Trung cấp Miền Tây. Tôi có thể giúp gì cho bạn?',
            isUser: false,
            time: getCurrentTime()
        }
    ]);

    // State lưu nội dung input
    const [inputValue, setInputValue] = useState('');

    // Ref để scroll xuống tin nhắn mới nhất
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // === HÀM TIỆN ÍCH ===

    // Lấy thời gian hiện tại dạng HH:MM
    function getCurrentTime(): string {
        const now = new Date();
        return now.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Scroll xuống tin nhắn mới nhất
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll khi có tin nhắn mới
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // === XỬ LÝ GỬI TIN NHẮN ===
    const handleSendMessage = () => {
        // Kiểm tra input không rỗng
        if (!inputValue.trim()) return;

        // Tạo tin nhắn của user
        const userMessage: Message = {
            id: Date.now(),
            text: inputValue.trim(),
            isUser: true,
            time: getCurrentTime()
        };

        // Thêm tin nhắn user vào danh sách
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Giả lập phản hồi từ bot (sau 1 giây)
        setTimeout(() => {
            const botMessage: Message = {
                id: Date.now() + 1,
                text: getBotResponse(inputValue.trim()),
                isUser: false,
                time: getCurrentTime()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    // Hàm giả lập phản hồi của bot
    function getBotResponse(userInput: string): string {
        const input = userInput.toLowerCase();

        if (input.includes('tuyển sinh') || input.includes('đăng ký')) {
            return 'Để đăng ký tuyển sinh, bạn có thể truy cập mục Tuyển Sinh trên website hoặc liên hệ hotline: 0xxx.xxx.xxx nhé! 📞';
        }
        if (input.includes('học phí') || input.includes('chi phí')) {
            return 'Học phí của trường rất cạnh tranh. Bạn vui lòng liên hệ phòng Đào tạo để được tư vấn chi tiết nhé! 💰';
        }
        if (input.includes('ngành') || input.includes('đào tạo')) {
            return 'Trường đang đào tạo các ngành: Y sĩ đa khoa, Điều dưỡng, Dược, Điện tử, Cơ khí, Thương mại điện tử. Bạn quan tâm ngành nào? 📚';
        }
        if (input.includes('địa chỉ') || input.includes('ở đâu')) {
            return 'Trường Trung cấp Miền Tây tọa lạc tại địa chỉ [cần cập nhật]. Bạn có thể xem bản đồ ở phần Liên hệ! 📍';
        }
        if (input.includes('xin chào') || input.includes('hello') || input.includes('hi')) {
            return 'Chào bạn! Rất vui được hỗ trợ bạn. Bạn cần tìm hiểu thông tin gì ạ? 😊';
        }

        return 'Cảm ơn bạn đã liên hệ! Để được hỗ trợ tốt nhất, vui lòng gọi hotline hoặc để lại thông tin, chúng tôi sẽ liên hệ lại sớm nhất! 🙏';
    }

    // Xử lý phím Enter
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Toggle mở/đóng chat window
    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* === KHUNG CHAT === */}
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-header-avatar">
                            {/* Icon Robot */}
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2M7.5 13A2.5 2.5 0 005 15.5 2.5 2.5 0 007.5 18a2.5 2.5 0 002.5-2.5A2.5 2.5 0 007.5 13m9 0a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-2.5-2.5z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="chat-header-title">Chatbot Hỗ Trợ</h3>
                            <p className="chat-header-status">Trực tuyến</p>
                        </div>
                    </div>

                    {/* Nút đóng */}
                    <button
                        className="chat-close-btn"
                        onClick={toggleChat}
                        aria-label="Đóng chat"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body - Khu vực tin nhắn */}
                <div className="chat-body">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chat-message ${message.isUser ? 'user' : 'bot'}`}
                        >
                            <div className="message-content">
                                {message.text}
                            </div>
                            <span className="message-time">{message.time}</span>
                        </div>
                    ))}
                    {/* Ref để scroll */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Footer - Ô nhập liệu */}
                <div className="chat-footer">
                    <div className="chat-input-wrapper">
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Nhập câu hỏi của bạn..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="chat-send-btn"
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            aria-label="Gửi tin nhắn"
                        >
                            {/* Icon gửi */}
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* === BONG BÓNG CHAT === */}
            <button
                className={`chat-bubble ${isOpen ? 'active' : ''}`}
                onClick={toggleChat}
                aria-label="Mở chat hỗ trợ"
            >
                <svg className="chat-bubble-icon" viewBox="0 0 24 24" fill="currentColor">
                    {isOpen ? (
                        // Icon X khi đang mở
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none" />
                    ) : (
                        // Icon chat khi đang đóng
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
                    )}
                </svg>
            </button>
        </>
    );
}
