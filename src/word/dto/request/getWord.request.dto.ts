import { Expose } from 'class-transformer';
import { IsNumberString } from 'class-validator';

export class GetWordRequestDto {
  @Expose({
    name: 'word_id',
  })
  @IsNumberString()
  wordId: string;
}
