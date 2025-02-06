import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService, JwtAuthGuard } from '@app/common';
import { BingoCheckService } from './bingo-check.service';

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
    const { userId, message } = data;
    this.logger.log(message);

    await this.bingoCheckService.notifyUser(userId, message);

    this.rmqService.ack(context);
  }
}
