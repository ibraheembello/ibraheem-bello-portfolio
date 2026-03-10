import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Baraka Cohort Peer',
    role: 'Fellow Student',
    company: 'AltSchool Africa',
    quote:
      'Ibraheem\'s leadership as VP of the Baraka Cohort made a huge difference. He organized study groups, debugged code with us late at night, and made sure nobody was left behind. A true engineering leader.',
    rating: 5,
  },
  {
    id: 2,
    name: 'HNG Internship Colleague',
    role: 'Backend Developer',
    company: 'HNG Internship',
    quote:
      'Working with Ibraheem during the HNG Internship was impressive. His clean code, quick debugging skills, and ability to ship under pressure made him stand out among thousands of participants.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Open Source Collaborator',
    role: 'Developer',
    company: 'GitHub',
    quote:
      'Ibraheem\'s contributions to open source projects show his commitment to writing maintainable, well-documented code. His PRs are always thorough and he\'s great at explaining complex backend concepts.',
    rating: 5,
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0, scale: 0.95 }),
};

export default function Testimonials() {
  const [[active, direction], setActive] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive(([prev]) => [(prev + 1) % testimonials.length, 1]);
  }, []);

  const prev = useCallback(() => {
    setActive(([prev]) => [(prev - 1 + testimonials.length) % testimonials.length, -1]);
  }, []);

  // Auto-rotate every 5s
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="section-padding glow-testimonials">
      <div className="container-max">
        <SectionHeading
          title="What People Say"
          subtitle="Feedback from peers, collaborators, and fellow engineers."
        />

        <div
          className="max-w-3xl mx-auto relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Carousel */}
          <div className="overflow-hidden relative min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <GlassCard glow="highlight" className="text-center">
                  <FaQuoteLeft size={28} className="text-primary-500/30 mx-auto mb-5" />

                  <p className="text-foreground-secondary text-base sm:text-lg font-body leading-relaxed mb-6 italic max-w-2xl mx-auto">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex justify-center gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <HiStar key={i} size={18} className="text-highlight-400" />
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-heading font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-foreground text-sm font-heading font-semibold">{t.name}</p>
                      <p className="text-foreground-dim text-xs font-body">{t.role} &middot; {t.company}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-14 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground-muted hover:text-foreground hover:shadow-glow transition-all z-10"
            aria-label="Previous testimonial"
          >
            <HiChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-14 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground-muted hover:text-foreground hover:shadow-glow transition-all z-10"
            aria-label="Next testimonial"
          >
            <HiChevronRight size={20} />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive([i, i > active ? 1 : -1])}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-8 bg-gradient-to-r from-primary-500 to-accent-500'
                    : 'w-2 bg-foreground-dim/30 hover:bg-foreground-dim/60'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
