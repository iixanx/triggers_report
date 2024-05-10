import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, Logger, PrismaService, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
