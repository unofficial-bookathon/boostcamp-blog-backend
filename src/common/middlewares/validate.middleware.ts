import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { appConfigService } from '../../config/app/config.service';
import { HttpException } from '../exceptions/http.exception';
import { catchAsync } from '../utils/catch-async';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function _validate<T extends Object>(template: { new (): T }, target: Object) {
  const validatedConfig = plainToClass(template, { ...target });
  const errors = await validate(validatedConfig);
  if (errors.length > 0) {
    const error = errors[0];
    const message = appConfigService.isDevelopment()
      ? `입력값이 올바르지 않습니다 - ${error.property}: ${error.value}`
      : '입력값이 올바르지 않습니다';

    throw new HttpException(StatusCodes.BAD_REQUEST, 'BAD_PARAMETERS', message);
  }

  return validatedConfig;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function validator<Param extends Object = any, Body extends Object = any, Query extends Object = any>({
  param,
  body,
  query,
}: {
  param?: { new (): Param };
  body?: { new (): Body };
  query?: { new (): Query };
}): RequestHandler<Param, any, Body, Query> {
  return catchAsync<Param, any, Body, Query>(async (req, res, next) => {
    try {
      req.params = await _validate(param, req.params);
      req.body = await _validate(body, req.body);
      req.query = await _validate(query, req.query);
    } catch (err) {
      return next(err);
    }

    next();
  });
}
