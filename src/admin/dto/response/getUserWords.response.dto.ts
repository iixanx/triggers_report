import { Expose } from 'class-transformer';
import { IsAlpha, IsArray, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class GetUserWordsResponseDto {
  @IsArray()
  @IsOptional()
  @Length(0, 10)
  words: UserWord[];
}

export class UserWord {
  @Expose({
    name: 'word_id',
  })
  @IsNumber()
  @Min(0)
  wordId: number;

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
