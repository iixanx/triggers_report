import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IWordService } from './interface/word.service.interface';
import {
  DeleteWordParamRequestDto,
  DeleteWordRequestDto,
} from './dto/request/deleteWord.request.dto';
import {
  GetListQueryRequestDto,
  GetListRequestDto,
} from './dto/request/getList.request.dto';
import { GetRandomRequestDto } from './dto/request/getRandom.request.dto';
import { GetWordRequestDto } from './dto/request/getWord.request.dto';
import { NewWordRequestDto } from './dto/request/newWord.request.dto';
import {
  UpdateWordParamRequestDto,
  UpdateWordRequestDto,
} from './dto/request/updateWord.request.dto';
import { DeleteWordResponseDto } from './dto/response/deleteWord.response.dto';
import {
  GetListResponseDto,
  WordOfList,
} from './dto/response/getList.response.dto';
import { GetRandomResponseDto } from './dto/response/getRandom.response.dto';
import { GetWordResponseDto } from './dto/response/getWord.response.dto';
import { NewWordResponseDto } from './dto/response/newWord.response.dto';
import { UpdateWordResponseDto } from './dto/response/updateWord.response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { random } from 'src/util/random.util';
import { Word } from '@prisma/client';

@Injectable()
export class WordService implements IWordService {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private prisma: PrismaService,
  ) {
    this.logger = logger;
  }
  newWord = async (request: NewWordRequestDto): Promise<NewWordResponseDto> => {
    const { word, mean, user } = request;
    let newWord: Word;

    const isExistWord = await this.prisma.findWordByUserIdAndWord(
      user.user_id,
      word,
    );
    if (isExistWord) throw new ConflictException('중복 단어 추가 불가능');

    try {
      newWord = await this.prisma.createWord(user.user_id, word, mean);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('데이터베이스 트랜잭션 오류');
    }

    return {
      word_id: newWord.word_id,
    };
  };
  getList = async (
    query: GetListQueryRequestDto,
    request: GetListRequestDto,
  ): Promise<GetListResponseDto> => {
    const { page } = query;
    const { user } = request;

    let wordList: Promise<WordOfList>[];

    wordList = await this.prisma.findWordList(user.user_id, page);

    if (wordList.every((e) => null))
      throw new NotFoundException('해당 페이지에 단어 없음');

    return {
      words: wordList,
    };
  };

  getRand = async (
    request: GetRandomRequestDto,
  ): Promise<GetRandomResponseDto> => {
    const { user } = request;

    const count = await this.prisma.findMaxIdFromWord(user.user_id);

    const randId = random(1, count);
    const word = await this.prisma.findRandWordByCount(user.user_id, randId);

    return {
      word_id: word.word.word_id,
      word: word.word.word,
      mean: word.mean.mean,
    };
  };

  getWord = async (request: GetWordRequestDto): Promise<GetWordResponseDto> => {
    const { wordId } = request;

    const word = await this.prisma.findWordById(wordId);

    return {
      word_id: word.word.word_id,
      word: word.word.word,
      mean: word.mean.mean,
    };
  };

  updateWord = async (
    query: UpdateWordParamRequestDto,
    request: UpdateWordRequestDto,
  ): Promise<UpdateWordResponseDto> => {
    const { wordId } = query;
    const { user } = request;

    const thisWord = await this.prisma.findWordById(wordId);
    if (!thisWord || user.user_id !== thisWord.word.user_id)
      throw new NotFoundException('존재하지 않는 아이디의 단어');

    const word = request.word ?? thisWord.word.word;
    const mean = request.mean ?? thisWord.mean.mean;

    await this.prisma.updateWord(wordId, word, mean);

    return {
      word_id: wordId,
      word,
      mean,
    };
  };

  deleteWord = async (
    param: DeleteWordParamRequestDto,
    request: DeleteWordRequestDto,
  ): Promise<DeleteWordResponseDto> => {
    const { wordId } = param;
    const { user } = request;

    const thisWord = await this.prisma.findWordById(wordId);
    if (!thisWord || user.user_id !== thisWord.word.user_id)
      throw new NotFoundException('존재하지 않는 아이디의 단어');

    try {
      await this.prisma.deleteWordById(wordId);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('데이터베이스 트랜잭션 오류');
    }

    return {};
  };
}
