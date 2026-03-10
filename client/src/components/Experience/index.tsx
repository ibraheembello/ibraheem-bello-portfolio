import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '@/lib/animations/variants';
import { useScrollReveal } from '@/lib/animations/hooks';
import ParallaxBg from '@/components/ui/ParallaxBg';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { HiBriefcase, HiCalendar, HiLocationMarker } from 'react-icons/hi';
import type { Experience as ExperienceType } from '@/types';

const certifications = [
  {
    title: 'HNG Internship Finalist',
    issuer: 'HNG',
    date: 'Nov 2025',
    description: 'Top 450 out of 12,362 participants in Backend Development Track',
    image: '/images/certifications/hng-finalist.webp',
  },
  {
    title: 'Back End Development and APIs',
    issuer: 'freeCodeCamp',
    date: 'Nov 2024',
    description: 'Node.js, Express, MongoDB, RESTful APIs, Authentication',
    image: '/images/certifications/freecodecamp-backend.webp',
  },
  {
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: 'Oct 2024',
    description: 'Variables, loops, functions, recursion, OOP, data structures',
    image: '/images/certifications/freecodecamp-js.webp',
  },
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'Jul 2024',
    description: 'HTML, CSS, Flexbox, Grid, Accessibility',
    image: '/images/certifications/freecodecamp-responsive.webp',
  },
  {
    title: 'Introduction to CSS',
    issuer: 'Sololearn',
    date: 'Nov 2022',
    description: 'CSS fundamentals, selectors, layout, styling techniques',
    image: '/images/certifications/sololearn-css.webp',
  },
  {
    title: 'Introduction to HTML',
    issuer: 'Sololearn',
    date: 'Nov 2022',
    description: 'HTML fundamentals, semantic markup, forms, media elements',
    image: '/images/certifications/sololearn-html.webp',
  },
];

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function TimelineAnimated({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative">
      {/* Animated timeline line */}
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-accent-500 to-highlight-500"
      />
      {/* Static faint track behind */}
      <div className="absolute left-[15px] top-0 bottom-0 w-px bg-glass-border" />
      {children}
    </div>
  );
}

export default function Experience() {
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const { ref, controls } = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  useEffect(() => {
    fetch('/api/experience')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setExperience(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <section id="experience" className="section-padding glow-experience relative" ref={sectionRef}>
      <ParallaxBg src="/images/backgrounds/bg-experience.webp" speed={0.3} overlay={0.82} />
      <div className="container-max relative z-10">
        <SectionHeading
          title="Experience & Certifications"
          subtitle="My professional journey and achievements in tech."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <motion.div style={{ y: leftY }}>
            <motion.h3
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={fadeUp}
              className="text-xl font-heading font-semibold text-foreground mb-8 flex items-center gap-3"
            >
              <HiBriefcase className="text-primary-400" size={24} />
              Work Experience
            </motion.h3>

            <TimelineAnimated>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="relative"
            >

              {experience.map((exp) => (
                <motion.div key={exp.id} variants={staggerItem} className="relative pl-10 pb-10 last:pb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-[8px] top-1 w-[15px] h-[15px] rounded-full bg-background-dark border-2 border-primary-500">
                    {exp.current && (
                      <div className="absolute inset-0 rounded-full bg-primary-500 animate-pulse opacity-50" />
                    )}
                  </div>

                  <GlassCard glow="primary" hover={false}>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {exp.current && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-heading font-semibold text-foreground">{exp.role}</h4>
                    <p className="text-primary-400 font-body text-sm mb-2">{exp.company}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-foreground-dim font-body mb-3">
                      <span className="flex items-center gap-1">
                        <HiCalendar size={14} />
                        {formatDate(exp.startDate)} &mdash; {exp.current ? 'Present' : formatDate(exp.endDate!)}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiLocationMarker size={14} />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-foreground-muted text-sm font-body leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-xs bg-glass-light text-foreground-secondary border border-glass-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
            </TimelineAnimated>
          </motion.div>

          {/* Certifications */}
          <motion.div style={{ y: rightY }}>
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-xl font-heading font-semibold text-foreground mb-8 flex items-center gap-3"
            >
              <HiCalendar className="text-accent-400" size={24} />
              Certifications & Awards
            </motion.h3>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {certifications.map((cert) => (
                <motion.div key={cert.title} variants={slideInLeft}>
                  <GlassCard glow="accent" className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-background-surface">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-base font-heading font-semibold text-foreground group-hover:text-accent-300 transition-colors">
                              {cert.title}
                            </h4>
                            <p className="text-accent-400 text-sm font-body">{cert.issuer}</p>
                            <p className="text-foreground-muted text-sm font-body mt-1">{cert.description}</p>
                          </div>
                          <span className="text-xs text-foreground-dim font-body whitespace-nowrap ml-4">
                            {cert.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
