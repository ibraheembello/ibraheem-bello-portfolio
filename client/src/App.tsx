import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

export default function App() {
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    ['#0A0A1A', '#0A0A20', '#0D0A1A', '#0A1018', '#100A1A', '#0A0A1A', '#0A0A1A', '#0A0F1A']
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LenisProvider>
      <CustomCursor />
      <NoiseOverlay />
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <motion.div style={{ backgroundColor }} className={`min-h-screen overflow-x-hidden ${loading ? 'overflow-hidden h-screen' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Stats />
          <div className="py-6 overflow-hidden border-y border-glass-border">
            <Marquee
              text="Node.js  •  TypeScript  •  NestJS  •  Express  •  MongoDB  •  PostgreSQL  •  REST APIs  •  Microservices  •  Cloud Infrastructure  •  Open Source"
              className="text-2xl md:text-3xl font-accent font-bold text-foreground-dim/30 uppercase tracking-widest"
              speed={25}
            />
          </div>
          <Skills />
          <Projects />
          <Experience />
          <Blog />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </motion.div>
    </LenisProvider>
  );
}
