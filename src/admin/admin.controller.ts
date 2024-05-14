import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IAdminController } from './interface/admin.controller.interface';
import { AdminService } from './admin.service';
import {
  GetUserQuizResultsQueryRequestDto,
  GetUserQuizResultsRequestDto,
} from './dto/request/getUserQuizResults.request.dto';
import { GetUsersQueryRequestDto } from './dto/request/getUsers.request.dto';
import {
  GetUserWordsQueryRequestDto,
  GetUserWordsRequestDto,
} from './dto/request/getUserWords.request.dto';
import { GetUserQuizResultsResponseDto } from './dto/response/getUserQuizResults.response.dto';
import { GetUsersResponseDto } from './dto/response/getUsers.response.dto';
import { GetUserWordsResponseDto } from './dto/response/getUserWords.response.dto';
import { AuthGuard } from 'src/util/auth.guard';
import { AdminGuard } from 'src/util/admin.guard';

@UseGuards(AuthGuard, AdminGuard)
@Controller('admin')
export class AdminController implements IAdminController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private service: AdminService,
  ) {
    this.logger = logger;
    this.service = service;
  }

  @Get('/users')
  async getUsers(
    @Query() query: GetUsersQueryRequestDto,
  ): Promise<GetUsersResponseDto> {
    this.logger.log('GET /admin/users');
    const data = await this.service.getUsers(query);

    return data;
  }

  async getUserWords(
    query: GetUserWordsQueryRequestDto,
    request: GetUserWordsRequestDto,
  ): Promise<GetUserWordsResponseDto> {
    this.logger.log('GET /admin/words');
    const data = await this.service.getUserWords(query, request);

    return data;
  }

  async getUserQuizResults(
    query: GetUserQuizResultsQueryRequestDto,
    request: GetUserQuizResultsRequestDto,
  ): Promise<GetUserQuizResultsResponseDto> {
    this.logger.log('GET /admin/results');
    const data = await this.service.getUserQuizResults(query, request);

    return data;
  }
}
