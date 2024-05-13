import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class GetListQueryRequestDto {
  @Expose({
    name: 'page',
  })
  @Transform((e) => (e.value === undefined ? 0 : Number(e.value)))
  @IsOptional()
  @IsNumber()
  @Min(0)
  page: number;
}

export class GetListRequestDto {
  user: User;
}
