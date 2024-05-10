import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async findUserById(userId: number) {
    return await this.user.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        name: true,
        email: true,
        is_admin: true,
        coin: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await this.user.findUnique({
      where: { email },
      select: {
        user_id: true,
        name: true,
        email: true,
        is_admin: true,
        coin: true,
      },
    });
  }

  async createUser(name, email, password, isAdmin) {
    await this.user.create({
      data: {
        name,
        email,
        password,
        is_admin: isAdmin,
      },
    });

    return await this.findUserByEmail(email);
  }
}
