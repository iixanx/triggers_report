import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class RefreshResponseDto {
  @Expose({
    name: 'access_token',
  })
  @IsString()
  accessToken: string;

  @Expose({
    name: 'refresh_token',
  })
  @IsString()
  refreshToken: string;
}
