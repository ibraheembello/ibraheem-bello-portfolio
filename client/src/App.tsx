import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
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
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <div className={`min-h-screen ${loading ? 'overflow-hidden h-screen' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Stats />
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
    </ThemeProvider>
  );
}
