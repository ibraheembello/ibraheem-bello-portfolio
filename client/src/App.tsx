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

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LenisProvider>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <div className={`min-h-screen overflow-x-hidden ${loading ? 'overflow-hidden h-screen' : ''}`}>
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
      </div>
    </LenisProvider>
  );
}
