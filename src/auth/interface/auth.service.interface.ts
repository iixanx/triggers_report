import { RefreshRequestDto } from '../dto/request/refresh.request.dto';
import { SignInRequestDto } from '../dto/request/signin.request.dto';
import { SignUpRequestDto } from '../dto/request/signup.request.dto';
import { UnsubRequestDto } from '../dto/request/unsub.request.dto';
import { RefreshResponseDto } from '../dto/response/refresh.response.dto';
import { SignInResponseDto } from '../dto/response/siginin.response.dto';
import { SignUpResponseDto } from '../dto/response/signup.response.dto';
import { UnsubResponseDto } from '../dto/response/unsub.response.dto';

export interface IAuthService {
  signup: (request: SignUpRequestDto) => Promise<SignUpResponseDto>;
  signin: (request: SignInRequestDto) => Promise<SignInResponseDto>;
  unsub: (request: UnsubRequestDto) => Promise<UnsubResponseDto>;
  refresh: (request: RefreshRequestDto) => Promise<RefreshResponseDto>;
}
