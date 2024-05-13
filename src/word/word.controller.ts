import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IWordController } from './interface/word.controller.interface';
import { DeleteWordRequestDto } from './dto/request/deleteWord.request.dto';
import {
  GetListQueryRequestDto,
  GetListRequestDto,
} from './dto/request/getList.request.dto';
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
import { AuthGuard } from 'src/util/auth.guard';
import { WordService } from './word.service';

@UseGuards(AuthGuard)
@Controller('word')
export class WordController implements IWordController {
  constructor(
    private service: WordService,
    @Inject(Logger) private readonly logger: Logger,
  ) {
    this.service = service;
    this.logger = logger;
  }

  @Post('new')
  async newWord(
    @Body() request: NewWordRequestDto,
  ): Promise<NewWordResponseDto> {
    this.logger.log('/new');
    const data = await this.service.newWord(request);

    return data;
  }

  @Get('list')
  async getList(
    @Query() query: GetListQueryRequestDto,
    @Body() request: GetListRequestDto,
  ): Promise<GetListResponseDto> {
    this.logger.log('/list');
    const data = await this.service.getList(query, request);

    return data;
  }

  @Get('rand')
  async getRand(
    @Body() request: GetRandomRequestDto,
  ): Promise<GetRandomResponseDto> {
    this.logger.log('/rand');
    const data = await this.service.getRand(request);

    return data;
  }
  async getWord(request: GetWordRequestDto): Promise<GetWordResponseDto> {
    throw new Error('Method not implemented.');
  }
  async updateWord(
    request: UpdateWordRequestDto,
  ): Promise<UpdateWordResponseDto> {
    throw new Error('Method not implemented.');
  }
  async deleteWord(
    request: DeleteWordRequestDto,
  ): Promise<DeleteWordResponseDto> {
    throw new Error('Method not implemented.');
  }
}
