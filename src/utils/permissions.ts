import { verify } from 'jsonwebtoken';
import { Users, UserData } from '../models/User';
import { HTTPCode } from '../models/HTTPCodes';
import { ErrorResponse, ErrorType } from './errorHandler';
import { UserRoles } from '../models/Role';

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
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) { return next(new PermissionError(Permissions.notLoggedIn)); }

  try {
    const data: any = verify(token, process.env.JWT_SECRET);
    req.user = await Users.findByPk(data.id);

    next();
  } catch (err) {
    next(new PermissionError(Permissions.notLoggedIn));
  }
}

const authorize = (...roles: UserRoles[]) => {
  return (req, res, next): void => {
    if(!roles.includes(req.user.role)) {
      return next(new PermissionError(Permissions.notAllowed));
    }
    next();
  }
}

export {
  protect,
  authorize
}