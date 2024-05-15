import { Expose } from 'class-transformer';
import { IsAlpha, IsNumber, IsString, Min, NotEquals } from 'class-validator';

export class GetListResponseDto {
  words: Promise<WordOfList>[];
}

export class WordOfList {
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
  @IsString()
  mean: string;
}
