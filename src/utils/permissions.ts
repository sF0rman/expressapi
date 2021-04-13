import { RequestParamHandler, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User, UserData } from '../models/User';
import { HTTPCode } from '../models/HTTPCodes';
import { ErrorResponse, ErrorType } from './errorHandler';

enum Permissions {
  notLoggedIn,
  notAllowed
}

class PermissionError extends ErrorResponse {
  name: string = ErrorType.PermissionError;
  constructor(type: Permissions) {
    super(HTTPCode.Forbidden)

    switch (type) {
      case Permissions.notLoggedIn:
        this.message = 'Access Denied: Must be logged in'
        break;
      case Permissions.notAllowed:
        this.message = 'Access Denied: You do not have access permission to this route';
    }
  }
}

const protect = async (req, res, next): Promise<void> => {
  let token: string;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) { return next(new PermissionError(Permissions.notLoggedIn)); }

  try {
    const data: any = verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(data.id);

    next();
  } catch (err) {
    next(err);
  }
}

export {
  protect
}