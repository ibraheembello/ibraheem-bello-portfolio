import { motion } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-9 h-9 rounded-lg glass flex items-center justify-center
                 text-foreground-muted hover:text-foreground transition-colors duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
      </motion.div>
    </motion.button>
  );
}
