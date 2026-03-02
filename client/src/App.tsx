import Navbar from '@/components/Layout/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Layout/Footer';
import BackToTop from '@/components/ui/BackToTop';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
