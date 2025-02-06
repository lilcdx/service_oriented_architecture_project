import { Test, TestingModule } from '@nestjs/testing';
import { BingoCheckController } from './bingo-check.controller';
import { BingoCheckService } from './bingo-check.service';

describe('BingoCheckController', () => {
  let bingoCheckController: BingoCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BingoCheckController],
      providers: [BingoCheckService],
    }).compile();

    bingoCheckController = app.get<BingoCheckController>(BingoCheckController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bingoCheckController.getHello()).toBe('Hello World!');
    });
  });
});
