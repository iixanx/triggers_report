import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PostRandomQueryRequestDto {
  @Expose({
    name: 'word_id',
  })
  @Transform((e) => Number(e.value))
  @IsNumber()
  @Min(0)
  wordId: number;
}

export class PostRandomRequestDto {
  @Expose({
    name: 'mean_id',
  })
  @IsNumber()
  @Min(0)
  meanId: number;

  user: User;
}
