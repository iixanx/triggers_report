import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { WinstonInstance } from './util/winstonLgger.util';

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
  ],
})
export class AppModule {}
