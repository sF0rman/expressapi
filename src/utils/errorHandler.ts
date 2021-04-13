import { ErrorRequestHandler, Response } from 'express';
import { HTTPCode } from '../models/HTTPCodes';

enum ErrorType {
  InvalidRoute = 'InvalidRouteError',
  UserExistsError = 'UserExistsError',
  AuthenticationError = 'AuthenticationError',
  PermissionError = 'PermissionError',
  BadRequestError = 'BadRequestError',
  ResourceNotFoundError = 'ResourceNotFoundError'
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

enum Resource {
  User = 'User'
}
class ResourceNotFoundError extends ErrorResponse {
  name: ErrorType = ErrorType.ResourceNotFoundError;
  constructor(resource: Resource, query?: string | object) {
    super(HTTPCode.NotFound);
    if (!query) {
      this.message = `Resource not found: ${resource}`;
    } else {
      this.message = `Resource not found: ${resource} for query ${query.toString()}`;
    }
  }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  switch (err.name) {
    case ErrorType.InvalidRoute:
    case ErrorType.UserExistsError:
    case ErrorType.AuthenticationError:
    case ErrorType.PermissionError:
    case ErrorType.BadRequestError:
    case ErrorType.ResourceNotFoundError:
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
  BadRequestError,
  Resource,
  ResourceNotFoundError
}