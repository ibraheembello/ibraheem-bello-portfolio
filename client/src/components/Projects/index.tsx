import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import type { Project } from '@/types';

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

  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <SectionHeading
          title="Featured Projects"
          subtitle="A showcase of the applications and systems I've built."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Project cards */}
        <motion.div
          key={filter}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <GlassCard glow="primary" className="h-full flex flex-col group">
                {/* Project image with hover overlay */}
                <div className="relative h-48 rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-background-surface to-background-card">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-card/60 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background-dark/70 backdrop-blur-sm flex items-center justify-center gap-3
                                  opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center
                                 text-white hover:text-primary-400 hover:border-primary-500/50 transition-all duration-200"
                    >
                      <FaGithub size={18} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center
                                   text-white hover:text-accent-400 hover:border-accent-500/50 transition-all duration-200"
                      >
                        <FaExternalLinkAlt size={16} />
                      </a>
                    )}
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-body
                                    bg-gradient-to-r from-primary-600 to-accent-500 text-white z-10">
                      Featured
                    </div>
                  )}
                </div>

                {/* Title and description */}
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-foreground-muted text-sm font-body leading-relaxed mb-5 flex-grow">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-body
                                 bg-glass-light text-foreground-secondary border border-glass-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-glass-border">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 text-foreground-muted hover:text-foreground text-sm font-body transition-colors"
                  >
                    <FaGithub size={16} />
                    Code
                  </motion.a>
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 text-foreground-muted hover:text-accent-400 text-sm font-body transition-colors"
                    >
                      <FaExternalLinkAlt size={14} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
