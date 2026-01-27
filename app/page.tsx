import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
