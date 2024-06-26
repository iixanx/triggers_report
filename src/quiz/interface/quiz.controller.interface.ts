import { GetRandomRequestDto } from '../dto/request/getRand.request.dto';
import {
  PostRandomQueryRequestDto,
  PostRandomRequestDto,
} from '../dto/request/postRand.request.dto';
import { GetRandomResponseDto } from '../dto/response/getRand.response.dto';
import { PostRandomResponseDto } from '../dto/response/postRand.response.dto';

export interface IQuizController {
  getRand(request: GetRandomRequestDto): Promise<GetRandomResponseDto>;
  postRand(
    query: PostRandomQueryRequestDto,
    request: PostRandomRequestDto,
  ): Promise<PostRandomResponseDto>;
}
