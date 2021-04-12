import { RequestHandler } from "express";
import { UserRoles } from "../../models/Role";
import { isValidUserData, User, UserData, UserExistsError } from '../../models/User';

/**
 * Create a new user
 * @param req 
 * @param res 
 * @param next 
 */
const register: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    if(isValidUserData(req.query)) {
      const found: any = await User.findOne({where: {email: req.query.email}});
      if(found) {
        return next(new UserExistsError(req.query.email.toString()));
      }
      const data: UserData = {
        email: req.query.email,
        password: req.query.password,
        role: UserRoles.user
      } as UserData;

      const user = await User.create(data);
      res.send(user);
    }

  } catch (err) {
    next(err);
  }
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