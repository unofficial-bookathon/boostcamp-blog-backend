import dotenv from 'dotenv';
import path from 'path';

export abstract class ConfigService<T = Record<string, unknown>> {
  protected readonly config: T;
  constructor() {
    this.loadEnviromentVariable();
    this.config = this._validate();
  }

  private getEnvFilePath() {
    return process.env.NODE_ENV === 'test' ? './.env.test' : './.env.development';
  }

  private loadEnviromentVariable() {
    if (process.env.NODE_ENV !== 'production') {
      dotenv.config({ path: path.resolve(this.getEnvFilePath()) });
    }
  }

  private _validate() {
    return this.validate(process.env);
  }

  abstract validate(config: Record<string, unknown>): T;
}
