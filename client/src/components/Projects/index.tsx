import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import type { Project } from '@/types';

function DesktopGallery({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardCount = projects.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to active card index
  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(Math.floor(v * cardCount), cardCount - 1)
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndex.on('change', (v) => setCurrent(v));
    return unsubscribe;
  }, [activeIndex]);

  // Container: 100vh per project for scroll distance + 100vh for the sticky viewport
  const containerHeight = (cardCount + 1) * 100;

  return (
    <div
      ref={containerRef}
      style={{ height: `${containerHeight}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Project image — transitions on scroll */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-background-surface to-background-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={projects[current]?.id}
                  src={projects[current]?.image}
                  alt={projects[current]?.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {projects[current]?.featured && (
                <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-accent font-semibold
                                bg-gradient-to-r from-primary-600 to-accent-500 text-white z-10">
                  Featured
                </div>
              )}
            </div>

            {/* Project info — transitions on scroll */}
            <div className="flex flex-col justify-center min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={projects[current]?.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <span className="text-foreground-dim font-accent text-sm uppercase tracking-widest mb-3 block">
                    {String(current + 1).padStart(2, '0')} / {String(cardCount).padStart(2, '0')}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                    {projects[current]?.title}
                  </h3>
                  <p className="text-foreground-muted font-body text-lg leading-relaxed mb-6">
                    {projects[current]?.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {projects[current]?.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-sm font-body
                                   bg-glass-light text-foreground-secondary border border-glass-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <a
                      href={projects[current]?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground-muted hover:text-foreground font-body transition-colors"
                    >
                      <FaGithub size={20} />
                      View Code
                    </a>
                    {projects[current]?.liveUrl && (
                      <a
                        href={projects[current]?.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-foreground-muted hover:text-accent-400 font-body transition-colors"
                      >
                        <FaExternalLinkAlt size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex gap-2 mt-8">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === current
                        ? 'w-8 bg-gradient-to-r from-primary-500 to-accent-500'
                        : i < current
                          ? 'w-4 bg-primary-500/40'
                          : 'w-4 bg-foreground-dim/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
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
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProjects(data.data);
      })
      .catch(console.error);
  }, []);

  if (projects.length === 0) return null;

  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects">
      {/* Section header + filter tabs */}
      <div className="section-padding pb-8">
        <div className="container-max">
          <SectionHeading
            title="Featured Projects"
            subtitle="A showcase of the applications and systems I've built."
          />

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-5 py-2 rounded-xl font-body text-sm transition-all duration-300 ${
                  filter === cat
                    ? 'text-foreground'
                    : 'text-foreground-muted hover:text-foreground glass hover:bg-glass-strong'
                }`}
              >
                {filter === cat && (
                  <motion.div
                    layoutId="activeProjectTab"
                    className="absolute inset-0 bg-primary-600/20 border border-primary-500/30 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: sticky scroll-driven content swap */}
      <div className="hidden lg:block">
        <DesktopGallery projects={filtered} />
      </div>

      {/* Mobile: swipeable cards */}
      <div className="lg:hidden section-padding pt-0">
        <MobileCarousel projects={filtered} />
      </div>
    </section>
  );
}
