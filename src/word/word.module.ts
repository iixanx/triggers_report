import { Logger, Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [WordService, Logger, PrismaService, JwtService],
  controllers: [WordController]
})
export class WordModule {}
