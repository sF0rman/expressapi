import { ErrorRequestHandler } from 'express';
import { HTTPCode } from '../models/HTTPCodes';

enum ErrorType {
  InvalidRoute = 'InvalidRouteError',
  UserExistsError = 'UserExistsError',
  AuthenticationError = 'AuthenticationError',
  PermissionError = 'PermissionError',
  ClientError = 'ClientError'
}

class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(){
    super('Bad Request', HTTPCode.BadRequest)
  }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  switch (err.name) {
    case ErrorType.InvalidRoute:
    case ErrorType.UserExistsError:
    case ErrorType.AuthenticationError:
    case ErrorType.PermissionError:
      console.log(err.name.red);
      break;
    default:
      console.log(err.stack.red ?? 'Unknown Server Error'.red);
      break;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
}

export {
  ErrorType,
  errorHandler,
  ErrorResponse,
  BadRequestError
}