import { Inject, Injectable, Logger } from '@nestjs/common';
import { IWrongService } from './interface/wrong.service.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetListRequestDto } from './dto/request/getList.request.dto';
import { GetRandomRequestDto } from './dto/request/getRandom.request.dto';
import { GetWordRequestDto } from './dto/request/getWord.request.dto';
import { PostRandomRequestDto } from './dto/request/postRandom.request.dto';
import { GetRandomResponseDto } from './dto/response/getRandom.response.dto';
import { GetWordResponseDto } from './dto/response/getWord.response.dto';
import { PostRandomResponseDto } from './dto/response/postRandom.response.dto';
import { random } from 'src/util/random.util';

@Injectable()
export class WrongService implements IWrongService {
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

    const maxId = await this.prisma.findMaxIdFromWrong(user.user_id);
    const rand = random(1, maxId);

    const randWord = await this.prisma.findRandWordFromWrong(
      user.user_id,
      rand,
    );
    const anotherMeans = await this.prisma.findRandMeanList();
    anotherMeans.push(randWord.mean);

    return {
      word_id: randWord.word.word_id,
      word: randWord.word.word,
      means: anotherMeans,
    };
  };
  getList = async (request: GetListRequestDto): Promise<GetListRequestDto> => {
    return;
  };
  getWord = async (request: GetWordRequestDto): Promise<GetWordResponseDto> => {
    return;
  };
  postRand = async (
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto> => {
    return;
  };
}
