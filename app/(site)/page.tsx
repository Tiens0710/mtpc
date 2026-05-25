import HeroSection from './components/HeroSection';
import HighlightsSection from './components/HighlightsSection';
import VisionMission from './components/VisionMission';
import IntroVideoSection from './components/IntroVideoSection';
import PartnersSection from './components/PartnersSection';
import AboutSection from './components/AboutSection';
import NewsSection from './components/NewsSection';
import FeaturedProgramsSection from './components/FeaturedProgramsSection';
import EnterpriseSection from './components/EnterpriseSection';
import FacilitiesSection from './components/FacilitiesSection';
import WhyChooseMTPCSection from './components/WhyChooseMTPCSection';
import CTASection from './components/CTASection';

export default function Home() {
    return (
        <>
            <main>
                <HeroSection />
                <AboutSection />
                <HighlightsSection />
                <WhyChooseMTPCSection />
                <NewsSection />
                <VisionMission />
                <FeaturedProgramsSection />
                <IntroVideoSection />
                <PartnersSection />
                <CTASection />
            </main>
        </>
    );
}

