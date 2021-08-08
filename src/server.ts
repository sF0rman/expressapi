import { Color } from 'colors';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import { Server } from 'node:http';
import { db } from './database/database';
import { createRoutes } from './routing/routes';
import { errorHandler } from './utils/errorHandler';
const cors = require('cors');
const colors: Color = require('colors');

// Load environment variables.
dotenv.config({ path: './.env' });

let retryCount = 0;
const boot = () => {
  // Start Server
  console.clear();
  console.log('Starting...'.green);
  console.log(process.env.DEVELOPMENT ? 'Development Mode' : 'Live Production Build');
  // Start Database
  db.authenticate().then(async () => {
    await db.sync(process.env.DEVELOPMENT ? { force: true } : { alter: true }); // force to reset db, alter to update tables.

    // Start server
    const app = express();
    const router: Router = createRoutes();
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use('/api', router);
    app.use(errorHandler);
    const HOST: string = process.env.SERVER_HOST || 'localhost';
    const PORT: string = process.env.SERVER_PORT || '1337';

    const listenServer = app.listen(0, function () {
      console.log('Listening on port ', listenServer.address())
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
    if (retryCount < 5) {
      setTimeout(boot, 5000);
      retryCount++;
    } else {
      process.exit(1);
    }
  });
}

boot();