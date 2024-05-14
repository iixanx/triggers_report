import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAdminService } from './interface/admin.service.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetUserQuizResultsQueryRequestDto,
  GetUserQuizResultsRequestDto,
} from './dto/request/getUserQuizResults.request.dto';
import { GetUsersQueryRequestDto } from './dto/request/getUsers.request.dto';
import {
  GetUserWordsQueryRequestDto,
  GetUserWordsRequestDto,
} from './dto/request/getUserWords.request.dto';
import { GetUsersResponseDto } from './dto/response/getUsers.response.dto';
import { GetUserQuizResultsResponseDto } from './dto/response/getUserQuizResults.response.dto';
import { GetUserWordsResponseDto } from './dto/response/getUserWords.response.dto';

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private prisma: PrismaService,
  ) {
    this.logger = logger;
    this.prisma = prisma;
  }

  getUsers = async (
    query: GetUsersQueryRequestDto,
  ): Promise<GetUsersResponseDto> => {
    const { page } = query;

    const list = await this.prisma.findUserList(page);
    if (list.every((e) => !e))
      throw new NotFoundException('페이지에 해당하는 사용자 없음');

    return { users: list };
  };

  getUserWords = async (
    query: GetUserWordsQueryRequestDto,
    request: GetUserWordsRequestDto,
  ): Promise<GetUserWordsResponseDto> => {
    return;
  };

  getUserQuizResults = async (
    query: GetUserQuizResultsQueryRequestDto,
    request: GetUserQuizResultsRequestDto,
  ): Promise<GetUserQuizResultsResponseDto> => {
    return;
  };
}
