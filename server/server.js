import app from './src/app.js';
import { config } from './src/config/env.js';

const server = app.listen(config.port, () => {
  console.log(`QuickKart server running on http://localhost:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
