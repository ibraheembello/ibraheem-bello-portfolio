import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export default function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [errored, setErrored] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Show a branded placeholder when there is no image yet or it fails to load,
  // so missing assets look intentional instead of broken.
  const showFallback = errored || !src;
  const initial = (alt?.trim()?.[0] || '•').toUpperCase();

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Shimmer while a real image loads */}
      {!loaded && !showFallback && (
        <div className="absolute inset-0 bg-gradient-to-r from-glass-light via-background-surface to-glass-light bg-[length:200%_100%] animate-shimmer" />
      )}

      {/* Branded gradient + initial when no image / on error */}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-700/40 via-background-surface to-accent-700/30">
          <span className="font-heading text-3xl font-bold text-foreground/40 select-none">
            {initial}
          </span>
        </div>
      )}

      {inView && !showFallback && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
