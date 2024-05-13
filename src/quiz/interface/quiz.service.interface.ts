import { GetRandomRequestDto } from '../dto/request/getRand.request.dto';
import { PostRandomRequestDto } from '../dto/request/postRand.request.dto';
import { GetRandomResponseDto } from '../dto/response/getRand.response.dto';
import { PostRandomResponseDto } from '../dto/response/postRand.response.dto';

export interface IQuizService {
  getRand: (request: GetRandomRequestDto) => Promise<GetRandomResponseDto>;
  postRand: (request: PostRandomRequestDto) => Promise<PostRandomResponseDto>;
}
