import { RequestHandler } from 'express';

export const catchAsync =
  (fn: RequestHandler<any, any, any, any>): RequestHandler =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
