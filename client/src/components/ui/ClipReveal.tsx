import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

const clipVariants: Record<string, Variants> = {
  up: {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    visible: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
  down: {
    hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
    visible: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
  left: {
    hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
    visible: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
  right: {
    hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
    visible: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
};

export default function ClipReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
}: ClipRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={clipVariants[direction]}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
