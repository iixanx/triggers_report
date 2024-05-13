import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { IQuizController } from './interface/quiz.controller.interface';
import { GetRandomRequestDto } from './dto/request/getRand.request.dto';
import { PostRandomRequestDto } from './dto/request/postRand.request.dto';
import { GetRandomResponseDto } from './dto/response/getRand.response.dto';
import { PostRandomResponseDto } from './dto/response/postRand.response.dto';
import { QuizService } from './quiz.service';
import { AuthGuard } from 'src/util/auth.guard';

@UseGuards(AuthGuard)
@Controller('quiz')
export class QuizController implements IQuizController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private service: QuizService,
  ) {
    this.logger = logger;
    this.service = service;
  }

  @Get('rand')
  async getRand(
    @Body() request: GetRandomRequestDto,
  ): Promise<GetRandomResponseDto> {
    this.logger.log('GET /quiz/rand');
    const data = await this.service.getRand(request);

    return data;
  }

  async postRand(
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto> {
    throw new Error('Method not implemented.');
  }
}
