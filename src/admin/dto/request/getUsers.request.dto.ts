import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min, NotEquals } from 'class-validator';

export class GetUsersQueryRequestDto {
  @Expose({
    name: 'page',
  })
  @IsOptional()
  @Transform((e) => (e.value === undefined ? 0 : Number(e.value)))
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  page: number;
}
