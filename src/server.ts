import express, { Router } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Color } from 'colors';
const colors: Color = require('colors');

import { errorHandler } from './utils/errorHandler';

import { createRoutes } from './routing/routes';
import { db } from './database/database';
import { exit } from 'node:process';

// Load environment variables.
dotenv.config({ path: './.env' });

let retryCount = 0;
const boot = () => {
  // Start Server
  console.clear();
  console.log('Starting...'.green);
  // Start Database
  db.authenticate().then(() => {
    db.sync(); // force to reset db, alter to update tables.

    // Start server
    const app = express();
    const router: Router = createRoutes();
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api', router);
    app.use(errorHandler);

    const HOST: string = process.env.SERVER_HOST || 'localhost';
    const PORT: string = process.env.SERVER_PORT || '1337';

    app.listen(PORT, (): void => {
      console.log(`Server Started at http://${HOST}:${PORT}`.green);
      console.log('----------------------------------------------');
      retryCount = 0;
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
    if (retryCount < 5) {
      setTimeout(boot, 3000);
      retryCount++;
    } else {
      process.exit(1);
    }
  });
}

boot();