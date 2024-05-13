import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsNumberString, NotEquals } from 'class-validator';

export class DeleteWordParamRequestDto {
  @Expose({
    name: 'word_id',
  })
  @Transform(e => Number(e.value))
  @IsNumber()
  wordId: number;
}

export class DeleteWordRequestDto {
  user: User;
}
