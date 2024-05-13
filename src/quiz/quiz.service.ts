import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IQuizService } from './interface/quiz.service.interface';
import { GetRandomRequestDto } from './dto/request/getRand.request.dto';
import { PostRandomRequestDto } from './dto/request/postRand.request.dto';
import { GetRandomResponseDto } from './dto/response/getRand.response.dto';
import { PostRandomResponseDto } from './dto/response/postRand.response.dto';

@Injectable()
export class QuizService implements IQuizService {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private prisma: PrismaService,
  ) {
    this.logger = logger;
    this.prisma = prisma;
  }
  getRand = async (
    request: GetRandomRequestDto,
  ): Promise<GetRandomResponseDto> => {
    return;
  };
  postRand = async (
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto> => {
    return;
  };
}
