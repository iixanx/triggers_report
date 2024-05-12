import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = await context.switchToHttp().getRequest();

    const token: string = req.headers['authorization'];

    if (!token) throw new UnauthorizedException('토큰 필요');
    if (!token.includes(' ')) throw new UnauthorizedException('토큰 형식 오류');

    const { userId } = await this.jwt.decode(token.split(' ')[1]);
    if (!userId) throw new UnauthorizedException('토큰 복호화 오류');

    let thisUser: User;

    try {
      thisUser = await this.prisma.findUserById(userId);
      if (!thisUser) throw new NotFoundException('존재하지 않는 유저');
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('데이터베이스 트랜잭션 오류');
    }

    req.body.user = thisUser;

    this.logger.log(`user id ${thisUser.user_id} access`);

    return true;
  }
}
