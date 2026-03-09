import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  const scale = useMotionValue(1);
  const followerScale = useSpring(scale, { damping: 20, stiffness: 400 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor-hover], input, textarea, select');
      const projectCard = target.closest('[data-cursor-view]');

      if (projectCard) {
        scale.set(2.5);
      } else if (interactive) {
        scale.set(2);
      } else {
        scale.set(1);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, scale]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Follower circle */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: followerX,
          y: followerY,
          scale: followerScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
