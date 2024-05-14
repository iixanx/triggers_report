import { Expose } from 'class-transformer';
import { IsNumber, Min, NotEquals } from 'class-validator';

export class NewWordResponseDto {
  @Expose({
    name: 'word_id',
  })
  @IsNumber()
  @NotEquals(0)
  @Min(0)
  word_id: number;
}
