import { ErrorRequestHandler } from 'express';
import { HTTPCode } from '../models/HTTPCodes';

enum ErrorType {
  InvalidRoute = 'InvalidRouteError',
  UserExistsError = 'UserExistsError',
  AuthenticationError = 'AuthenticationError',
  PermissionError = 'PermissionError',
  ClientError = 'ClientError',
  BadRequestError = 'BadRequestError'
}

class ErrorResponse extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number) {
    super();
    this.statusCode = statusCode;
  }
}

class BadRequestError extends ErrorResponse {
  name: ErrorType = ErrorType.BadRequestError;
  constructor(type?: string) {
    super(HTTPCode.BadRequest);
    this.message = `Bad Request${type && ': Invalid ' + type}`;
  }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  switch (err.name) {
    case ErrorType.InvalidRoute:
    case ErrorType.UserExistsError:
    case ErrorType.AuthenticationError:
    case ErrorType.PermissionError:
    case ErrorType.BadRequestError:
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