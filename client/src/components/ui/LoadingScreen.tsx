import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-background-dark flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          {/* Glow ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-4 rounded-full border-2 border-transparent"
            style={{
              borderImage: 'linear-gradient(135deg, #7c3aed, #06b6d4, #ec4899) 1',
              borderRadius: '50%',
            }}
          />
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(124, 58, 237, 0.3)',
                '0 0 40px rgba(6, 182, 212, 0.4)',
                '0 0 20px rgba(236, 72, 153, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-background-surface to-background-card
                       border border-glass-border flex items-center justify-center"
          >
            <span className="text-2xl font-heading font-bold gradient-text">{'<IB />'}</span>
          </motion.div>
        </motion.div>

        {/* Loading bar */}
        <div className="w-48 h-1 rounded-full bg-glass-light overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-highlight-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
