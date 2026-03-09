# Ibraheem Bello - Portfolio

[![Live Site](https://img.shields.io/badge/Live-ibraheembello.com-7C3AED?style=for-the-badge&logo=googlechrome&logoColor=white)](https://ibraheembello.com)
[![Tests](https://img.shields.io/badge/Tests-29%2F29%20Passing-06B6D4?style=for-the-badge&logo=jest&logoColor=white)](#testing)
[![Deploy](https://img.shields.io/badge/Deployed-AWS%20EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)](#deployment)

Professional portfolio website showcasing my backend engineering projects, skills, certifications, and experience. Built as a full-stack application with a React frontend and Express.js backend API, featuring Awwwards-level interactive animations and scroll-driven experiences.

## Preview

| Section | Description |
|---------|-------------|
| **Hero** | 3D particle background (Three.js), split-text name reveal, text scramble role cycling |
| **About** | Animated glowing IB logo, clip-path bio reveal, highlight cards with staggered entrance |
| **Stats** | Animated number counters with scroll-triggered reveal |
| **Skills** | Tabbed categories (Languages, Backend, Databases, DevOps) with animated badges |
| **Marquee** | Infinite scrolling tech banner (Syne font, uppercase, tracking-widest) |
| **Projects** | Horizontal scroll gallery (desktop), swipeable carousel (mobile), full-viewport cards |
| **Experience** | Timeline with work history + certifications with thumbnail images |
| **Blog** | Dev.to article feed with cover images, tags, and reading time |
| **Testimonials** | Quote cards with staggered fade animations |
| **Contact** | Working contact form (Gmail SMTP) with animated success checkmark |

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Framer Motion, Three.js/R3F, Lenis |
| **Typography** | Clash Display (headings), Syne (accents), Satoshi (body) — Fontshare |
| **Backend** | Node.js, Express.js, TypeScript, Nodemailer, Winston |
| **Security** | Helmet, CORS, Rate Limiting, Input Validation/Sanitization |
| **Testing** | Jest, Supertest (29 tests), Vitest, React Testing Library |
| **Deployment** | AWS EC2 (eu-west-2), Nginx, PM2, Let's Encrypt SSL, GitHub Actions CI/CD |
| **Domain** | Route 53 DNS, ibraheembello.com |

## Interactive Features

- **Lenis Smooth Scroll** — Buttery-smooth scroll engine replacing native browser scroll
- **Split-Text Reveal** — Word-by-word staggered animation on hero name
- **Text Scramble** — Character decode/scramble effect cycling through roles
- **Custom Cursor** — Dot + spring-physics follower circle with `mix-blend-mode: difference` (desktop only)
- **Horizontal Scroll Gallery** — Scroll-driven horizontal project showcase with full-viewport cards
- **Clip-Path Reveals** — Inset wipe animations on content blocks
- **Magnetic Buttons** — Spring-based cursor attraction on CTAs
- **Infinite Marquee** — Continuously scrolling tech stack banner
- **Swipeable Mobile Carousel** — Touch-drag project cards with dot indicators

## Project Structure

```
ibraheem-bello-portfolio/
├── client/                 # React frontend (Vite)
│   ├── public/
│   │   ├── images/         # Optimized WebP images
│   │   │   ├── projects/   # Project screenshots
│   │   │   └── certifications/ # Certification images
│   │   └── resume.pdf      # Downloadable resume
│   └── src/
│       ├── components/     # Hero, About, Stats, Skills, Projects, Experience, Blog, Testimonials, Contact
│       │   ├── ui/         # SplitText, ClipReveal, TextScramble, CustomCursor, MagneticButton, Marquee, etc.
│       │   └── Layout/     # Navbar, Footer
│       ├── contexts/       # LenisProvider (smooth scroll)
│       ├── lib/            # Animation config, hooks, variants, Three.js scene
│       └── types/          # Shared TypeScript interfaces
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Email service
│   │   ├── middleware/     # Validation, error handling
│   │   └── data/           # JSON data (projects, skills, experience)
│   └── tests/              # 29 test cases (routes + services)
├── nginx/                  # Nginx reverse proxy config
├── .github/workflows/      # CI/CD pipeline (test + deploy)
└── ecosystem.config.js     # PM2 process manager config
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/ibraheembello/ibraheem-bello-portfolio.git
cd ibraheem-bello-portfolio

# Install all dependencies
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Configure environment
cp .env.example .env
# Edit .env with your Gmail app password and other settings
```

### Development

```bash
npm run dev           # Run client + server concurrently
npm run dev:client    # React dev server → http://localhost:5173
npm run dev:server    # Express API → http://localhost:8080
```

### Testing

```bash
npm test              # Run all tests
npm run test:server   # Server tests only (29 tests)
npm run test:client   # Client tests only
```

### Production Build

```bash
npm run build         # Build client (Vite) + server (TypeScript)
npm start             # Start production server
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check with uptime |
| `GET` | `/api/projects` | Project portfolio data |
| `GET` | `/api/skills` | Skills grouped by category |
| `GET` | `/api/experience` | Work experience timeline |
| `GET` | `/api/blog` | Blog articles from dev.to |
| `GET` | `/api/resume/download` | Resume PDF download |
| `POST` | `/api/contact` | Contact form submission (rate limited: 5/15min) |

## Deployment

Deployed on **AWS EC2** (eu-west-2, t2.micro) with:

- **Nginx** — Reverse proxy, gzip, static asset caching (1yr for hashed files)
- **PM2** — Process management with auto-restart on crash/reboot
- **Let's Encrypt** — Free SSL with auto-renewal
- **GitHub Actions** — Automated CI/CD: test on push, deploy via SSH
- **Route 53** — DNS management for ibraheembello.com

## Performance

- Images converted to **WebP** (95% smaller than original PNGs)
- Three.js code-split into separate chunk, **lazy-loaded only on capable GPUs**
- CSS fallback with animated gradient orbs on mobile/low-end devices
- **Lenis** smooth scroll engine (~5KB gzipped)
- Fontshare CDN for custom typography (Clash Display, Syne, Satoshi)
- Content-hashed assets with **1-year browser cache**
- Gzip compression on all text-based responses

## Author

**Ibraheem Bello** — Backend Developer | Engineering Leader

- Portfolio: [ibraheembello.com](https://ibraheembello.com)
- GitHub: [@ibraheembello](https://github.com/ibraheembello)
- LinkedIn: [Ibraheem Bello](https://linkedin.com/in/ibraheem-bello-049b34287)
- Twitter: [@Officialibrosky](https://x.com/Officialibrosky)
- Email: belloibrahimolawale@gmail.com

## License

MIT
