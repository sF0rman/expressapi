import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('ERROR: '.red + err.stack.red);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
}

class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export {
  errorHandler,
  ErrorResponse
}