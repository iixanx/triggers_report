import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, Min, NotEquals } from 'class-validator';

export class GetUserQuizResultsQueryRequestDto {
  @Expose({
    name: 'user_id',
  })
  @Transform((e) => Number(e.value))
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  userId: number;

  @Expose({
    name: 'page',
  })
  @Transform((e) => (e.value === undefined ? 0 : Number(e.value)))
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  page: number;
}

export class GetUserQuizResultsRequestDto {
  user: User;
}
