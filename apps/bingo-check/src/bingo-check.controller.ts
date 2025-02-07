import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService, JwtAuthGuard } from '@app/common';
import { BingoCheckService } from './bingo-check.service';
import { log } from 'console';

@Controller()
export class BingoCheckController {
  private readonly logger = new Logger(BingoCheckController.name);
  
  constructor(
    private readonly bingoCheckService: BingoCheckService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('case_checked')
  // @UseGuards(JwtAuthGuard)
  async handleCaseChecked(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log('Case checked event received');
    const { userId, message, bingo, rowIndex, colIndex } = data;
    this.logger.log(message);

    const rowHasBingo = this.checkRowForBingo(bingo.grid, rowIndex);
    const colHasBingo = this.checkColumnForBingo(bingo.grid, colIndex);
    
    if (rowHasBingo || colHasBingo) {
      this.logger.log(`Bingo achieved for user ${userId}!`);
      const notificationMessage = `Congratulations! You have a Bingo!`;
    }

    this.rmqService.ack(context);
  }

  private checkRowForBingo(grid: any[][], rowIndex: number): boolean {
    return grid[rowIndex].every(cell => cell.isValid === true); 
  }

  private checkColumnForBingo(grid: any[][], colIndex: number): boolean {
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][colIndex].isValid !== true) {
        return false; 
      }
    }
    return true; 
  }
}
