import Link from 'next/link';

interface ViewAllButtonProps {
    href: string;
    label: string;
    icon?: React.ReactNode;
}

export default function ViewAllButton({ href, label, icon }: ViewAllButtonProps) {
    return (
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link
                href={href}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.9rem 2.25rem',
                    background: '#ffffff',
                    color: '#2E7D32',
                    border: '2px solid #2E7D32',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                }}
            >
                {label}
                {icon || (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                )}
            </Link>
        </div>
    );
}