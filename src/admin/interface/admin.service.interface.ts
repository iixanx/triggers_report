import {
  GetUserQuizResultsQueryRequestDto,
  GetUserQuizResultsRequestDto,
} from '../dto/request/getUserQuizResults.request.dto';
import { GetUsersQueryRequestDto } from '../dto/request/getUsers.request.dto';
import {
  GetUserWordsQueryRequestDto,
  GetUserWordsRequestDto,
} from '../dto/request/getUserWords.request.dto';
import { GetUserQuizResultsResponseDto } from '../dto/response/getUserQuizResults.response.dto';
import { GetUsersResponseDto } from '../dto/response/getUsers.response.dto';
import { GetUserWordsResponseDto } from '../dto/response/getUserWords.response.dto';

export interface IAdminService {
  getUsers: (query: GetUsersQueryRequestDto) => Promise<GetUsersResponseDto>;
  getUserWords: (
    query: GetUserWordsQueryRequestDto,
    request: GetUserWordsRequestDto,
  ) => Promise<GetUserWordsResponseDto>;
  getUserQuizResults: (
    query: GetUserQuizResultsQueryRequestDto,
    request: GetUserQuizResultsRequestDto,
  ) => Promise<GetUserQuizResultsResponseDto>;
}
