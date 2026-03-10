import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LenisProvider } from '@/contexts/LenisProvider';
import Navbar from '@/components/Layout/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Blog from '@/components/Blog';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import CustomCursor from '@/components/ui/CustomCursor';
import Marquee from '@/components/ui/Marquee';
import LoadingScreen from '@/components/ui/LoadingScreen';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CommandPalette from '@/components/ui/CommandPalette';
import SectionConnector from '@/components/ui/SectionConnector';
import SectionReveal from '@/components/ui/SectionReveal';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LenisProvider>
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />
      <CommandPalette />
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <div className={`relative min-h-screen overflow-x-hidden ${loading ? 'overflow-hidden h-screen' : ''}`}>
        <Navbar />
        <main id="main-content" className="relative z-10">
          <Hero />
          <SectionConnector variant="wave" />
          <SectionReveal><About /></SectionReveal>
          <SectionReveal><Stats /></SectionReveal>
          <div className="py-6 overflow-hidden border-y border-glass-border">
            <Marquee
              text="Node.js  •  TypeScript  •  NestJS  •  Express  •  MongoDB  •  PostgreSQL  •  REST APIs  •  Microservices  •  Cloud Infrastructure  •  Open Source"
              className="text-2xl md:text-3xl font-accent font-bold text-foreground-dim/30 uppercase tracking-widest"
              speed={25}
            />
          </div>
          <SectionReveal><Skills /></SectionReveal>
          <SectionConnector variant="curve" />
          <SectionReveal><Projects /></SectionReveal>
          <SectionConnector variant="zigzag" />
          <SectionReveal><Experience /></SectionReveal>
          <SectionConnector variant="wave" flip />
          <SectionReveal><Blog /></SectionReveal>
          <SectionConnector variant="curve" flip />
          <SectionReveal><Testimonials /></SectionReveal>
          <SectionConnector variant="zigzag" />
          <SectionReveal><Contact /></SectionReveal>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </LenisProvider>
  );
}
