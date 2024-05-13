import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IWrongService } from './interface/wrong.service.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetListQueryRequestDto,
  GetListRequestDto,
} from './dto/request/getList.request.dto';
import { GetRandomRequestDto } from './dto/request/getRandom.request.dto';
import {
  GetWordParamRequestDto,
  GetWordRequestDto,
} from './dto/request/getWord.request.dto';
import {
  PostRandomParamRequestDto,
  PostRandomRequestDto,
} from './dto/request/postRandom.request.dto';
import { GetRandomResponseDto } from './dto/response/getRandom.response.dto';
import { GetWordResponseDto } from './dto/response/getWord.response.dto';
import { PostRandomResponseDto } from './dto/response/postRandom.response.dto';
import { random } from 'src/util/random.util';
import { GetListResponseDto } from './dto/response/getList.response.dto';

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

  getList = async (
    query: GetListQueryRequestDto,
    request: GetListRequestDto,
  ): Promise<GetListResponseDto> => {
    const { page } = query;
    const { user } = request;

    const list = await this.prisma.findWrongList(user.user_id, page);
    if (list.every((e) => e == null))
      throw new NotFoundException(
        '오답노트의 해당 페이지에 단어가 존재하지 않음',
      );

    return { words: list };
  };

  getWord = async (
    param: GetWordParamRequestDto,
    request: GetWordRequestDto,
  ): Promise<GetWordResponseDto> => {
    const { wordId } = param;
    const { user } = request;

    const thisWord = await this.prisma.findWrongById(user.user_id, wordId);
    if (!thisWord)
      throw new NotFoundException('오답노트에 존재하지 않는 아이디의 단어');

    return thisWord;
  };

  postRand = async (
    param: PostRandomParamRequestDto,
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto> => {
    const { wordId } = param;
    const { meanId, user } = request;

    const thisWord = await this.prisma.findWordById(wordId);
    const thisMean = await this.prisma.findMeanById(meanId);
    if (!thisWord || !thisMean)
      throw new NotFoundException('오답노트에 등록되지 않은 아이디');

    let earnedCoin = 0;
    let isCorrect = false;

    try {
      await this.prisma.$transaction(async (tx) => {
        if (thisMean.mean_id === thisWord.mean.mean_id) {
          isCorrect = true;
          earnedCoin = random(1, 7);
          await this.prisma.updateUserCoinByIdAndCoin(user.user_id, earnedCoin);
          await this.prisma.updateWordCorrectCount(thisWord.word.word_id);

          const { word } = await this.prisma.findWordById(wordId);
          if (word.correct_count >= word.wrong_count * 2)
            await this.prisma.deleteWrong(user.user_id, word.word_id);
        } else {
          await this.prisma.updateWordWrongCount(thisWord.word.word_id);
          await this.prisma.updateWordWrongCount(wordId);
        }
        await this.prisma.createHistory(
          user.user_id,
          wordId,
          meanId,
          isCorrect,
        );
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('데이터베이스 트랜잭션 오류');
    }

    return {
      is_correct: isCorrect,
      word: thisWord.word.word,
      mean: thisMean.mean,
      earned_coin: earnedCoin,
    };
  };
}
