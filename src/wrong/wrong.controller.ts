import { Controller, Inject, Logger } from '@nestjs/common';
import { IWrongController } from './interface/wrong.controller.interface';
import { WrongService } from './wrong.service';
import { GetListRequestDto } from './dto/request/getList.request.dto';
import { GetRandomRequestDto } from './dto/request/getRandom.request.dto';
import { GetWordRequestDto } from './dto/request/getWord.request.dto';
import { PostRandomRequestDto } from './dto/request/postRandom.request.dto';
import { GetListResponseDto } from './dto/response/getList.response.dto';
import { GetRandomResponseDto } from './dto/response/getRandom.response.dto';
import { GetWordResponseDto } from './dto/response/getWord.response.dto';
import { PostRandomResponseDto } from './dto/response/postRandom.response.dto';

@Controller('wrong')
export class WrongController implements IWrongController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private service: WrongService,
  ) {
    this.logger = logger;
    this.service = service;
  }

  getRand(request: GetRandomRequestDto): Promise<GetRandomResponseDto> {
    throw new Error('Method not implemented.');
  }

  getList(request: GetListRequestDto): Promise<GetListResponseDto> {
    throw new Error('Method not implemented.');
  }

  getWord(request: GetWordRequestDto): Promise<GetWordResponseDto> {
    throw new Error('Method not implemented.');
  }

  postRand(request: PostRandomRequestDto): Promise<PostRandomResponseDto> {
    throw new Error('Method not implemented.');
  }
}
