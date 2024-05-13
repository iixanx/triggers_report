import { Optional } from '@nestjs/common';
import { User } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsAlpha,
  IsNumberString,
  IsOptional,
  IsString,
  NotEquals,
} from 'class-validator';

export class UpdateWordParamRequestDto {
  @Expose({
    name: 'word_id',
  })
  @IsNumberString()
  wordId: string;
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
