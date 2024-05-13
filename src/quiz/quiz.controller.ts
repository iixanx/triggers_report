import { Controller, Inject, Logger } from '@nestjs/common';
import { IQuizController } from './interface/quiz.controller.interface';
import { GetRandomRequestDto } from './dto/request/getRand.request.dto';
import { PostRandomRequestDto } from './dto/request/postRand.request.dto';
import { GetRandomResponseDto } from './dto/response/getRand.response.dto';
import { PostRandomResponseDto } from './dto/response/postRand.response.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController implements IQuizController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private service: QuizService,
  ) {
    this.logger = logger;
    this.service = service;
  }

  async getRand(request: GetRandomRequestDto): Promise<GetRandomResponseDto> {
    throw new Error('Method not implemented.');
  }

  async postRand(
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto> {
    throw new Error('Method not implemented.');
  }
}
