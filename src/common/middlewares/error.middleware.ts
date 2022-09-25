import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { appConfigService } from '../../config/app/config.service';
import { HttpException } from '../exceptions/http.exception';
import { logger } from '../utils/logger';

export const exceptionConverter: ErrorRequestHandler = (error, req, res, next) => {
  if (appConfigService.isDevelopment()) {
    logger.error(error);
  }

  if (!(error instanceof HttpException))
    return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', 'INTERNAL_SERVER_ERROR'));

  next(error);
};

export const exceptionFilter: ErrorRequestHandler = (error, req, res, next) => {
  const { statusCode, errorCode, message, stack } = error;

  res.locals.error = error;

  const response = {
    errorCode,
    message,
    ...(appConfigService.isDevelopment() ? { stack } : {}),
  };

  res.status(statusCode).json(response);
};
