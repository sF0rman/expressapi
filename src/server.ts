import express from 'express';
import dotenv from 'dotenv';

import {createRoutes} from './routing/routes';

// Start Server
console.log('API Starting...');
const app = express();
const router = createRoutes(app);
app.use('/api', router);

// Load environment variables.
dotenv.config({path: '../config/config.env'});
const HOST: string = process.env.SERVER_HOST || 'localhost';
const PORT: string = process.env.SERVER_PORT || '1337';

// TODO: Connect to Database

app.listen(PORT, () => {
  console.log(`Server Started at http://${HOST}:${PORT}`);
});