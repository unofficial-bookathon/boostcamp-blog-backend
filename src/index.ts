import 'reflect-metadata';
import { appConfigService } from './config/app/config.service';
import { App } from './app';

const main = () => {
  const app = new App();

  app.listen(appConfigService.port);
};

main();
