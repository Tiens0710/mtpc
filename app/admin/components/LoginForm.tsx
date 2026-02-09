'use client';

/**
 * Component xử lý form đăng nhập Admin
 * Bao gồm: validation, toggle password visibility, redirect sau khi đăng nhập
 */

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { adminCredentials } from '../config/credentials';
import '../styles/login.css';

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Refs cho hiệu ứng mắt
    const leftEyeRef = useRef<HTMLDivElement>(null);
    const rightEyeRef = useRef<HTMLDivElement>(null);
    const leftPupilRef = useRef<HTMLDivElement>(null);
    const rightPupilRef = useRef<HTMLDivElement>(null);

    // Logic mắt di chuyển theo chuột
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!leftEyeRef.current || !rightEyeRef.current || !leftPupilRef.current || !rightPupilRef.current) return;

            // Chỉ di chuyển khi không bị mờ (đang hiện mật khẩu)
            if (showPassword) return;

            const movePupil = (pupil: HTMLDivElement, eye: HTMLDivElement, event: MouseEvent) => {
                const eyeRect = eye.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;

                const angle = Math.atan2(
                    event.clientY - eyeCenterY,
                    event.clientX - eyeCenterX
                );

                const maxDistance = 20;
                const pupilX = Math.cos(angle) * maxDistance;
                const pupilY = Math.sin(angle) * maxDistance;

                pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
            };

            movePupil(leftPupilRef.current, leftEyeRef.current, e);
            movePupil(rightPupilRef.current, rightEyeRef.current, e);
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [showPassword]);

    // Xử lý submit form
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Mô phỏng độ trễ gọi API
        await new Promise(resolve => setTimeout(resolve, 500));

        // Xác thực thông tin đăng nhập
        if (username === adminCredentials.username && password === adminCredentials.password) {
            // Đăng nhập thành công - chuyển hướng đến dashboard
            router.push('/admin/index');
        } else {
            // Đăng nhập thất bại - hiển thị lỗi
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
            setIsLoading(false);
        }
    };

    // Toggle hiển thị/ẩn mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Logo */}
                <div className="login-logo">
                    <Image
                        src="/logo.png"
                        alt="Admin Logo"
                        width={180}
                        height={60}
                        priority
                    />
                </div>

                <h1 className="login-title">Đăng nhập Admin</h1>

                <form onSubmit={handleSubmit} className="login-form">
                    {/* Ô nhập Tên đăng nhập */}
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Tên đăng nhập
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên đăng nhập"
                            required
                            autoComplete="username"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Ô nhập Mật khẩu */}
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Mật khẩu
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                required
                                autoComplete="current-password"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                disabled={isLoading}
                            >
                                {showPassword ? (
                                    // Biểu tượng ẩn mắt
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    // Biểu tượng hiện mắt
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Thông báo lỗi */}
                    {error && <div className="error-message">{error}</div>}

                    {/* Nút Đăng nhập */}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>

            {/* Hiệu ứng mắt hoạt hình */}
            <div className="eyes-container">
                <div
                    className={`eye ${showPassword ? 'blurred' : ''}`}
                    ref={leftEyeRef}
                >
                    <div className="pupil" ref={leftPupilRef}></div>
                </div>
                <div
                    className={`eye ${showPassword ? 'blurred' : ''}`}
                    ref={rightEyeRef}
                >
                    <div className="pupil" ref={rightPupilRef}></div>
                </div>
            </div>
        </div>
    );
}
