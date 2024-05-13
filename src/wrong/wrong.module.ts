import { Logger, Module } from '@nestjs/common';
import { WrongController } from './wrong.controller';
import { WrongService } from './wrong.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [WrongController],
  providers: [WrongService, Logger, PrismaService, JwtService],
})
export class WrongModule {}
