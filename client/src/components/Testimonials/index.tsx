import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { HiStar } from 'react-icons/hi';
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

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container-max">
        <SectionHeading
          title="What People Say"
          subtitle="Feedback from peers, collaborators, and fellow engineers."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={staggerItem}>
              <GlassCard glow="highlight" className="h-full flex flex-col">
                {/* Quote icon */}
                <FaQuoteLeft size={24} className="text-primary-500/30 mb-4" />

                {/* Quote text */}
                <p className="text-foreground-secondary text-sm font-body leading-relaxed mb-6 flex-grow italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <HiStar key={i} size={16} className="text-highlight-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="pt-4 border-t border-glass-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-heading font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-heading font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-foreground-dim text-xs font-body">
                        {testimonial.role} &middot; {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
