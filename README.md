# Ibraheem Bello - Portfolio

Professional portfolio website showcasing my backend engineering projects, skills, and experience.

**Live:** [ibraheembello.com](https://ibraheembello.com)

## Tech Stack

| Layer      | Technologies                                          |
| ---------- | ----------------------------------------------------- |
| Frontend   | React 18, TypeScript, Tailwind CSS, Framer Motion, Three.js |
| Backend    | Node.js, Express.js, TypeScript                       |
| Testing    | Jest, Supertest, Vitest, React Testing Library         |
| Deployment | AWS EC2, Nginx, PM2, GitHub Actions CI/CD             |

## Project Structure

```
ibraheem-bello-portfolio/
├── client/             # React frontend (Vite)
│   ├── public/         # Static assets (images, resume)
│   └── src/            # Components, animations, types
├── server/             # Express backend
│   ├── src/            # Routes, controllers, services, data
│   └── tests/          # Jest test suites
├── nginx/              # Nginx server configuration
├── .github/workflows/  # CI/CD pipeline
└── ecosystem.config.js # PM2 process manager config
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/ibraheembello/ibraheem-bello-portfolio.git
cd ibraheem-bello-portfolio

# Install all dependencies (root, client, server)
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials
```

### Development

```bash
# Run both client and server concurrently
npm run dev

# Or run individually
npm run dev:client   # React dev server on http://localhost:5173
npm run dev:server   # Express API on http://localhost:8080
```

### Testing

```bash
# Run all tests
npm test

# Server tests only
npm run test:server

# Client tests only
npm run test:client
```

### Production Build

```bash
# Build both client and server
npm run build

# Start production server
npm start
```

## API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/api/health`        | Health check             |
| GET    | `/api/projects`      | List all projects        |
| GET    | `/api/skills`        | List skills by category  |
| GET    | `/api/experience`    | List work experience     |
| GET    | `/api/resume/download` | Download resume PDF    |
| POST   | `/api/contact`       | Send contact form email  |

## Deployment

Deployed on AWS EC2 with:

- **Nginx** as reverse proxy with SSL (Let's Encrypt)
- **PM2** for process management
- **GitHub Actions** for automated CI/CD on push to `main`

See [`nginx/portfolio.conf`](nginx/portfolio.conf) and [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for configuration details.

## License

MIT

## Author

**Ibraheem Bello** - Backend Developer

- GitHub: [@ibraheembello](https://github.com/ibraheembello)
- LinkedIn: [Ibraheem Bello](https://linkedin.com/in/ibraheem-bello-049b34287)
- Email: belloibrahimolawale@gmail.com
