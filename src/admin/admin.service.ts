import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAdminService } from './interface/admin.service.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetUserQuizResultsQueryRequestDto,
  GetUserQuizResultsRequestDto,
} from './dto/request/getUserQuizResults.request.dto';
import {
  GetUsersQueryRequestDto,
  GetUsersRequestDto,
} from './dto/request/getUsers.request.dto';
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
    private service: PrismaService,
  ) {
    this.logger = logger;
    this.service = service;
  }

  getUsers = async (
    query: GetUsersQueryRequestDto,
    request: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> => {
    return;
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
