import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBgProps {
  src: string;
  speed?: number;
  overlay?: number;
}

/**
 * Parallax background image that moves slower than the scroll.
 * Uses CSS background-image for mobile compatibility (no position:fixed).
 */
export default function ParallaxBg({ src, speed = 0.3, overlay = 0.75 }: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        style={{ y, backgroundImage: `url(${src})` }}
        className="absolute inset-0 -top-[20%] -bottom-[20%] bg-cover bg-center bg-no-repeat will-change-transform"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(10, 10, 26, ${overlay})` }}
      />
    </div>
  );
}
