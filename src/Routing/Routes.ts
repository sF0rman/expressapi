import express, { Router } from 'express';
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

  return router;
}

export {
  createRoutes
}