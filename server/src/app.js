import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import healthRoutes from './routes/healthRoutes.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: config.clientOrigin,
  credentials: true,
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    service: 'QuickKart API Server',
    status: 'online',
    healthCheck: '/api/health',
    frontendUrl: config.clientOrigin,
    message: 'This is the backend API server. For the customer storefront, open http://localhost:5173',
  });
});

app.use('/api', healthRoutes);

// 404 Handler
app.use(notFound);

// Central Error Handler
app.use(errorHandler);

export default app;
