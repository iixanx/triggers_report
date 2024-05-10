import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './util/httpException.filter';
import { WinstonInstance } from './util/winstonLgger.util';
import { WinstonModule } from 'nest-winston';
import { CorsOptions } from './util/corsOptions.util';

async function bootstrap() {
  configDotenv();

  const app = await NestFactory.create(AppModule, {
    cors: CorsOptions,
    logger: WinstonModule.createLogger({
      instance: WinstonInstance,
    }),
  });

  const docs = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Triggers-Report')
      .setVersion('0.0.1')
      .setDescription(
        '(주)트리거스 입사 과제 진행을 위해 제작한 레포지토리입니다. \n' +
          '소스 코드 중 루트 경로의 triggers.erd.drawio에서 ERD를 확인할 수 있습니다.',
      )
      .addBearerAuth({
        type: 'http',
        in: 'header',
        scheme: 'Bearer',
        name: 'authorization',
      })
      .build(),
  );

  SwaggerModule.setup('docs', app, docs);

  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV === ('prod' || 'dev'),
    }),
  );

  app.listen(Number(process.env.PORT));
}
bootstrap();
