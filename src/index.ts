import 'reflect-metadata';
import app from './app';
import { dataSource } from './common/data-source';
import { logger } from './common/utils/logger';
import { appConfigService } from './config/app/config.service';

dataSource.initialize().then(() => {
  logger.info('Connected Database');
  app.listen(appConfigService.port, () => {
    logger.info(`Listening to port: ${appConfigService.port}`);
  });
});
