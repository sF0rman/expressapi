import { ErrorRequestHandler } from 'express';

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

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.stack.red ?? 'Unknown Server Error'.red);

  switch (err.name) {
    case ErrorType.InvalidRoute:
    case ErrorType.UserExistsError:
    case ErrorType.AuthenticationError:
    case ErrorType.PermissionError:
      break;
    default:
      // Sequelize Errors
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
  ErrorResponse
}