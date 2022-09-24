import 'reflect-metadata';
import { appConfigService } from './config/app/config.service';
import { App } from './app';
import { errorHandler, successHandler } from './common/middlewares/logger.middleware';

const main = () => {
  const app = new App();

  if (!appConfigService.isTest()) {
    app.useMiddlewares(successHandler, errorHandler);
  }

  app.listen(appConfigService.port);
};

main();
