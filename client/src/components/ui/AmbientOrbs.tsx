import { motion } from 'framer-motion';

/**
 * Ambient glowing orbs with spring physics scattered across the full page.
 * Fixed positioning — always visible on both desktop and mobile.
 */

const springTransition = {
  type: 'spring' as const,
  stiffness: 8,
  damping: 15,
  mass: 3,
  repeat: Infinity,
  repeatType: 'reverse' as const,
};

const slowSpring = {
  type: 'spring' as const,
  stiffness: 5,
  damping: 12,
  mass: 4,
  repeat: Infinity,
  repeatType: 'reverse' as const,
};

const gentleSpring = {
  type: 'spring' as const,
  stiffness: 6,
  damping: 18,
  mass: 5,
  repeat: Infinity,
  repeatType: 'reverse' as const,
};

export default function AmbientOrbs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top-left — primary purple */}
      <motion.div
        animate={{ x: 60, y: -50, scale: 1.15 }}
        transition={springTransition}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-[120px]"
      />

      {/* Top-right — accent cyan */}
      <motion.div
        animate={{ x: -50, y: 40, scale: 0.9 }}
        transition={slowSpring}
        className="absolute -top-10 -right-20 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]"
      />

      {/* Center — highlight pink */}
      <motion.div
        animate={{ x: 70, y: -40, scale: 1.1 }}
        transition={gentleSpring}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-highlight-500/[0.07] rounded-full blur-[100px]"
      />

      {/* Mid-left — primary (dimmer) */}
      <motion.div
        animate={{ x: 40, y: 60, scale: 1.08 }}
        transition={slowSpring}
        className="absolute top-[55%] -left-10 w-[300px] h-[300px] bg-primary-500/[0.07] rounded-full blur-[90px]"
      />

      {/* Mid-right — accent (dimmer) */}
      <motion.div
        animate={{ x: -40, y: -50, scale: 0.92 }}
        transition={springTransition}
        className="absolute top-[60%] -right-10 w-[350px] h-[350px] bg-accent-500/[0.07] rounded-full blur-[110px]"
      />

      {/* Bottom-center — warm glow */}
      <motion.div
        animate={{ x: -30, y: -40, scale: 1.12 }}
        transition={gentleSpring}
        className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] bg-primary-600/10 rounded-full blur-[120px]"
      />

      {/* Bottom-right — highlight */}
      <motion.div
        animate={{ x: 40, y: -30, scale: 0.95 }}
        transition={slowSpring}
        className="absolute -bottom-10 -right-20 w-[300px] h-[300px] bg-highlight-500/[0.06] rounded-full blur-[100px]"
      />
    </div>
  );
}
