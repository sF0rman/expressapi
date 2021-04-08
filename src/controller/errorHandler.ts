import { ErrorRequestHandler } from 'express';

class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.stack?.red ?? 'Unknown Server Error'.red);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
}

export {
  errorHandler,
  ErrorResponse
}