import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const logoY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const bioY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" className="section-padding glow-about" ref={sectionRef}>
      <div className="container-max">
        <SectionHeading
          title="About Me"
          subtitle="A passionate backend engineer turning ideas into scalable, production-ready systems."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Animated IB Logo with parallax */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={slideInLeft}
            style={{ y: logoY }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto lg:mx-0">
              {/* Outer glow pulse */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-highlight-500 rounded-3xl opacity-20 blur-xl animate-pulse-glow" />

              {/* Spinning border ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 rounded-3xl opacity-30"
                style={{
                  background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #ec4899, #7c3aed)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '2px',
                }}
              />

              {/* IB Logo card */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(124, 58, 237, 0.2)',
                    '0 0 60px rgba(6, 182, 212, 0.3)',
                    '0 0 30px rgba(236, 72, 153, 0.2)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative glass-card rounded-3xl w-full h-full overflow-hidden flex items-center justify-center"
              >
                {/* Background grid pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* IB text */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-center"
                >
                  <span className="text-6xl md:text-7xl font-heading font-bold gradient-text">
                    {'<IB />'}
                  </span>
                  <motion.p
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-foreground-dim text-sm font-mono mt-3"
                  >
                    backend.engineer
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio text with parallax */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={slideInRight}
            style={{ y: bioY }}
          >
            <p className="text-foreground-secondary font-body text-lg leading-relaxed mb-6">
              I&apos;m <span className="text-foreground font-semibold">Ibraheem Bello</span>, a
              backend engineer based in <span className="text-accent-400">Lagos, Nigeria</span>.
              I specialize in building scalable web applications using Node.js, TypeScript, and modern
              cloud infrastructure. From RESTful APIs to microservices, I design systems that handle
              real-world traffic and complexity.
            </p>
            <p className="text-foreground-muted font-body leading-relaxed mb-6">
              Currently pursuing a Backend Engineering Diploma at AltSchool Africa where I serve as
              Vice President of the Baraka Cohort, leading peer learning for 100+ students. As an HNG
              Internship Finalist (top 450 of 12,362), I demonstrated expertise in TypeScript, NestJS,
              and TypeORM under intense sprint cycles — shipping production features on tight deadlines.
            </p>
            <p className="text-foreground-muted font-body leading-relaxed">
              My philosophy is simple: write clean, well-tested code that solves real problems.
              I believe in the power of open source, continuous learning, and building communities
              that lift each other up. Every API endpoint I build, every system I architect — it&apos;s
              about creating lasting value, not just shipping code.
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
                <h3 className="text-foreground font-heading font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground-muted text-sm font-body">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
