import express, { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v1Router } from './apps/router';
import { HttpException } from './common/exceptions/http.exception';
import { exceptionConverter, exceptionFilter } from './common/middlewares/error.middleware';
import { errorHandler, successHandler } from './common/middlewares/logger.middleware';
import { appConfigService } from './config/app/config.service';

const app = express();

if (appConfigService.isTest()) {
  app.use(successHandler);
  app.use(errorHandler);
}

app.use('/v1', v1Router);

app.use((req, res, next) => {
  next(new HttpException(StatusCodes.NOT_FOUND, 'NOT_FOUND', '존재하지 않는 API 입니다'));
});

app.use(exceptionConverter);
app.use(exceptionFilter);

export default app;
