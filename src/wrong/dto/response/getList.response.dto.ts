import { Expose } from 'class-transformer';
import {
  IsAlpha,
  IsArray,
  IsNumber,
  IsString,
  Min,
  NotEquals,
} from 'class-validator';

export class GetListResponseDto {
  @Expose({
    name: 'words',
  })
  @IsArray()
  words: Words[];
}

export class Words {
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
  @IsAlpha()
  word: string;

  @Expose({
    name: 'mean',
  })
  @IsString()
  mean: string;
}
