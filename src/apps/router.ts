import express from 'express';
import { appConfigService } from '../config/app/config.service';
import { swaggerRouter } from './docs/swagger.router';
import { userRouter } from './user/user.router';

const router = express.Router();

router.use('/users', userRouter);

if (appConfigService.isDevelopment()) {
  router.use('/docs', swaggerRouter);
}

export { router as v1Router };
