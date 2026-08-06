import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { config } from './config/env';
import { correlationIdMiddleware } from './core/middlewares/correlation';
import { setupSwagger } from './config/swagger';
// import { httpLogger } from '../../packages/logger'; // Monorepo logger

import apiRoutes from './api/routes';

const app: Express = express();
const PORT = config.PORT || 8000;

// Security and utility middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' })); // Mitigate DoS via large payloads
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Enterprise Observability
app.use(correlationIdMiddleware);
// app.use(httpLogger); // Pino logger

// Rate limiting to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, 
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Setup OpenAPI Documentation
setupSwagger(app);

// Global API Router
app.use('/api/v1', apiRoutes);

// Health Check Endpoint (For AWS / Kubernetes)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Helping Hand API is running', timestamp: new Date() });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // In production, route this to a logging service like Datadog or Sentry
  res.status(500).json({
    error: {
      message: config.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
      code: 'INTERNAL_SERVER_ERROR'
    }
  });
});

export { app };

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Server] Enterprise API successfully started on port ${PORT}`);
  });
}
