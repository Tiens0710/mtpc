'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectHandlerProps {
  targetUrl: string | null;
  onRedirectStart?: () => void;
  autoRedirect?: boolean;
}

/**
 * RedirectHandler is a client-side component that performs navigation
 * when the Agent determines a target URL.
 */
export default function RedirectHandler({ 
  targetUrl, 
  onRedirectStart,
  autoRedirect = true 
}: RedirectHandlerProps) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (targetUrl && autoRedirect && !isRedirecting) {
      handleRedirect(targetUrl);
    }
  }, [targetUrl, autoRedirect, isRedirecting]);

  const handleRedirect = (url: string) => {
    setIsRedirecting(true);
    if (onRedirectStart) onRedirectStart();

    // Check if it's an internal or external URL
    if (url.startsWith('http')) {
      // For the school website, we might want to open in a new tab 
      // or redirect the current page. To "automatically take the user there", 
      // we'll use window.location.href for external school links.
      window.location.href = url;
    } else {
      router.push(url);
    }
  };

  if (!targetUrl || isRedirecting) return null;

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-4 animate-in fade-in duration-500">
      <p className="text-blue-800 text-sm mb-2">
        Tôi đã tìm thấy trang phù hợp với yêu cầu của bạn.
      </p>
      <button
        onClick={() => handleRedirect(targetUrl)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Đi đến trang ngay
      </button>
    </div>
  );
}
