import 'reflect-metadata';
import app from './app';
import { logger } from './common/utils/logger';
import { appConfigService } from './config/app/config.service';

app.listen(appConfigService.port, () => {
  logger.info(`Listening to port: ${appConfigService.port}`);
});
