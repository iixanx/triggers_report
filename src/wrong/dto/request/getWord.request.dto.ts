import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, Min, NotEquals } from 'class-validator';

export class GetWordParamRequestDto {
  @Expose({
    name: 'word_id',
  })
  @Transform((e) => Number(e.value))
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  wordId: number;
}

export class GetWordRequestDto {
  user: User;
}
