import { Expose } from 'class-transformer';
import {
  IsAlpha,
  IsArray,
  IsNumber,
  IsString,
  Length,
  Min,
  NotEquals,
} from 'class-validator';

export class GetRandomResponseDto {
  @Expose({
    name: 'word_id',
  })
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  word_id: number;

  @Expose({
    name: 'word',
  })
  @IsString()
  @IsAlpha()
  word: string;

  @Expose({
    name: 'mean',
  })
  @IsArray()
  @Length(4, 4)
  means: RandomMean[];
}

export class RandomMean {
  @Expose({
    name: 'word_id',
  })
  @IsNumber()
  word_id: number;

  @Expose({
    name: 'mean_id',
  })
  @IsNumber()
  mean_id: number;

  @Expose({
    name: 'mean',
  })
  @IsString()
  mean: string;
}
