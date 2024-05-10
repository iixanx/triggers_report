import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/request/signup.request.dto';
import { IAuthController } from './interface/auth.controller.interface';
import { SignUpResponseDto } from './dto/response/signup.response.dto';
import { SignInRequestDto } from './dto/request/signin.request.dto';
import { UnsubRequestDto } from './dto/request/unsub.request.dto';
import { SignInResponseDto } from './dto/response/siginin.response.dto';
import { UnsubResponseDto } from './dto/response/unsub.response.dto';

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
    const data = await this.service.signup(request);

    return data
  }

  signin(request: SignInRequestDto): Promise<SignInResponseDto> {
    throw new Error('Method not implemented.');
  }

  unsub(request: UnsubRequestDto): Promise<UnsubResponseDto> {
    throw new Error('Method not implemented.');
  }
}
