import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}

export default function SectionReveal({ children, className = '', direction = 'up', delay = 0 }: SectionRevealProps) {
  const initial = {
    up: { opacity: 0, y: 60 },
    left: { opacity: 0, x: -60 },
    right: { opacity: 0, x: 60 },
  }[direction];

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
