import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
  message: string;
}

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  console.error(`[${status}] ${message}`, err);

  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorMiddleware;
