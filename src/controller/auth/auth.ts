import { RequestHandler } from "express";

/**
 * Create a new user
 * @param req 
 * @param res 
 * @param next 
 */
const register: RequestHandler = (req, res, next): void => {
  res.send('Register');
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