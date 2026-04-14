import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1, width: '100%', position: 'relative' }}>
        {children}
      </div>
      <Footer />
      {/* Chatbot hỗ trợ - hiển thị trên tất cả các trang */}
      <Chatbot />
    </div>
  );
}