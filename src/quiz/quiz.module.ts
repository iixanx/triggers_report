import { Logger, Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [QuizController],
  providers: [QuizService, Logger, PrismaService, JwtService],
})
export class QuizModule {}
