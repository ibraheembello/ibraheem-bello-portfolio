import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '@/components/ui/SplitText';
import ClipReveal from '@/components/ui/ClipReveal';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import type { Project } from '@/types';

function DesktopGallery({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(projects.length - 1) * 100}%`]
  );

  return (
    <div
      ref={containerRef}
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex"
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8 md:px-16 lg:px-24"
              data-cursor-view
            >
              <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Project image */}
                <ClipReveal direction="left" delay={0.1}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-background-surface to-background-card group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-accent font-semibold
                                      bg-gradient-to-r from-primary-600 to-accent-500 text-white">
                        Featured
                      </div>
                    )}
                  </div>
                </ClipReveal>

                {/* Project info */}
                <div className="flex flex-col justify-center">
                  <span className="text-foreground-dim font-accent text-sm uppercase tracking-widest mb-3">
                    {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                    {project.title}
                  </h3>
                  <p className="text-foreground-muted font-body text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-sm font-body
                                   bg-glass-light text-foreground-secondary border border-glass-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-6">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground-muted hover:text-foreground font-body transition-colors"
                    >
                      <FaGithub size={20} />
                      View Code
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-foreground-muted hover:text-accent-400 font-body transition-colors"
                      >
                        <FaExternalLinkAlt size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function MobileCarousel({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0);
  const touchRef = useRef<{ startX: number; startY: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.startX;
    const dy = e.changedTouches[0].clientY - touchRef.current.startY;

    // Only swipe if horizontal movement is dominant
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0 && current < projects.length - 1) {
        setCurrent(current + 1);
      } else if (dx > 0 && current > 0) {
        setCurrent(current - 1);
      }
    }
    touchRef.current = null;
  };

  return (
    <div
      className="relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        animate={{ x: `-${current * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex"
      >
        {projects.map((project) => (
          <div key={project.id} className="w-full flex-shrink-0 px-4">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {project.featured && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-accent
                                  bg-gradient-to-r from-primary-600 to-accent-500 text-white">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-foreground-muted text-sm font-body leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md text-xs font-body
                                 bg-glass-light text-foreground-secondary border border-glass-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground-muted hover:text-foreground text-sm font-body transition-colors"
                  >
                    <FaGithub size={16} />
                    Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground-muted hover:text-accent-400 text-sm font-body transition-colors"
                    >
                      <FaExternalLinkAlt size={14} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 bg-primary-500'
                : 'bg-foreground-dim/30 hover:bg-foreground-dim/50'
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProjects(data.data);
      })
      .catch(console.error);
  }, []);

  if (projects.length === 0) return null;

  return (
    <section id="projects">
      {/* Section header */}
      <div className="section-padding pb-8">
        <div className="container-max text-center">
          <SplitText
            text="Featured Projects"
            as="h2"
            className="section-title"
            stagger={0.06}
          />
          <p className="section-subtitle mx-auto">
            A showcase of the applications and systems I&apos;ve built.
          </p>
        </div>
      </div>

      {/* Desktop: horizontal scroll gallery */}
      <div className="hidden lg:block">
        <DesktopGallery projects={projects} />
      </div>

      {/* Mobile: swipeable cards */}
      <div className="lg:hidden section-padding pt-0">
        <MobileCarousel projects={projects} />
      </div>
    </section>
  );
}
