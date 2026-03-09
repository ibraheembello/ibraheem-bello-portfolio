import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a';
  onClick?: () => void;
  href?: string;
  download?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as: Tag = 'button',
  onClick,
  href,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200 });
  const springY = useSpring(y, { damping: 15, stiffness: 200 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = Tag === 'a' ? motion.a : motion.button;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
      onClick={onClick}
      href={href}
      download={download}
    >
      {children}
    </MotionTag>
  );
}
