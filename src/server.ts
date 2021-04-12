import express, { Router } from 'express';
import dotenv from 'dotenv';
import { Color } from 'colors';
const colors: Color = require('colors');

import { errorHandler } from './controller/ErrorHandler';

import { createRoutes } from './routing/routes';
// const db = require('./database/database');
import {db} from './database/database';

// Load environment variables.
dotenv.config({ path: './config/config.env' });

// Start Server
console.clear();
console.log('Starting...'.green);

const boot = () => {
  // Start Database
  db.authenticate().then(() => {
    db.sync();
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // Start server
  const app = express();
  const router: Router = createRoutes();
  app.use('/api', router);
  app.use(errorHandler);

  const HOST: string = process.env.SERVER_HOST || 'localhost';
  const PORT: string = process.env.SERVER_PORT || '1337';

  app.listen(PORT, (): void => {
    console.log(`Server Started at http://${HOST}:${PORT}`.green);
    console.log('----------------------------------------------')
  });
}

boot();