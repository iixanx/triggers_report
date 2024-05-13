import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, Min, NotEquals } from 'class-validator';

export class PostRandomParamRequestDto {
  @Expose({
    name: 'word_id',
  })
  @Transform((e) => Number(e.value))
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  wordId: number;
}

export class PostRandomRequestDto {
  @Expose({
    name: 'mean_id',
  })
  @Transform((e) => Number(e.value))
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  meanId: number;

  user: User;
}
