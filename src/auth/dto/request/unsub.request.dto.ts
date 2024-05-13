import { User } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UnsubRequestDto {
  @Expose({
    name: 'password',
  })
  @IsString()
  password: string;

  isRefresh: boolean;

  user: User;
}
