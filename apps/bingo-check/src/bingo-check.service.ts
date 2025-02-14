import { Injectable, Logger } from '@nestjs/common';
// import { BingoWebSocketGateway} from './websocket/websocket.gateway';

@Injectable()
export class BingoCheckService {
  private readonly logger = new Logger(BingoCheckService.name);
  // constructor(private readonly websocketGateway: BingoWebSocketGateway) {}

  async notifyUser(userId: string, message: string) {
    this.logger.log(`Notifying user ${userId}: ${message}`);
    // this.websocketGateway.sendMessage(userId, message);
  }
}
