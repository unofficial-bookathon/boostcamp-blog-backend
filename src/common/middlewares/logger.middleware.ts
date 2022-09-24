import { Request, Response } from 'express';
import morgan from 'morgan';
import { logger } from '../utils/logger';

morgan.token('message', (_: Request, res: Response) => (res.locals.error && res.locals.error.message) || '');
morgan.token('client', (req: Request, _: Response) => req.ip);

const successResponseFormat = `client: :client - :method :url :status - :response-time ms`;
const errorResponseFormat = `client: :client - :method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});
