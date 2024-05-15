import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthUtil } from '../util/auth.util';
import { ConflictException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Context,
  createMockContext,
  MockContext,
} from '../../util/mock.context';
import { SignUpRequestDto } from '../dto/request/signup.request.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let mockPrismaCtx: MockContext;
  let ctx: Context;
  let jwt: JwtService;
  let util: AuthUtil;

  beforeEach(async () => {
    mockPrismaCtx = createMockContext();
    ctx = mockPrismaCtx as unknown as Context;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: () => ({
            secret: 'JWT_SECRET',
            signOptions: {
              expiresIn: '30m',
            },
            verifyOptions: {
              complete: false,
            },
          }),
        }),
      ],
      providers: [
        AuthService,
        Logger,
        PrismaService,
        AuthUtil,
        JwtService,
        ConfigService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaCtx.prisma)
      .compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
    util = module.get<AuthUtil>(AuthUtil);

    util.genAccessToken = jest
      .fn()
      .mockReturnValue(
        'eyhbGciOiJIUzI1NiII6IkpXVCJ9.ZmFsc2UsImlhdCI6MTcxNTY0OTk5NH0.gYxlwNahB3W7vSLxtu-O71LHUH-Xa_dH1p9g8s',
      );
    util.genRefreshToken = jest
      .fn()
      .mockReturnValue(
        'eyhbGciOiJIUzI1NiII6IkpXVCJ9.dHJ1ZSwiaWF0IjoxNzE1NjQ5MzMzLCJleHAiOjE3MTY4NTg5MzN9.8LDohPqSsRkwhYxXxbl8sLAVlLl1X4VOU',
      );
  });

  describe('POST /auth/signup', () => {
    it('201 Created', async () => {
      const request = {
        name: 'asdf',
        email: 'asdf@asdf.com',
        password: 'ahiwelknl',
        isAdmin: false,
      };

      const user = {
        user_id: 1,
        name: 'asdf',
        email: 'asdf@asdf.com',
        password: 'ahiwelknl',
        is_admin: false,
        coin: 0,
      };

      mockPrismaCtx.prisma.user.create.mockResolvedValueOnce(user);
      jest
        .spyOn(prisma, 'createUser')
        .mockImplementationOnce(async (name, email, password, is_admin) => {
          return await mockPrismaCtx.prisma.user.create({
            data: {
              name,
              email,
              password,
              is_admin,
            },
          });
        });

      await expect(service.signup(request)).resolves.toStrictEqual({
        userId: 1,
      });
    });

    it('409 conflict', async () => {
      const request = {
        name: 'asdf',
        email: 'asdf@asdf.com',
        password: 'ahiwelknl',
        isAdmin: false,
      };

      const user = {
        user_id: 1,
        name: 'asdf',
        email: 'asdf@asdf.com',
        password: 'ahiwelknl',
        is_admin: false,
        coin: 0,
      };

      mockPrismaCtx.prisma.user.findUnique.mockResolvedValueOnce(user);
      jest
        .spyOn(prisma, 'findUserByEmail')
        .mockImplementationOnce(async (email: string) => {
          return await mockPrismaCtx.prisma.user.findUnique({
            where: {
              email,
            },
          });
        });

      expect(async () => await service.signup(request)).rejects.toThrowError(
        new ConflictException('Email is already exist'),
      );
    });
  });

  // describe('POST /auth/signin', () => {});

  // describe('DELETE /auth/unsub', () => {});

  // describe('GET /auth/refresh', () => {});
});
