import { RequestHandler } from "express";
import { isValidEmail } from "../../utils/utils";
import { HTTPCode } from '../../models/HTTPCodes';
import { UserRoles } from "../../models/Role";
import { isValidUserData, User, UserData, UserExistsError } from '../../models/User';
import { BadRequestError } from '../../utils/errorHandler';

/**
 * Create a new user
 * @param req 
 * @param res 
 * @param next 
 */
const register: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    if (req.body && isValidUserData(req.body)) {
      if(!isValidEmail(req.body.email)) {
        return next(new BadRequestError('email'));
      }
      const found: any = await User.findOne({ where: { email: req.body.email } });
      if (found) {
        return next(new UserExistsError(req.body.email.toString()));
      }
      const data: UserData = {
        email: req.body.email,
        password: req.body.password,
        role: UserRoles.user
      } as UserData;

      const user = await User.create(data);
      const token = user.getJwt();
      res.status(HTTPCode.Created).send({ success: true, token});
    } else {
      return next(new BadRequestError());
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