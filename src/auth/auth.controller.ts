import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private service: AuthService,
    @Inject(Logger) private readonly logger: Logger,
  ){
    this.service = service
    this.logger = logger
  }

  @Get("/")
  async getHello() {
    const data = await this.service.getHello();

    return data;
  }
}
