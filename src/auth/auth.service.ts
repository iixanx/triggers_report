import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@Inject(Logger) private logger: Logger) {
    this.logger = logger;
  }

  async getHello() {
    this.logger.log('Hello');

    return 'Hello';
  }
}
