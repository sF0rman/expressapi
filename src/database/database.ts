import {Sequelize} from 'sequelize';

export interface DatabaseConnection {
  type: string;
  host: string;
  port: string;
  user: string;
  pass: string;
  name: string;
}

const createDatabase = async (connection: DatabaseConnection): Promise<void> => {
  const {type, host, port, user, pass, name}: DatabaseConnection = connection;
  const sequelize: Sequelize = new Sequelize(`${type}://${user}:${pass}@${host}:${port}/${name}`);

  try {
    await sequelize.authenticate();
    console.log(`Connected to database: ${name}`);
  } catch (err) {
    console.error(`Unable to connect to database: ${name}`);
  }
}

export {
  createDatabase
}
