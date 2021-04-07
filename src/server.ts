import express, { Router } from 'express';
import dotenv from 'dotenv';

import { createRoutes } from './routing/routes';
import { createDatabase, DatabaseConnection } from './database/database';

// Start Server
console.log('Server Starting...');
const app = express();
const router: Router = createRoutes();
app.use('/api', router);

// Load environment variables.
dotenv.config({ path: './config/config.env' });
const HOST: string = process.env.SERVER_HOST || 'localhost';
const PORT: string = process.env.SERVER_PORT || '1337';

// Connect to Database
const connection: DatabaseConnection = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME
}
createDatabase(connection);


app.listen(PORT, (): void => {
  console.log(`Server Started at http://${HOST}:${PORT}`);
});