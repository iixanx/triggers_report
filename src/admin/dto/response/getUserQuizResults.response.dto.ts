import { Expose } from 'class-transformer';
import {
  IsAlpha,
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  NotEquals,
} from 'class-validator';

export class GetUserQuizResultsResponseDto {
  @IsArray()
  @IsOptional()
  @Length(0, 10)
  quizzes: UserQuizResult[];
}

export class UserQuizResult {
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

  @Expose({
    name: 'has_correct',
  })
  @IsBoolean()
  has_correct: boolean;

  @Expose({
    name: 'earned_coin',
  })
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  @Max(13)
  earned_coin: number;

  @Expose({
    name: 'created_at'
  })
  @IsDate()
  created_at: Date;
}
