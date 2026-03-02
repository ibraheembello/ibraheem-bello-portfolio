import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/lib/animations/variants';
import { useScrollReveal } from '@/lib/animations/hooks';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { HiCode, HiLightningBolt, HiUserGroup, HiAcademicCap } from 'react-icons/hi';

const highlights = [
  {
    icon: <HiCode size={28} />,
    title: 'Backend Focused',
    description: 'Specialized in Node.js, Express, and NestJS for building robust, scalable APIs.',
    color: 'text-primary-400',
  },
  {
    icon: <HiLightningBolt size={28} />,
    title: 'HNG Finalist',
    description: 'Top 450 out of 12,362 participants. Proven ability to deliver under pressure.',
    color: 'text-accent-400',
  },
  {
    icon: <HiUserGroup size={28} />,
    title: 'Engineering Leader',
    description: 'Vice President at AltSchool Africa, leading 100+ students in the Baraka Cohort.',
    color: 'text-highlight-400',
  },
  {
    icon: <HiAcademicCap size={28} />,
    title: 'Continuous Learner',
    description: 'Certified by freeCodeCamp. Always pushing boundaries with new technologies.',
    color: 'text-green-400',
  },
];

export default function About() {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <SectionHeading
          title="About Me"
          subtitle="A passionate backend engineer turning ideas into scalable, production-ready systems."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder + Bio */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={slideInLeft}
          >
            <div className="relative">
              {/* Photo frame with glow */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-highlight-500 rounded-3xl opacity-20 blur-xl animate-pulse-glow" />
                <div className="relative glass-card rounded-3xl w-full h-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/profile/ibraheem.webp"
                    alt="Ibraheem Bello"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={slideInRight}
          >
            <p className="text-gray-300 font-body text-lg leading-relaxed mb-6">
              I&apos;m <span className="text-white font-semibold">Ibraheem Bello</span>, a
              backend engineer based in <span className="text-accent-400">Lagos, Nigeria</span>.
              I specialize in building scalable web applications using Node.js, TypeScript, and modern
              cloud infrastructure.
            </p>
            <p className="text-gray-400 font-body leading-relaxed mb-6">
              Currently pursuing a Backend Engineering Diploma at AltSchool Africa where I serve as
              Vice President of the Baraka Cohort, leading peer learning for 100+ students. As an HNG
              Internship Finalist, I demonstrated expertise in TypeScript, NestJS, and TypeORM under
              intense sprint cycles.
            </p>
            <p className="text-gray-400 font-body leading-relaxed">
              My philosophy is simple: write clean, well-tested code that solves real problems.
              I believe in the power of open source, continuous learning, and building communities
              that lift each other up.
            </p>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {highlights.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <GlassCard glow="primary" className="text-center h-full">
                <div className={`${item.color} mb-4 flex justify-center`}>
                  {item.icon}
                </div>
                <h3 className="text-white font-heading font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm font-body">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
