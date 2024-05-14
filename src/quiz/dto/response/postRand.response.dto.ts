import { Expose } from 'class-transformer';
import {
  IsAlpha,
  IsBoolean,
  IsNumber,
  IsString,
  Min,
  NotEquals,
} from 'class-validator';

export class PostRandomResponseDto {
  @Expose({
    name: 'is_correct',
  })
  @IsBoolean()
  is_correct: boolean;

  @Expose({
    name: 'word',
  })
  @IsAlpha()
  word: string;

  @Expose({
    name: 'mean',
  })
  @IsString()
  mean: string;

  @Expose({
    name: 'earned_coin',
  })
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  earned_coin: number;
}
