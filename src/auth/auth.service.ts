import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IAuthService } from './interface/auth.service.interface';
import { SignUpRequestDto } from './dto/request/signup.request.dto';
import { SignUpResponseDto } from './dto/response/signup.response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Logger) private logger: Logger,
    private prisma: PrismaService,
  ) {
    this.logger = logger;
    this.prisma = prisma;
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
  signin: () => Promise<null>;
  unsub: () => Promise<null>;
}
