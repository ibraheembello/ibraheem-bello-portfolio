import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionConnectorProps {
  variant?: 'wave' | 'zigzag' | 'curve';
  flip?: boolean;
  className?: string;
}

const paths = {
  wave: 'M0,20 C150,60 350,-20 500,20 C650,60 850,-20 1000,20',
  zigzag: 'M0,30 L125,10 L250,30 L375,10 L500,30 L625,10 L750,30 L875,10 L1000,30',
  curve: 'M0,40 Q250,-10 500,30 Q750,70 1000,10',
};

export default function SectionConnector({
  variant = 'wave',
  flip = false,
  className = '',
}: SectionConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className={`relative w-full h-16 overflow-hidden pointer-events-none ${className}`}
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg
        viewBox="0 0 1000 50"
        preserveAspectRatio="none"
        className="w-full h-full"
        fill="none"
      >
        <defs>
          <linearGradient id={`connector-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="20%" stopColor="#7c3aed" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#ec4899" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={paths[variant]}
          stroke={`url(#connector-grad-${variant})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  );
}
