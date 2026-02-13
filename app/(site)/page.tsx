import HeroSection from './components/HeroSection';
import VisionMission from './components/VisionMission';
import IntroVideoSection from './components/IntroVideoSection';
import PartnersSection from './components/PartnersSection';
import AboutSection from './components/AboutSection';
import NewsSection from './components/NewsSection';
import EnterpriseSection from './components/EnterpriseSection';
import FacilitiesSection from './components/FacilitiesSection';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1 }}>
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <VisionMission />
        <IntroVideoSection />
        <PartnersSection />
      </main>
    </div>
  );
}

