import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const errors: Record<string, number> = {
  ValidationError: 400,
  NotFoundError: 401,
  DontExistError: 404,
};

const errorMiddlewareHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[err.name];

  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues[0].message });
  } 
  if (!status) return res.sendStatus(500);
  
  res.status(status).json({ message: err.message });
};

export default errorMiddlewareHandler;