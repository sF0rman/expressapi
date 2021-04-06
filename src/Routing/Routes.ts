import express from 'express';
const router = express.Router();

const createRoutes = (app) => {
  router.get('/status', (req, res, next) => {
    res.send('API is stable and working.');
  })

  // Setup Routes
  router.use('/auth', require('./routes/auth'));


  return router;
}

export {
  createRoutes
}