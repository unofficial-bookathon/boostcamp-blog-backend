import { DataSource } from 'typeorm';
import { typeormConfigService } from '../config/database/typeorm/config.service';

export const dataSource = new DataSource(typeormConfigService.createTypeOrmOptions());
