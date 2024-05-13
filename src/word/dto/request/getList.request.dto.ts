import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  NotEquals,
} from 'class-validator';

export class GetListQueryRequestDto {
  @Expose({
    name: 'page',
  })
  @Transform((e) => (e.value == undefined ? 0 : Number(e.value)))
  @IsNumber()
  @IsOptional()
  @NotEquals(NaN)
  page: number;
}

export class GetListRequestDto {
  user: User;
}
