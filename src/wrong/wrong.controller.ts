import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IWrongController } from './interface/wrong.controller.interface';
import { WrongService } from './wrong.service';
import {
  GetListQueryRequestDto,
  GetListRequestDto,
} from './dto/request/getList.request.dto';
import { GetRandomRequestDto } from './dto/request/getRandom.request.dto';
import {
  GetWordParamRequestDto,
  GetWordRequestDto,
} from './dto/request/getWord.request.dto';
import { PostRandomRequestDto } from './dto/request/postRandom.request.dto';
import { GetListResponseDto } from './dto/response/getList.response.dto';
import { GetRandomResponseDto } from './dto/response/getRandom.response.dto';
import { GetWordResponseDto } from './dto/response/getWord.response.dto';
import { PostRandomResponseDto } from './dto/response/postRandom.response.dto';
import { AuthGuard } from 'src/util/auth.guard';

@UseGuards(AuthGuard)
@Controller('wrong')
export class WrongController implements IWrongController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private service: WrongService,
  ) {
    this.logger = logger;
    this.service = service;
  }

  @Get('rand')
  async getRand(
    @Body() request: GetRandomRequestDto,
  ): Promise<GetRandomResponseDto> {
    this.logger.log('GET /wrong/rand');
    const data = await this.service.getRand(request);

    return data;
  }

  @Get('list')
  async getList(
    @Query() query: GetListQueryRequestDto,
    @Body() request: GetListRequestDto,
  ): Promise<GetListResponseDto> {
    this.logger.log('GET /wrong/list');
    const data = await this.service.getList(query, request);

    return data;
  }

  @Get(':word_id')
  async getWord(
    @Param() param: GetWordParamRequestDto,
    @Body() request: GetWordRequestDto,
  ): Promise<GetWordResponseDto> {
    this.logger.log('GET /wrong/:word_id');
    const data = await this.service.getWord(param, request);

    return data;
  }

  async postRand(
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto> {
    throw new Error('Method not implemented.');
  }
}
