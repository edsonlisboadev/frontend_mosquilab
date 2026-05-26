import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import AgendaSection from '../components/AgendaSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <AgendaSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
