import { useState, useEffect, useCallback, useRef } from 'react';

interface TextScrambleProps {
  texts: string[];
  className?: string;
  scrambleSpeed?: number;
  pauseTime?: number;
  chars?: string;
}

export default function TextScramble({
  texts,
  className = '',
  scrambleSpeed = 30,
  pauseTime = 2000,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
}: TextScrambleProps) {
  const [display, setDisplay] = useState(texts[0] || '');
  const indexRef = useRef(0);
  const frameRef = useRef(0);

  const scramble = useCallback(
    (target: string) => {
      return new Promise<void>((resolve) => {
        const length = Math.max(display.length, target.length);
        let iteration = 0;

        const interval = setInterval(() => {
          const result = target
            .split('')
            .map((char, i) => {
              if (i < iteration) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

          setDisplay(result.slice(0, length));
          iteration += 1 / 3;

          if (iteration >= target.length) {
            clearInterval(interval);
            setDisplay(target);
            resolve();
          }
        }, scrambleSpeed);
      });
    },
    [display.length, scrambleSpeed, chars]
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const cycle = async () => {
      indexRef.current = (indexRef.current + 1) % texts.length;
      await scramble(texts[indexRef.current]);
      timeout = setTimeout(cycle, pauseTime);
    };

    timeout = setTimeout(cycle, pauseTime);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [texts, scramble, pauseTime]);

  return <span className={className}>{display}</span>;
}
