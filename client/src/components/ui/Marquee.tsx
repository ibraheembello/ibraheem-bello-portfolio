import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  className?: string;
  speed?: number;
  separator?: string;
  repeat?: number;
}

export default function Marquee({
  text,
  className = '',
  speed = 20,
  separator = ' — ',
  repeat = 4,
}: MarqueeProps) {
  const content = Array(repeat)
    .fill(text + separator)
    .join('');

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: { duration: speed, repeat: Infinity, ease: 'linear' },
        }}
        className="inline-flex"
      >
        <span className="inline-block">{content}</span>
        <span className="inline-block">{content}</span>
      </motion.div>
    </div>
  );
}
