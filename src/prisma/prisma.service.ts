import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mean, Prisma, PrismaClient, Word } from '@prisma/client';

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
        password: true,
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

  async createUser(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
  ) {
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

  async deleteUserById(id: number) {
    await this.user.delete({
      where: {
        user_id: id,
      },
    });
  }

  async findWordById(wordId: number) {
    const word = await this.word.findUnique({
      where: {
        word_id: wordId,
      },
    });

    if (!word) throw new NotFoundException('존재하지 않는 아이디의 단어');

    const mean = await this.mean.findUnique({
      where: {
        word_id: word.word_id,
      },
    });

    return {
      word,
      mean,
    };
  }

  async findRandWordByCount(userId: number, skip: number) {
    const word = await this.word.findFirst({
      where: {
        user_id: userId,
      },
      skip: skip - 1,
    });

    const mean = await this.mean.findUnique({
      where: {
        word_id: word.word_id,
      },
    });

    return {
      word,
      mean,
    };
  }

  async findWordList(userId: number, page: number) {
    return await this.word.findMany({
      where: {
        user_id: userId,
      },
      take: 10,
      skip: page * 10,
    });
  }

  async findRandMeanList() {
    const max = await this.mean.count();
    let meanList: Mean[] = [];

    for (let i = 0; i < 3; i++) {
      const rand = Math.floor(Math.random() * max) + 1;
      const mean = await this.mean.findFirst({
        skip: rand - 1,
      });
      meanList.push(mean);
    }

    return meanList;
  }

  async findWordByUserIdAndWord(userId: number, word: string) {
    return await this.word.findFirst({
      where: {
        user_id: userId,
        word,
      },
      select: {
        word_id: true,
        user_id: true,
        word: true,
        Mean: {
          select: {
            mean: true,
          },
        },
      },
    });
  }

  async findMaxIdFromWord(userId: number) {
    const counts = await this.word.count({
      where: {
        user_id: userId,
      },
    });

    return counts;
  }

  async createWord(userId: number, word: string, mean: string) {
    let newWord: Word;
    await this.$transaction(
      async (tx) => {
        newWord = await tx.word.create({
          data: {
            user_id: userId,
            word,
          },
        });

        await tx.mean.create({
          data: {
            word_id: newWord.word_id,
            mean,
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      },
    );
    return newWord;
  }

  async updateWord(wordId: number, word: string, mean: string) {
    await this.$transaction([
      this.word.update({
        where: {
          word_id: wordId,
        },
        data: {
          word,
        },
      }),
      this.mean.update({
        where: {
          word_id: wordId,
        },
        data: {
          mean,
        },
      }),
    ]);
  }

  async deleteWordById(wordId: number) {
    await this.word.delete({
      where: {
        word_id: wordId,
      },
    });
  }

  async findMeanById(meanId: number) {
    return await this.mean.findUnique({
      where: {
        mean_id: meanId,
      },
    });
  }
}
