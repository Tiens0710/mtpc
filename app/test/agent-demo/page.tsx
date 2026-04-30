'use client';

import { useState } from 'react';
import { AgentRouter } from '@/lib/agent-router';
import RedirectHandler from '@/app/components/Agent/RedirectHandler';

export default function AgentDemoPage() {
  const [query, setQuery] = useState('');
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('Chào bạn! Tôi có thể giúp bạn tìm thông tin gì về trường MTPC?');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate Agent logic
    const url = AgentRouter.findUrl(query);
    
    if (url) {
      setMessage(`Đã tìm thấy thông tin bạn yêu cầu về "${query}". Tôi sẽ đưa bạn đến trang chính thức của trường ngay bây giờ.`);
      setTargetUrl(url);
    } else {
      setMessage(`Xin lỗi, tôi chưa tìm thấy trang chính xác cho "${query}". Bạn có thể thử các từ khóa như "học phí", "tuyển sinh", "y sĩ"...`);
      setTargetUrl(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">MTPC Agent - Redirect Demo</h1>
      
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 bg-blue-600 text-white">
          <p className="text-lg opacity-90">{message}</p>
        </div>

        <form onSubmit={handleSearch} className="p-6 border-b border-gray-100 bg-gray-50 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ví dụ: 'tuyen sinh', 'duoc si', 'hoc phi'..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-md active:scale-95"
          >
            Gửi
          </button>
        </form>

        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Trình quản lý chuyển hướng</h2>
          {targetUrl ? (
            <RedirectHandler 
              targetUrl={targetUrl} 
              autoRedirect={false} // Disabled for demo so you can see the UI
              onRedirectStart={() => console.log('Redirecting to:', targetUrl)}
            />
          ) : (
            <p className="text-sm text-gray-400 italic">Chưa có lệnh chuyển hướng nào được kích hoạt.</p>
          )}
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500 line-relaxed">
        <p className="font-bold mb-2">Hướng dẫn:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Dữ liệu được lấy từ file <code>data/mtpc_knowledge_base/mtpc_data_agent.json</code>.</li>
          <li>Bạn có thể nhập các từ khóa tiếng Việt có dấu hoặc không dấu.</li>
          <li>Thành phần <code>RedirectHandler</code> có thể cấu hình để <code>autoRedirect={true}</code> (mặc định) để chuyển hướng ngay lập tức.</li>
        </ul>
      </div>
    </div>
  );
}
