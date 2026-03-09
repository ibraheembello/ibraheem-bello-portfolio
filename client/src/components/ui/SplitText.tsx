import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
  delay?: number;
}

export default function SplitText({
  text,
  className = '',
  as: Tag = 'h2',
  stagger = 0.05,
  delay = 0,
}: SplitTextProps) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { y: 40, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
