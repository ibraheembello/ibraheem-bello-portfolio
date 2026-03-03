import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import { HiCode, HiCheckCircle, HiUserGroup, HiTrendingUp } from 'react-icons/hi';

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: <HiCode size={28} />,
    value: 6,
    suffix: '+',
    label: 'Projects Built',
    color: 'text-primary-400',
  },
  {
    icon: <HiCheckCircle size={28} />,
    value: 29,
    suffix: '',
    label: 'Tests Passing',
    color: 'text-accent-400',
  },
  {
    icon: <HiUserGroup size={28} />,
    value: 100,
    suffix: '+',
    label: 'Students Led',
    color: 'text-highlight-400',
  },
  {
    icon: <HiTrendingUp size={28} />,
    value: 12362,
    suffix: '',
    label: 'HNG Competitors Beat',
    color: 'text-green-400',
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 relative">
      {/* Subtle top/bottom borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center group"
            >
              <div className={`${stat.color} mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-foreground-dim text-sm font-body">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
