import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetUserRequestDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
