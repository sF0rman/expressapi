import { RequestHandler } from "express";
import { UUIDV4 } from "sequelize/types";
import { UserRoles } from "../../models/Role";
const db = require('../../database/database');
import {User, UserData} from '../../models/User';
/**
 * Create a new user
 * @param req 
 * @param res 
 * @param next 
 */
const register: RequestHandler = async (req, res, next): Promise<void> => {
  const users: Array<UserData> = User.findAll();
  console.log(users);

  const data: UserData = {
    email: 'sebastian@forman.no',
    password: 'asdasd',
    role: UserRoles.admin
  }
  const user = await User.create(data);
  res.send(user);
}

/**
 * Request login for user
 * @param req 
 * @param res 
 * @param next 
 */
const login: RequestHandler = (req, res, next): void => {
  res.send('Login');
}

/**
 * Perform logout action
 * @param req 
 * @param res 
 * @param next 
 */
const logout: RequestHandler = (req, res, next): void => {
  res.send('Logout');
}

export {
  register,
  login,
  logout
};