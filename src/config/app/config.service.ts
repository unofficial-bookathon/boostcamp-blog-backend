import { Expose, plainToClass, Type } from 'class-transformer';
import { IsNumber, IsIn, validateSync } from 'class-validator';
import { ConfigService } from '../config.service';

class AppConfig {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  PORT: number;

  @Expose()
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: 'development' | 'production' | 'test';
}

export class AppConfigService extends ConfigService<AppConfig> {
  get port(): number {
    return this.config.PORT;
  }

  get env(): 'development' | 'production' | 'test' {
    return this.config.NODE_ENV;
  }

  isDevelopment(): boolean {
    return this.env === 'development';
  }

  isTest(): boolean {
    return this.env === 'test';
  }

  isProduction(): boolean {
    return this.env === 'production';
  }

  validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(
      AppConfig,
      { ...config },
      { enableImplicitConversion: true, excludeExtraneousValues: true }
    );

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      console.log(errors);
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }
}

export const appConfigService = new AppConfigService();
