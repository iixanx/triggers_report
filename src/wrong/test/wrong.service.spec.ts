import { Test, TestingModule } from '@nestjs/testing';
import { WrongService } from '../wrong.service';

describe('WrongService', () => {
  let service: WrongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WrongService],
    }).compile();

    service = module.get<WrongService>(WrongService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
