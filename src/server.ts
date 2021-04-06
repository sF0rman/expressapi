import express, { Router } from 'express';
import dotenv from 'dotenv';

import {createRoutes} from './routing/routes';

// Start Server
console.log('Server Starting...');
const app = express();
const router: Router = createRoutes();
app.use('/api', router);

// Load environment variables.
dotenv.config({path: '../config/config.env'});
const HOST: string = process.env.SERVER_HOST || 'localhost';
const PORT: string = process.env.SERVER_PORT || '1337';

// TODO: Connect to Database

app.listen(PORT, (): void => {
  console.log(`Server Started at http://${HOST}:${PORT}`);
});