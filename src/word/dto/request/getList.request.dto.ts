import { User } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsNumberString } from 'class-validator';

export class GetListQueryRequestDto {
  @Expose()
  @IsNumberString()
  page: string;
}

export class GetListRequestDto {
  user: User;
}
