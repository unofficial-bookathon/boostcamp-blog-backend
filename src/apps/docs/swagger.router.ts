import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import { appConfigService } from '../../config/app/config.service';

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Boostcamp Blog Documentation',
      version: '0.0.1',
      description: 'boostcamp blog documentation',
    },
    servers: [{ url: `http://localhost:${appConfigService.port}/v1` }],
  },
  apis: ['src/apps/**/*.yml', 'src/**/*.router.{js|ts}'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  (function (schema, _swaggerOptions) {
    return (...args) => swaggerUi.setup(schema, _swaggerOptions)(...args);
  })(specs, { explorer: true })
);

export { router as swaggerRouter };
