import express, { Express, RequestHandler } from 'express';
import { logger } from './common/utils/logger';

export class App {
  private readonly app: Express;
  private middlewares: RequestHandler[] = [];

  constructor() {
    this.app = express();
  }

  useMiddlewares(...middlewares: RequestHandler[]) {
    this.middlewares.push(...middlewares);
  }

  private initializeMiddleware() {
    this.middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private initilize() {
    this.initializeMiddleware();
  }

  listen(port: number) {
    this.initilize();

    this.app.listen(port, () => {
      logger.info(`Listening Port: ${port}`);
    });
  }
}
