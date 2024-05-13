import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsNumberString, NotEquals } from 'class-validator';

export class GetWordRequestDto {
  @Expose({
    name: "word_id"
  })
  @Transform(e => Number(e.value))
  @IsNumber()
  @NotEquals(NaN)
  wordId: number;
}
