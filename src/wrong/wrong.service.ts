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
    return;
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
