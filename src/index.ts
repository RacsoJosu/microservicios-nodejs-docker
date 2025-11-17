import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import dotenv from 'dotenv';
import dayjs from './utils/dayjs';
import { DEFAULT_FORMAT_DAYJS } from './utils/const';
import { errorHandler } from './utils/errorHandler';
import { getPool } from './config/db';
dotenv.config();

const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(helmet());                 // Seguridad
app.use(cors({

  origin: "*",
  optionsSuccessStatus:200,
}));                   // CORS
app.use(express.json());           // JSON body parser
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ----------------------
// Healthcheck
// ----------------------
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: dayjs().format(DEFAULT_FORMAT_DAYJS.DATE_TIME)
  });
});

// ----------------------
// Example API route
// ----------------------
app.use('/api', (req: Request, res: Response) => {
  res.json({ message: 'API placeholder' });
});

// ----------------------
// 404 Handler
// ----------------------
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found',   route: req.originalUrl,
    method: req.method, });
});

// ----------------------
// Error Handler
// ----------------------
app.use(errorHandler);

// ----------------------
// Server
// ----------------------
const PORT = Number(process.env.PORT) || 3000;


// ----------------------
// Servidor
// ----------------------
const startServer = async () => {
  try {
    await getPool().query('SELECT 1'); // prueba de conexión
    console.log('🟢 DB ready');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    const shutdown = async () => {
      console.log('🛑 Shutting down server...');
      await getPool().end();
      server.close(() => process.exit(0));
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (err) {
    console.error('❌ DB connection failed', err);
    process.exit(1);
  }
};

startServer();

// ----------------------
// Graceful Shutdown
// ----------------------
const shutdown = async () => {
  console.log('🛑 Shutting down server...');
    await getPool().end();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
