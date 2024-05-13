import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IQuizService } from './interface/quiz.service.interface';
import { GetRandomRequestDto } from './dto/request/getRand.request.dto';
import {
  PostRandomQueryRequestDto,
  PostRandomRequestDto,
} from './dto/request/postRand.request.dto';
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
    query: PostRandomQueryRequestDto,
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto> => {
    const { wordId } = query;
    const { meanId, user } = request;

    let isCorrect: boolean = false;

    const thisMean = await this.prisma.findMeanById(meanId);
    const thisWord = await this.prisma.findWordById(wordId);

    if (!thisWord || !thisMean)
      throw new NotFoundException('단어장에 등록되지 않은 아이디');

    if (thisMean.mean_id === thisWord.mean.mean_id) isCorrect = true;

    const earnedCoin = Math.floor(Math.random() * (13 - 7 + 1)) + 7;

    return {
      is_correct: isCorrect,
      word: thisWord.word.word,
      mean: thisMean.mean,
      earned_coin: earnedCoin,
    };
  };
}
