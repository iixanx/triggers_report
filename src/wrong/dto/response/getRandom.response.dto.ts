import { Mean } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsAlpha, IsArray, IsNumber, IsString, Min, NotEquals } from 'class-validator';

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
  @IsAlpha()
  word: string;

  @Expose({
    name: 'means'
  })
  @IsArray()
  means: Mean[];
}
