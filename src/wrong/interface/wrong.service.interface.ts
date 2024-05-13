import {
  GetListQueryRequestDto,
  GetListRequestDto,
} from '../dto/request/getList.request.dto';
import { GetRandomRequestDto } from '../dto/request/getRandom.request.dto';
import {
  GetWordParamRequestDto,
  GetWordRequestDto,
} from '../dto/request/getWord.request.dto';
import { PostRandomRequestDto } from '../dto/request/postRandom.request.dto';
import { GetRandomResponseDto } from '../dto/response/getRandom.response.dto';
import { GetWordResponseDto } from '../dto/response/getWord.response.dto';
import { PostRandomResponseDto } from '../dto/response/postRandom.response.dto';

export interface IWrongService {
  getRand: (request: GetRandomRequestDto) => Promise<GetRandomResponseDto>;
  getList: (
    query: GetListQueryRequestDto,
    request: GetListRequestDto,
  ) => Promise<GetListRequestDto>;
  getWord: (
    param: GetWordParamRequestDto,
    request: GetWordRequestDto,
  ) => Promise<GetWordResponseDto>;
  postRand: (request: PostRandomRequestDto) => Promise<PostRandomResponseDto>;
}
