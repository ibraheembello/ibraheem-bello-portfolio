# Portfolio Client

React frontend for the portfolio website, built with TypeScript, Tailwind CSS, Framer Motion, and Three.js.

## Stack

- **React 18** with TypeScript
- **Vite** for fast builds and HMR
- **Tailwind CSS** with custom glassmorphism theme
- **Framer Motion** for scroll animations and layout transitions
- **Three.js / React Three Fiber** for 3D hero scene (GPU-detected, lazy-loaded)
- **GSAP** for advanced scroll-triggered sequences

## Structure

```
src/
├── components/
│   ├── About/          # Bio section with profile photo
│   ├── Contact/        # Contact form with validation
│   ├── Experience/     # Timeline + certifications
│   ├── Hero/           # Hero with 3D background
│   ├── Layout/         # Navbar, Footer
│   ├── Projects/       # Project cards with filters
│   ├── Skills/         # Tabbed skills display
│   └── ui/             # Reusable components (Button, GlassCard, etc.)
├── lib/
│   ├── animations/     # Shared config, hooks, variants
│   └── three/          # HeroScene (particles, geometry, orbs)
├── types/              # TypeScript interfaces
├── App.tsx             # Root layout
├── index.css           # Global styles, Tailwind directives
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
- Content-hashed assets for long-term caching
