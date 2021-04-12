import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });
const type: string = process.env.DB_TYPE;
const host: string = process.env.DB_HOST;
const port: string = process.env.DB_PORT;
const user: string = process.env.DB_USER;
const pass: string = process.env.DB_PASS;
const name: string = process.env.DB_NAME;

// module.exports = new Sequelize(`${type}://${user}:${pass}@${host}:${port}/${name}`);
const db = new Sequelize(`${type}://${user}:${pass}@${host}:${port}/${name}`);
export {
  db
}