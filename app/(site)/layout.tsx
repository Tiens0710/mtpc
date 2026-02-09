import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* Chatbot hỗ trợ - hiển thị trên tất cả các trang */}
      <Chatbot />
    </>
  );
}