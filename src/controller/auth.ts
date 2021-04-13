import { RequestHandler, Response } from "express";
import { addToDate, DateUnits, isValidEmail, okResponse } from "../utils/utils";
import { HTTPCode } from '../models/HTTPCodes';
import { UserRoles } from "../models/Role";
import { isValidUserData, User, UserData, UserExistsError } from '../models/User';
import { BadRequestError, ErrorResponse, ErrorType } from '../utils/errorHandler';

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

      const user: UserData = await User.create(data);
      sendTokenResponse(user, HTTPCode.Created, res);
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

    sendTokenResponse(user, HTTPCode.Accepted, res);

  } catch (err) {
    next(err);
  }
}

/**
 * @description Logout / Clear Auth cookie
 * @route POST /api/auth/logout 
 * @access Public  
 **/
const logout: RequestHandler = (req, res, next): void => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + addToDate(10, DateUnits.sec)),
    httpOnly: true
  });

  res.status(HTTPCode.OK).send(okResponse({}));
}

const sendTokenResponse = (user: UserData, statusCode: HTTPCode, res: Response) => {
  const token = user.getJwt();

  const expireTime = parseInt(process.env.COOKIE_EXPIRE);

  const cookieOptions = {
    expires: new Date(Date.now() + addToDate(expireTime, DateUnits.day)),
    httpOnly: true
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token
    });
}

export {
  register,
  login,
  logout
};