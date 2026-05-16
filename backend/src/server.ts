import app from './app';
import { logger } from './utils/logger';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 5000;

/**
 * Start the server
 */
async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('✅ Database connected successfully');

    // Start Express server
    const server = app.listen(PORT, () => {
      logger.info(`\n✅ Server running on http://localhost:${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
      logger.info('\n📚 API Documentation:');
      logger.info('  Health Check: GET /health');
      logger.info('  Auth Routes: POST /auth/register, POST /auth/login');
      logger.info('  Business Routes: GET /api/google/businesses, POST /api/google/businesses/connect');
      logger.info('  Reviews Routes: GET /api/reviews, POST /api/reviews/ai-reply');
      logger.info('  Analytics Routes: GET /api/analytics/views, GET /api/analytics/calls');
      logger.info('  QR Routes: POST /api/qr/generate, GET /api/qr/analytics/:id');
      logger.info('  Admin Routes: GET /api/admin/users, GET /api/admin/analytics');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, closing server gracefully');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, closing server gracefully');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
