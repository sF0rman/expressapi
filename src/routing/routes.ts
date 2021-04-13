import express, { Router } from 'express';
import { HTTPCode } from '../models/HTTPCodes';
import { ErrorResponse, ErrorType } from '../utils/errorHandler';
const router = express.Router();

class InvalidRouteError extends ErrorResponse {
  name: string = ErrorType.InvalidRoute;
  constructor() {
    super('Route not found', HTTPCode.NotFound);
  }
}

class ClientError extends ErrorResponse {
  name: string = ErrorType.ClientError;
  constructor(message: string) {
    super(message, HTTPCode.BadRequest);
  }
}

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
  next(new InvalidRouteError());
}

export {
  createRoutes
}