import { Test, TestingModule } from '@nestjs/testing';
import { BingoController } from './bingo.controller';
import { BingoService } from './bingo.service';

describe('BingoController', () => {
  let bingoController: BingoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BingoController],
      providers: [BingoService],
    }).compile();

    bingoController = app.get<BingoController>(BingoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bingoController.getHello()).toBe('Hello World!');
    });
  });
});
