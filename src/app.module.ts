import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { WinstonInstance } from './util/winstonLgger.util';
import { WordModule } from './word/word.module';
import { QuizModule } from './quiz/quiz.module';
import { WrongModule } from './wrong/wrong.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      instance: WinstonInstance,
    }),
    AuthModule,
    WordModule,
    QuizModule,
    WrongModule,
  ],
})
export class AppModule {}
