import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { Logger } from 'winston';
import { AuthUtil } from 'src/auth/util/auth.util';

@Module({
  providers: [WordService, Logger, AuthUtil],
  controllers: [WordController]
})
export class WordModule {}
