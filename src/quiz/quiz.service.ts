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
    const { user } = request;

    const maxId = await this.prisma.findMaxIdFromWord(user.user_id);
    const rand = Math.floor(Math.random() * maxId) + 1;

    const randWord = await this.prisma.findRandWordByCount(user.user_id, rand);
    const anotherMeans = await this.prisma.findRandMeanList();
    anotherMeans.push(randWord.mean);

    return {
      word_id: randWord.word.word_id,
      word: randWord.word.word,
      means: anotherMeans,
    };
  };
  postRand = async (
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto> => {
    return;
  };
}
