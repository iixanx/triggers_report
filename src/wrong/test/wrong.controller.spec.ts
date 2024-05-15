import { Test, TestingModule } from '@nestjs/testing';
import { WrongController } from '../wrong.controller';

describe('WrongController', () => {
  let controller: WrongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WrongController],
    }).compile();

    controller = module.get<WrongController>(WrongController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
