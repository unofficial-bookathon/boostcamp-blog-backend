import { NextFunction, Request, RequestHandler, Response } from 'express';

export function catchAsync<Param, ResBody, Body, Query>(
  fn: (req: Request<Param, ResBody, Body, Query>, res: Response, next?: NextFunction) => Promise<void>
): RequestHandler<Param, ResBody, Body, Query> {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
