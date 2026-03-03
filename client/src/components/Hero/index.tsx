import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { heroTitle, heroSubtitle, heroCta } from '@/lib/animations/variants';
import { useGpuDetection } from '@/lib/animations/hooks';
import Button from '@/components/ui/Button';
import TypeWriter from '@/components/ui/TypeWriter';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

const HeroScene = lazy(() => import('@/lib/three/HeroScene'));

function CssFallbackBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-[100px] animate-float-slow animation-delay-200" />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-highlight-500/10 rounded-full blur-[90px] animate-float-fast animation-delay-400" />
    </div>
  );
}

export default function Hero() {
  const { canHandle3D, isChecking } = useGpuDetection();

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background or CSS Fallback */}
      {!isChecking && (
        canHandle3D ? (
          <Suspense fallback={<CssFallbackBackground />}>
            <HeroScene />
          </Suspense>
        ) : (
          <CssFallbackBackground />
        )
      )}

      {/* Content */}
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 text-center">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-foreground-secondary font-body">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
        >
          <span className="text-foreground">Hi, I&apos;m </span>
          <span className="gradient-text">Ibraheem Bello</span>
        </motion.h1>

        {/* Typing Title */}
        <motion.div
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-foreground-secondary font-body mb-4 max-w-3xl mx-auto h-9"
        >
          <TypeWriter
            words={['Backend Developer', 'Engineering Leader', 'Open Source Contributor', 'API Architect']}
            typingSpeed={80}
            deletingSpeed={50}
            pauseTime={2000}
            className="gradient-text font-semibold"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg text-foreground-muted font-body mb-10 max-w-2xl mx-auto"
        >
          I build scalable RESTful APIs and microservices with Node.js, TypeScript,
          and modern cloud infrastructure. Turning complex problems into clean, elegant solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroCta}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button variant="primary" onClick={handleScrollToProjects}>
            View My Work
          </Button>
          <Button variant="outline" onClick={handleScrollToContact}>
            Get In Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <motion.a
            href="https://github.com/ibraheembello"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -3 }}
            className="w-12 h-12 glass rounded-xl flex items-center justify-center text-foreground-muted
                       hover:text-foreground hover:border-primary-500/30 hover:shadow-glow transition-all duration-300"
          >
            <FaGithub size={22} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/ibraheem-bello-049b34287"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -3 }}
            className="w-12 h-12 glass rounded-xl flex items-center justify-center text-foreground-muted
                       hover:text-foreground hover:border-accent-500/30 hover:shadow-glow-accent transition-all duration-300"
          >
            <FaLinkedinIn size={22} />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-foreground-dim"
        >
          <span className="text-xs font-body">Scroll Down</span>
          <HiArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
