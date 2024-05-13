import { User } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsAlpha, IsString } from 'class-validator';

export class NewWordRequestDto {
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

  user: User;
}
