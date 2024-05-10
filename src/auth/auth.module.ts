import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthUtil } from './util/auth.util';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: "30m",
        },
        verifyOptions: {
          complete: false,
        },
      }),
    }),
  ],
  providers: [AuthService, Logger, PrismaService, AuthUtil, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
