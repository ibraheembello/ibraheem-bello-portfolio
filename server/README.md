# Portfolio Server

Express.js backend API serving portfolio data and handling the contact form.

## Stack

- **Express.js** with TypeScript
- **Nodemailer** for contact form emails (Gmail SMTP)
- **express-validator** for input validation and sanitization
- **express-rate-limit** for API protection
- **Helmet** for security headers
- **Winston** for structured logging
- **Jest + Supertest** for testing

## Structure

```
src/
├── config/
│   └── env.ts              # Typed environment config
├── controllers/
│   ├── contactController.ts # Contact form handler
│   └── projectController.ts # Data endpoints handler
├── data/
│   ├── experience.json     # Work experience entries
│   ├── projects.json       # Project showcase data
│   └── skills.json         # Skills by category
├── middleware/
│   ├── errorHandler.ts     # Centralized error handling
│   └── validate.ts         # Contact form validation rules
├── routes/
│   ├── contactRoutes.ts    # POST /api/contact
│   ├── healthRoutes.ts     # GET /api/health
│   ├── projectRoutes.ts    # GET /api/projects, /skills, /experience
│   └── resumeRoutes.ts     # GET /api/resume/download
├── services/
│   └── emailService.ts     # Nodemailer email transport
├── types/
│   └── index.ts            # Shared TypeScript interfaces
├── app.ts                  # Express app configuration
└── server.ts               # Server entry point

tests/
├── fixtures/
│   └── index.ts            # Test data factories
├── routes/
│   ├── contact.test.ts     # 15 tests (validation, security, XSS, SQL injection)
│   ├── health.test.ts      # 3 tests
│   └── projects.test.ts    # 8 tests
└── services/
    └── email.test.ts       # 3 tests (mocked transport)
```

## Scripts

```bash
npm run dev     # Start with ts-node-dev (hot reload)
npm run build   # Compile TypeScript to dist/
npm start       # Run compiled server
npm test        # Run Jest (29 tests)
```

## API Reference

### Health
- `GET /api/health` — Returns status, timestamp, uptime

### Projects
- `GET /api/projects` — All projects with metadata
- `GET /api/skills` — Skills grouped by category
- `GET /api/experience` — Work experience entries

### Contact
- `POST /api/contact` — Send email via contact form
  - Body: `{ name, email, message }`
  - Validation: name (2-100 chars), valid email, message (10-1000 chars)
  - Rate limited: 5 requests per 15 minutes

### Resume
- `GET /api/resume/download` — Download resume PDF

## Security

- Helmet security headers
- CORS with configurable origin
- Input sanitization (XSS, SQL injection prevention)
- Rate limiting on contact endpoint
- Request body size limit (10KB)
