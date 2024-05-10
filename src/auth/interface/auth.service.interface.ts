import { SignUpRequestDto } from '../dto/request/signup.request.dto';
import { SignUpResponseDto } from '../dto/response/signup.response.dto';

export interface IAuthService {
  signup: (request: SignUpRequestDto) => Promise<SignUpResponseDto>;
  signin: () => Promise<null>;
  unsub: () => Promise<null>;
}
