import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView, useAnimation, type AnimationControls } from 'framer-motion';
import { ANIMATION_CONFIG } from './config';

export const useScrollReveal = (threshold = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: ANIMATION_CONFIG.viewport.once,
    amount: threshold,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
};

export const useTextReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
};

export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollPercent = rect.top / window.innerHeight;
      setOffset(scrollPercent * speed * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

export const useStaggerAnimation = (
  _itemCount: number,
  staggerDelay = ANIMATION_CONFIG.delay.stagger
): { controls: AnimationControls; getDelay: (index: number) => number } => {
  const controls = useAnimation();

  const getDelay = useCallback(
    (index: number) => index * staggerDelay,
    [staggerDelay]
  );

  return { controls, getDelay };
};

export const useGpuDetection = (): { canHandle3D: boolean; isChecking: boolean } => {
  const [canHandle3D, setCanHandle3D] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkGpu = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

        if (!gl) {
          setCanHandle3D(false);
          setIsChecking(false);
          return;
        }

        const cores = navigator.hardwareConcurrency || 2;
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const isLowEnd = cores < 4 || isMobile;

        setCanHandle3D(!isLowEnd);
      } catch {
        setCanHandle3D(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkGpu();
  }, []);

  return { canHandle3D, isChecking };
};
