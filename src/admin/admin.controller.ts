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
import { GetUserQuizResultsQueryRequestDto } from './dto/request/getUserQuizResults.request.dto';
import { GetUsersQueryRequestDto } from './dto/request/getUsers.request.dto';
import { GetUserWordsQueryRequestDto } from './dto/request/getUserWords.request.dto';
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

  @Get('users')
  async getUsers(
    @Query() query: GetUsersQueryRequestDto,
  ): Promise<GetUsersResponseDto> {
    this.logger.log('GET /admin/users');
    const data = await this.service.getUsers(query);

    return data;
  }

  @Get('words')
  async getUserWords(
    @Query() query: GetUserWordsQueryRequestDto,
  ): Promise<GetUserWordsResponseDto> {
    this.logger.log('GET /admin/words');
    const data = await this.service.getUserWords(query);

    return data;
  }

  @Get('results')
  async getUserQuizResults(
    @Query() query: GetUserQuizResultsQueryRequestDto,
  ): Promise<GetUserQuizResultsResponseDto> {
    this.logger.log('GET /admin/results');
    const data = await this.service.getUserQuizResults(query);

    return data;
  }
}
