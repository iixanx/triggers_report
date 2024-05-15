import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from './interface/auth.service.interface';
import { SignUpRequestDto } from './dto/request/signup.request.dto';
import { SignUpResponseDto } from './dto/response/signup.response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { SignInResponseDto } from './dto/response/siginin.response.dto';
import { SignInRequestDto } from './dto/request/signin.request.dto';
import { UnsubRequestDto } from './dto/request/unsub.request.dto';
import { UnsubResponseDto } from './dto/response/unsub.response.dto';
import { RefreshRequestDto } from './dto/request/refresh.request.dto';
import { RefreshResponseDto } from './dto/response/refresh.response.dto';
import { TokenRequestDto } from '../dto/request/token.request.dto';
import { AuthUtil } from './util/auth.util';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Logger) private logger: Logger,
    private prisma: PrismaService,
    private util: AuthUtil,
  ) {
    this.logger = logger;
    this.prisma = prisma;
    this.util = util;
  }

  signup = async (request: SignUpRequestDto): Promise<SignUpResponseDto> => {
    const { name, email, password, isAdmin } = request;

    const isExistEmail = await this.prisma.findUserByEmail(email);
    if (isExistEmail) throw new ConflictException('Email is already exist');

    const hashPassword = await hash(
      password,
      Number(process.env.SALT_OR_ROUND),
    );

    try {
      const thisUser = await this.prisma.createUser(
        name,
        email,
        hashPassword,
        isAdmin,
      );
      return { userId: thisUser.user_id };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('데이터베이스 트랜잭션 오류');
    }
  };

  signin = async (request: SignInRequestDto): Promise<SignInResponseDto> => {
    const { email, password } = request;

    const isExistEmail = await this.prisma.findUserByEmail(email);
    if (!isExistEmail)
      throw new NotFoundException('존재하지 않는 이메일의 계정');

    const thisUser = await this.prisma.findUserById(isExistEmail.user_id);

    if (!(await compare(password, thisUser.password)))
      throw new BadRequestException('비밀번호가 일치하지 않음');

    const accessToken = await this.util.genAccessToken(thisUser.user_id);
    const refreshToken = await this.util.genRefreshToken(thisUser.user_id);

    return {
      accessToken,
      refreshToken,
    };
  };

  unsub = async (request: UnsubRequestDto): Promise<UnsubResponseDto> => {
    const { password, user, isRefresh } = request;

    if (isRefresh)
      throw new UnauthorizedException('리프레시 토큰 사용 불가한 API');

    if (!(await compare(password, user.password)))
      throw new ForbiddenException('비밀번호가 일치하지 않음');

    try {
      await this.prisma.deleteUserById(user.user_id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('데이터베이스 트랜잭션 오류');
    }

    return {};
  };

  refresh = async (
    header: TokenRequestDto,
    request: RefreshRequestDto,
  ): Promise<RefreshResponseDto> => {
    const { authorization } = header;
    const { user, isRefresh } = request;

    if (!isRefresh)
      throw new UnauthorizedException('액세스 토큰 사용 불가한 API');

    const newAccessToken = await this.util.genAccessToken(user.user_id);

    return {
      accessToken: newAccessToken,
      refreshToken: authorization.split(' ')[1],
    };
  };
}
