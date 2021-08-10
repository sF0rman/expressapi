import { Color } from 'colors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { db } from './database/database';
import { createRoutes } from './routing/routes';
import { errorHandler } from './utils/errorHandler';
const cors = require('cors');
const colors: Color = require('colors');

const ca1 = fs.readFileSync('sslcert/ca_1.pem', 'utf-8');
const ca2 = fs.readFileSync('sslcert/ca_2.pem', 'utf-8');
const privateKey = fs.readFileSync('sslcert/key.pem', 'utf-8');
const certificate = fs.readFileSync('sslcert/cert.pem', 'utf-8');

// Load environment variables.
dotenv.config({ path: './.env' });

let retryCount = 0;
const boot = () => {
  // Start Server
  const dev = process.env.DEVELOPMENT === 'true';
  console.clear();
  console.log('Starting...'.green);
  console.log(dev ? 'Development Mode' : 'Live Production Build');
  // Start Database
  db.authenticate().then(async () => {
    await db.sync({ force: true }); // force to reset db, alter to update tables.

    const credentials = { ca: [ca1, ca2], key: privateKey, cert: certificate };
    // Start server
    const app = express();
    const router: Router = createRoutes();
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use('/api', router);
    app.use(errorHandler);
    const PORT: string | number = process.env.SERVER_PORT || 0;

    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);
    if(dev) {
      httpServer.listen(PORT, () => {
        console.log('HTTP: Listening on ', httpServer.address());
      });
    } else {
      httpsServer.listen(PORT, () => {
        console.log('HTTPS: Listening on ', httpsServer.address());
      });
    }

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