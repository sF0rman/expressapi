import { RequestHandler } from "express";
import { isValidEmail } from "../../utils/utils";
import { HTTPCode } from '../../models/HTTPCodes';
import { UserRoles } from "../../models/Role";
import { isValidUserData, User, UserData, UserExistsError } from '../../models/User';
import { BadRequestError, ErrorResponse, ErrorType } from '../../utils/errorHandler';

enum AuthenticationErrors {
  noUser,
  badPassword
}
class AuthenticationError extends ErrorResponse {
  name: ErrorType = ErrorType.AuthenticationError;
  constructor(type: AuthenticationErrors) {
    super(HTTPCode.BadRequest);
    switch (type) {
      case AuthenticationErrors.noUser:
        this.message = 'No user with that email exists';
        break;
      case AuthenticationErrors.badPassword:
        this.message = 'Email and password do not match';
    }
  }
}

/**
 * @description Create a new user
 * @route POST /api/auth/register 
 * @access Public  
 **/
const register: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    if (req.body && isValidUserData(req.body)) {
      if (!isValidEmail(req.body.email)) {
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
      res.status(HTTPCode.Created).send({ success: true, token });
    } else {
      return next(new BadRequestError());
    }

  } catch (err) {
    next(err);
  }
}

/**
 * @description Login
 * @route POST /api/auth/login 
 * @access Public  
 **/
const login: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { email, password }: UserData = req.body;

    if (!isValidEmail(email)) { return next(new BadRequestError('email')); }
    if (!password) { return next(new BadRequestError('password')); }

    const user = await User.findOne({
      where: { email },
      attributes: { include: ['password'] }
    });

    if (!user) {
      return next(new AuthenticationError(AuthenticationErrors.noUser));
    }

    const match = await user.matchPassword(password);
    if (!match) {
      return next(new AuthenticationError(AuthenticationErrors.badPassword));
    }

    const token = user.getJwt();
    res.status(HTTPCode.Accepted).send({ success: true, token });

  } catch (err) {
    next(err);
  }
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