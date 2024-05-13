import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IWordService } from './interface/word.service.interface';
import { DeleteWordRequestDto } from './dto/request/deleteWord.request.dto';
import { GetListRequestDto } from './dto/request/getList.request.dto';
import { GetRandomRequestDto } from './dto/request/getRandom.request.dto';
import { GetWordRequestDto } from './dto/request/getWord.request.dto';
import { NewWordRequestDto } from './dto/request/newWord.request.dto';
import { UpdateWordRequestDto } from './dto/request/updateWord.request.dto';
import { DeleteWordResponseDto } from './dto/response/deleteWord.response.dto';
import { GetListResponseDto } from './dto/response/getList.response.dto';
import { GetRandomResponseDto } from './dto/response/getRandom.response.dto';
import { GetWordResponseDto } from './dto/response/getWord.response.dto';
import { NewWordResponseDto } from './dto/response/newWord.response.dto';
import { UpdateWordResponseDto } from './dto/response/updateWord.response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
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
  getList = async (request: GetListRequestDto): Promise<GetListResponseDto> => {
    return;
  };
  getRand = async (
    request: GetRandomRequestDto,
  ): Promise<GetRandomResponseDto> => {
    return;
  };
  getWord = async (request: GetWordRequestDto): Promise<GetWordResponseDto> => {
    return;
  };
  updateWord = async (
    request: UpdateWordRequestDto,
  ): Promise<UpdateWordResponseDto> => {
    return;
  };
  deleteWord = async (
    request: DeleteWordRequestDto,
  ): Promise<DeleteWordResponseDto> => {
    return;
  };
}
