import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class TokenRequestDto {
  @Expose({
    name: 'Authorization',
  })
  @IsString()
  authorization: string;
}
