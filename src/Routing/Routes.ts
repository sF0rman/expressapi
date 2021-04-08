import express, { Router } from 'express';
import { ErrorResponse } from '../controller/errorHandler';
const router = express.Router();

/**
 * Add API routes
 * @returns Express Router.
 * @author sForman
 */
const createRoutes = (): Router => {
  router.get('/status', (req, res, next): void => {
    res.send('API is stable and working.');
  })

  // Setup Routes
  router.use('/auth', require('./routes/auth'));

  // 404 Invalid Routes
  router.all('*', invalidRoute);

  return router;
}

const invalidRoute = (req, res, next) => {
  next(new ErrorResponse(`Path to ${req.originalUrl.replace('//', '/')} not found`, 404));
}

export {
  createRoutes
}