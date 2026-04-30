'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './chatbot.css';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    time: string;
    responseTime?: number;
}

const WS_URL = process.env.NEXT_PUBLIC_CHATBOT_WS_URL || 'ws://localhost:4895';
const SESSION_KEY = 'mtpc_chat_session_id';

function getCurrentTime(): string {
    return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

function getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return crypto.randomUUID();
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
}

export default function Chatbot() {
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Xin chào! 👋 Tôi là Nhi, trợ lý tư vấn tuyển sinh của Trường Trung cấp Miền Tây. Tôi có thể giúp gì cho bạn?',
            isUser: false,
            time: getCurrentTime(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timerMs, setTimerMs] = useState(0);
    const [isConnected, setIsConnected] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const currentBotIdRef = useRef<number | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isLoading) {
            setTimerMs(0);
            const start = Date.now();
            interval = setInterval(() => {
                setTimerMs(Date.now() - start);
            }, 100);
        } else {
            setTimerMs(0);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const connectWS = useCallback((): WebSocket => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            return wsRef.current;
        }

        const ws = new WebSocket(WS_URL);
        wsRef.current = ws;

        ws.onopen = () => setIsConnected(true);
        ws.onclose = () => { setIsConnected(false); wsRef.current = null; };
        ws.onerror = () => setIsConnected(false);

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const botId = currentBotIdRef.current;
                
                if (data.type === 'token' && botId) {
                    setMessages(prev => prev.map(m => m.id === botId ? { ...m, text: m.text + data.text } : m));
                } else if (data.type === 'navigate') {
                    if (data.url.startsWith('http')) window.open(data.url, '_blank');
                    else router.push(data.url);
                } else if (data.type === 'error' && botId) {
                    setMessages(prev => prev.map(m => m.id === botId ? { ...m, text: 'Có lỗi xảy ra. Vui lòng thử lại!' } : m));
                    setIsLoading(false);
                    currentBotIdRef.current = null;
                } else if (data.type === 'done') {
                    setIsLoading(false);
                    if (botId) {
                        setMessages(prev => prev.map(m => {
                            if (m.id === botId) {
                                // Lấy thời gian bắt đầu từ localStorage hoặc tạm tính
                                const startTime = Number(sessionStorage.getItem(`msg_time_${botId}`) || Date.now() - timerMs);
                                const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
                                return { ...m, responseTime: parseFloat(elapsed) };
                            }
                            return m;
                        }));
                    }
                    currentBotIdRef.current = null;
                }
            } catch (e) { }
        };
        return ws;
    }, [router, timerMs]);

    useEffect(() => {
        if (isOpen && !wsRef.current) connectWS();
    }, [isOpen, connectWS]);

    const handleSendMessage = () => {
        if (!inputValue.trim() || isLoading) return;

        const userText = inputValue.trim();
        const userMessage: Message = { id: Date.now(), text: userText, isUser: true, time: getCurrentTime() };
        
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        const botId = Date.now() + 1;
        currentBotIdRef.current = botId;
        sessionStorage.setItem(`msg_time_${botId}`, Date.now().toString()); // Lưu thời gian bắt đầu

        setMessages(prev => [...prev, { id: botId, text: '', isUser: false, time: getCurrentTime() }]);

        try {
            const ws = connectWS();
            const payload = JSON.stringify({
                type: 'init',
                message: userText,
                session_id: getOrCreateSessionId(),
                page_context: pathname
            });

            if (ws.readyState === WebSocket.OPEN) {
                ws.send(payload);
            } else {
                ws.addEventListener('open', () => ws.send(payload), { once: true });
            }
        } catch (err) {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleChat = () => setIsOpen(prev => !prev);

    return (
        <>
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-header-avatar">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2M7.5 13A2.5 2.5 0 005 15.5 2.5 2.5 0 007.5 18a2.5 2.5 0 002.5-2.5A2.5 2.5 0 007.5 13m9 0a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-2.5-2.5z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="chat-header-title">Nhi — Tư vấn MTPC</h3>
                            <p className="chat-header-status">
                                <span className="status-dot" style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: isConnected ? '#4ade80' : '#f87171', marginRight: 6 }} />
                                {isConnected ? 'Trực tuyến' : 'Đang kết nối...'}
                            </p>
                        </div>
                    </div>
                    <button className="chat-close-btn" onClick={toggleChat} aria-label="Đóng chat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="chat-body">
                    {messages.map((message) => (
                        <div key={message.id} className={`chat-message ${message.isUser ? 'user' : 'bot'}`}>
                            <div className="message-content">
                                {message.text || (
                                    isLoading && !message.isUser ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="typing-indicator"><span /><span /><span /></div>
                                            <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '500' }}>{(timerMs / 1000).toFixed(1)}s</span>
                                        </div>
                                    ) : null
                                )}
                            </div>
                            <span className="message-time">
                                {message.time}
                                {message.responseTime && (<span style={{ marginLeft: '6px', color: '#16a34a', fontSize: '0.65rem' }}>({message.responseTime}s)</span>)}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-footer">
                    <div className="chat-input-wrapper">
                        <input type="text" className="chat-input" placeholder="Nhập câu hỏi..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} disabled={isLoading} autoComplete="off" />
                        <button className="chat-send-btn" onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading}>
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <button className={`chat-bubble ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
                <svg className="chat-bubble-icon" viewBox="0 0 24 24" fill="currentColor">
                    {isOpen ? <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none" /> : <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />}
                </svg>
            </button>
        </>
    );
}
