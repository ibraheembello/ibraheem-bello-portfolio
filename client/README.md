# Portfolio Client

React frontend for the portfolio website, built with TypeScript, Tailwind CSS, Framer Motion, Lenis, and Three.js. Features Awwwards-level interactive animations and scroll-driven experiences.

## Stack

- **React 18** with TypeScript
- **Vite** for fast builds and HMR
- **Tailwind CSS** with custom glassmorphism theme
- **Framer Motion** for scroll animations, layout transitions, and spring physics
- **Lenis** for buttery-smooth scroll engine
- **Three.js / React Three Fiber** for 3D hero scene (GPU-detected, lazy-loaded)

## Typography

Custom three-font system from [Fontshare](https://www.fontshare.com/):

- **Clash Display** — Primary headings (hero name, section titles). Sharp geometric display font.
- **Syne** — Accent text (marquee banner, labels, role cycling). Unconventional personality.
- **Satoshi** — Body text. Clean geometric sans-serif.

## Interactive Features

| Feature | Component | Description |
|---------|-----------|-------------|
| Smooth Scroll | `LenisProvider` | Lenis engine replacing native scroll |
| Split-Text Reveal | `SplitText` | Word-by-word staggered y-axis animation |
| Text Scramble | `TextScramble` | Character decode/scramble cycling through strings |
| Custom Cursor | `CustomCursor` | Dot + spring follower, `mix-blend-mode: difference` |
| Clip-Path Reveal | `ClipReveal` | Inset wipe animation from any direction |
| Magnetic Buttons | `MagneticButton` | Spring-based cursor attraction effect |
| Infinite Marquee | `Marquee` | Continuously scrolling text banner |
| Horizontal Gallery | `Projects` | Scroll-driven horizontal project showcase |
| Mobile Carousel | `Projects` | Touch-swipeable cards with dot indicators |

## Structure

```
src/
├── components/
│   ├── About/          # Bio section with animated IB logo
│   ├── Blog/           # Dev.to article feed
│   ├── Contact/        # Contact form with validation
│   ├── Experience/     # Timeline + certifications
│   ├── Hero/           # Hero with 3D background, split-text, text scramble
│   ├── Layout/         # Navbar, Footer
│   ├── Projects/       # Horizontal scroll gallery + mobile carousel
│   ├── Skills/         # Tabbed skills display
│   ├── Stats/          # Animated number counters
│   ├── Testimonials/   # Quote cards
│   └── ui/             # Reusable components
│       ├── BackToTop.tsx
│       ├── Button.tsx
│       ├── ClipReveal.tsx
│       ├── CustomCursor.tsx
│       ├── GlassCard.tsx
│       ├── LoadingScreen.tsx
│       ├── MagneticButton.tsx
│       ├── Marquee.tsx
│       ├── SectionHeading.tsx
│       ├── SkillBadge.tsx
│       ├── SplitText.tsx
│       ├── TextScramble.tsx
│       └── TypeWriter.tsx
├── contexts/
│   └── LenisProvider.tsx   # Lenis smooth scroll context
├── lib/
│   ├── animations/     # Shared config, hooks, variants
│   └── three/          # HeroScene (particles, geometry, orbs)
├── types/              # TypeScript interfaces
├── App.tsx             # Root layout with LenisProvider + CustomCursor
├── index.css           # Global styles, Tailwind directives, dark theme
└── main.tsx            # Entry point
```

## Scripts

```bash
npm run dev       # Start Vite dev server (port 5173)
npm run build     # TypeScript check + production build
npm run preview   # Preview production build locally
npm run test      # Run Vitest test suite
```

## Performance

- Three.js is code-split into a separate chunk and only loaded on capable GPUs
- CSS fallback with animated gradient orbs on mobile/low-end devices
- All images served as WebP with lazy loading
- Lenis smooth scroll engine (~5KB gzipped)
- Custom cursor hidden on touch devices via media query
- Content-hashed assets for long-term caching

## Bundle Output

```
dist/index.html              ~1.8 KB
dist/assets/index.css        ~31 KB  (gzip: ~6 KB)
dist/assets/index.js         ~117 KB (gzip: ~39 KB)
dist/assets/animation.js     ~131 KB (gzip: ~44 KB) — Framer Motion + Lenis
dist/assets/three-vendor.js  ~943 KB (gzip: ~262 KB) — Three.js (lazy-loaded)
```
