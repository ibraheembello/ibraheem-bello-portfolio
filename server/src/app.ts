import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import healthRoutes from './routes/healthRoutes';
import contactRoutes from './routes/contactRoutes';
import projectRoutes from './routes/projectRoutes';
import resumeRoutes from './routes/resumeRoutes';

const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: config.nodeEnv === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS
app.use(
  cors({
    origin: config.nodeEnv === 'production' ? config.clientUrl : '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Request logging
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Rate limiter for contact form (disabled in test environment)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.nodeEnv === 'test' ? 0 : 5,
  message: { success: false, message: 'Too many messages. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === 'test',
});

// API routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api', projectRoutes);
app.use('/api/resume', resumeRoutes);

// Serve static frontend in production
if (config.nodeEnv === 'production') {
  const clientDistPath = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(clientDistPath));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Error handler
app.use(errorHandler);

export default app;
