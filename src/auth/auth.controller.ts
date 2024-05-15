import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignUpRequestDto } from './dto/request/signup.request.dto';
import { IAuthController } from './interface/auth.controller.interface';
import { SignUpResponseDto } from './dto/response/signup.response.dto';
import { SignInRequestDto } from './dto/request/signin.request.dto';
import { UnsubRequestDto } from './dto/request/unsub.request.dto';
import { SignInResponseDto } from './dto/response/siginin.response.dto';
import { UnsubResponseDto } from './dto/response/unsub.response.dto';
import { RefreshRequestDto } from './dto/request/refresh.request.dto';
import { RefreshResponseDto } from './dto/response/refresh.response.dto';
import { TokenRequestDto } from 'src/dto/request/token.request.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/util/auth.guard';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    private service: AuthService,
    @Inject(Logger) private readonly logger: Logger,
  ) {
    this.service = service;
    this.logger = logger;
  }

  @Post('signup')
  async signup(@Body() request: SignUpRequestDto): Promise<SignUpResponseDto> {
    this.logger.log('/signup');
    const data = await this.service.signup(request);

    return data;
  }

  @HttpCode(200)
  @Post('signin')
  async signin(@Body() request: SignInRequestDto): Promise<SignInResponseDto> {
    this.logger.log('/signin');
    const data = await this.service.signin(request);

    return data;
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete('unsub')
  async unsub(
    @Headers() header: TokenRequestDto,
    @Body() request: UnsubRequestDto,
  ): Promise<UnsubResponseDto> {
    this.logger.log('/unsub');
    const data = await this.service.unsub(request);

    return data;
  }

  @UseGuards(AuthGuard)
  @Get('refresh')
  async refresh(
    @Headers() header: TokenRequestDto,
    @Body() request: RefreshRequestDto,
  ): Promise<RefreshResponseDto> {
    this.logger.log('/refresh');
    const data = await this.service.refresh(header, request);

    return data;
  }
}
