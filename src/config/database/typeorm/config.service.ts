import path from 'path';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { appConfigService, AppConfigService } from '../../app/config.service';
import { mysqlConfigService, MysqlConfigService } from '../mysql/config.service';

export class TypeOrmConfigService {
  constructor(
    private readonly mysqlConfigService: MysqlConfigService,
    private readonly appConfigSerivce: AppConfigService
  ) {}

  createTypeOrmOptions(): DataSourceOptions {
    const entityPath = path.resolve(__dirname, '..', '..', '..', '**/*.entity.{js,ts}');

    return {
      type: 'mysql',
      host: this.mysqlConfigService.hostname,
      port: this.mysqlConfigService.port,
      username: this.mysqlConfigService.username,
      password: this.mysqlConfigService.passwrod,
      database: this.mysqlConfigService.dbName,
      entities: [entityPath],
      logging: this.appConfigSerivce.isDevelopment() ? 'all' : ['error', 'warn'],
      dropSchema: this.appConfigSerivce.isTest(),
      synchronize: !this.appConfigSerivce.isProduction(),
      namingStrategy: new SnakeNamingStrategy(),
      poolSize: 30,

      // MYSQL 서버에 구성되어있는 timezone을 의미
      timezone: 'Z',
    };
  }
}

export const typeormConfigService = new TypeOrmConfigService(mysqlConfigService, appConfigService);
