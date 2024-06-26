import { JwtService } from '@nestjs/jwt';
import { IAuthUtil } from '../interface/auth.util.interface';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export class AuthUtil implements IAuthUtil {
  constructor(
    @Inject(JwtService) private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async genAccessToken(userId: Number) {
    const accessToken = await this.jwt.signAsync(
      { 
        userId,
        isRefresh: false
      },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        privateKey: this.config.get<string>('JWT_PRIVATE_KEY'),
      },
    );

    return accessToken;
  }
  async genRefreshToken(userId: number) {
    const refreshToken = await this.jwt.signAsync(
      { 
        userId,
        isRefresh: true },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        privateKey: this.config.get<string>('JWT_PRIVATE_KEY'),
        expiresIn: '14d',
      },
    );
    return refreshToken;
  }
}
