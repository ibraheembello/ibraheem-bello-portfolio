import { motion } from 'framer-motion';
import { cardHover } from '@/lib/animations/variants';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'primary' | 'accent' | 'highlight' | 'none';
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = 'none',
}: GlassCardProps) {
  const glowStyles = {
    primary: 'hover:shadow-glow hover:border-primary-500/30',
    accent: 'hover:shadow-glow-accent hover:border-accent-500/30',
    highlight: 'hover:shadow-glow-highlight hover:border-highlight-500/30',
    none: '',
  };

  return (
    <motion.div
      variants={hover ? cardHover : undefined}
      initial={hover ? 'rest' : undefined}
      whileHover={hover ? 'hover' : undefined}
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${glowStyles[glow]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
