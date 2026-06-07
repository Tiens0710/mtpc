'use client';

import Image from 'next/image';
import { useState } from 'react';

const socials = [
    {
        name: 'Facebook',
        icon: '/facebook-f-logo.webp',
        href: 'https://www.facebook.com/people/Tr%C6%B0%E1%BB%9Dng-Trung-C%E1%BA%A5p-Mi%E1%BB%81n-T%C3%A2y/61558944491398/',
        color: '#1877F2',
    },
    {
        name: 'Zalo',
        icon: '/Icon_of_Zalo.svg.webp',
        href: 'https://zalo.me/3344176261122145662',
        color: '#0068FF',
    },
];

export default function FloatingSocial() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className="floating-social"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            {socials.map((social, i) => (
                <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floating-social-item"
                    style={{
                        '--social-color': social.color,
                        '--social-delay': `${i * 0.15}s`,
                    } as React.CSSProperties}
                    title={social.name}
                >
                    <Image
                        src={social.icon}
                        alt={social.name}
                        width={36}
                        height={36}
                        style={{ objectFit: 'contain' }}
                    />
                </a>
            ))}

            {/* Glow dot */}
            <div className="floating-social-glow" />
        </div>
    );
}
