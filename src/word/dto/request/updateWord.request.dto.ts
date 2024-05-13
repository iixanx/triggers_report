import { Optional } from '@nestjs/common';
import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import {
  IsAlpha,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  NotEquals,
} from 'class-validator';

export class UpdateWordParamRequestDto {
  @Expose({
    name: 'word_id',
  })
  @Transform((e) => Number(e.value))
  @IsNumber()
  @NotEquals(NaN)
  wordId: number;
}

export class UpdateWordRequestDto {
  @Expose({
    name: 'word',
  })
  @IsString()
  @IsAlpha()
  @IsOptional()
  @NotEquals(null)
  word: string;

  @Expose({
    name: 'mean',
  })
  @IsString()
  @IsOptional()
  @NotEquals(null)
  mean: string;

  user: User;
}
