'use client';

/**
 * Component AnimatedEye
 * Hiển thị đôi mắt hoạt hình theo dõi con trỏ chuột
 * Có hiệu ứng làm mờ khi mật khẩu được hiển thị
 */

import { useRef, useEffect } from 'react';
import '../styles/login.css';

interface AnimatedEyeProps {
    isBlurred: boolean;
}

export default function AnimatedEye({ isBlurred }: AnimatedEyeProps) {
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
            if (isBlurred) return;

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
    }, [isBlurred]);

    return (
        <div className="eyes-container">
            <div
                className={`eye ${isBlurred ? 'blurred' : ''}`}
                ref={leftEyeRef}
            >
                <div className="pupil" ref={leftPupilRef}></div>
            </div>
            <div
                className={`eye ${isBlurred ? 'blurred' : ''}`}
                ref={rightEyeRef}
            >
                <div className="pupil" ref={rightPupilRef}></div>
            </div>
        </div>
    );
}
