import { Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import { ConfigService } from '../../config.service';

class MysqlConfig {
  @Expose()
  @IsString()
  MYSQL_HOSTNAME: string;

  @Expose()
  @IsString()
  MYSQL_USERNAME: string;

  @Expose()
  @IsString()
  MYSQL_PASSWORD: string;

  @Expose()
  @IsNumber()
  MYSQL_PORT: number;

  @Expose()
  @IsString()
  MYSQL_DATABASE: string;
}

export class MysqlConfigService extends ConfigService<MysqlConfig> {
  get hostname() {
    return this.config.MYSQL_HOSTNAME;
  }

  get username() {
    return this.config.MYSQL_USERNAME;
  }

  get passwrod() {
    return this.config.MYSQL_PASSWORD;
  }

  get port() {
    return this.config.MYSQL_PORT;
  }

  get dbName() {
    return this.config.MYSQL_DATABASE;
  }

  validate(config: Record<string, unknown>): MysqlConfig {
    const validatedConfig = plainToClass(
      MysqlConfig,
      { ...config },
      { enableImplicitConversion: true, excludeExtraneousValues: true }
    );

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }
}

export const mysqlConfigService = new MysqlConfigService();
