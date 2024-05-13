import { DeleteWordRequestDto } from "../dto/request/deleteWord.request.dto";
import { GetListRequestDto } from "../dto/request/getList.request.dto";
import { GetRandomRequestDto } from "../dto/request/getRandom.request.dto";
import { GetWordRequestDto } from "../dto/request/getWord.request.dto";
import { NewWordRequestDto } from "../dto/request/newWord.request.dto";
import { UpdateWordRequestDto } from "../dto/request/updateWord.request.dto";
import { DeleteWordResponseDto } from "../dto/response/deleteWord.response.dto";
import { GetListResponseDto } from "../dto/response/getList.response.dto";
import { GetRandomResponseDto } from "../dto/response/getRandom.response.dto";
import { GetWordResponseDto } from "../dto/response/getWord.response.dto";
import { NewWordResponseDto } from "../dto/response/newWord.response.dto";
import { UpdateWordResponseDto } from "../dto/response/updateWord.response.dto";

export interface IWordController {
  newWord(request: NewWordRequestDto): Promise<NewWordResponseDto>;
  getList(query, request: GetListRequestDto): Promise<GetListResponseDto>;
  getRand(qeury, request: GetRandomRequestDto): Promise<GetRandomResponseDto>;
  getWord(request: GetWordRequestDto): Promise<GetWordResponseDto>;
  updateWord(request: UpdateWordRequestDto): Promise<UpdateWordResponseDto>;
  deleteWord(request: DeleteWordRequestDto): Promise<DeleteWordResponseDto>;
}