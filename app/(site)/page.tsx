import HeroSection from './components/HeroSection';
import HighlightsSection from './components/HighlightsSection';
import StatsSection from './components/StatsSection';
import VisionMission from './components/VisionMission';
import IntroVideoSection from './components/IntroVideoSection';
import TestimonialsSection from './components/TestimonialsSection';
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
                <TestimonialsSection />
                <IntroVideoSection />
                <StatsSection />
                <PartnersSection />
                <CTASection />
            </main>
        </>
    );
}

