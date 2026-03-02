export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
    verySlow: 1.2,
  },
  delay: {
    stagger: 0.1,
    section: 0.2,
    hero: 0.4,
  },
  easing: {
    smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    bouncy: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
    sharp: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },
  viewport: {
    once: true,
    margin: '-80px',
    amount: 0.3 as const,
  },
} as const;

export const GSAP_DEFAULTS = {
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse' as const,
  },
  ease: 'power3.out',
  duration: 0.8,
} as const;
