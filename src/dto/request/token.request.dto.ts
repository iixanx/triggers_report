import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class TokenRequestDto {
  @Expose({
    name: 'authorization',
  })
  @IsString()
  token: string;
}
