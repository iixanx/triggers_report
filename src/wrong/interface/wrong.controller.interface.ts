import {
  GetListQueryRequestDto,
  GetListRequestDto,
} from '../dto/request/getList.request.dto';
import { GetRandomRequestDto } from '../dto/request/getRandom.request.dto';
import {
  GetWordParamRequestDto,
  GetWordRequestDto,
} from '../dto/request/getWord.request.dto';
import {
  PostRandomParamRequestDto,
  PostRandomRequestDto,
} from '../dto/request/postRandom.request.dto';
import { GetListResponseDto } from '../dto/response/getList.response.dto';
import { GetRandomResponseDto } from '../dto/response/getRandom.response.dto';
import { GetWordResponseDto } from '../dto/response/getWord.response.dto';
import { PostRandomResponseDto } from '../dto/response/postRandom.response.dto';

export interface IWrongController {
  getRand(request: GetRandomRequestDto): Promise<GetRandomResponseDto>;
  getList(
    query: GetListQueryRequestDto,
    request: GetListRequestDto,
  ): Promise<GetListResponseDto>;
  getWord(
    param: GetWordParamRequestDto,
    request: GetWordRequestDto,
  ): Promise<GetWordResponseDto>;
  postRand(
    param: PostRandomParamRequestDto,
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto>;
}
