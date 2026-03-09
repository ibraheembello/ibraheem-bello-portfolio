import { motion, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: 'easeInOut',
      onUpdate: (v) => setProgress(Math.round(v)),
    });
    return () => controls.stop();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-background-dark flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8">
        {/* SVG draw animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative"
        >
          {/* Spinning glow ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-6 rounded-3xl opacity-30"
            style={{
              background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #ec4899, #7c3aed)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '2px',
            }}
          />

          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px rgba(124, 58, 237, 0.3)',
                '0 0 50px rgba(6, 182, 212, 0.4)',
                '0 0 30px rgba(236, 72, 153, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-background-surface to-background-card
                       border border-glass-border flex items-center justify-center"
          >
            <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
              {/* I stroke */}
              <motion.path
                d="M4 2 L4 30"
                stroke="url(#loadGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
              {/* B stroke */}
              <motion.path
                d="M16 2 L16 30 M16 2 L32 2 Q40 2 40 9 Q40 16 32 16 L16 16 M16 16 L34 16 Q44 16 44 23 Q44 30 34 30 L16 30"
                stroke="url(#loadGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              />
              <defs>
                <linearGradient id="loadGradient" x1="0" y1="0" x2="48" y2="32">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-1 rounded-full bg-glass-light overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="h-full rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-highlight-500"
          />
        </div>

        {/* Percentage counter */}
        <span className="text-sm font-body text-foreground-dim tracking-widest">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
