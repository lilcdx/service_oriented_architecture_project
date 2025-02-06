import { Injectable, Logger } from '@nestjs/common';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Injectable()
export class BingoCheckService {
  private readonly logger = new Logger(BingoCheckService.name);
  constructor(private readonly websocketGateway: WebsocketGateway) {}

  async notifyUser(userId: string, message: string) {
    this.logger.log(`Notifying user ${userId}: ${message}`);
    this.websocketGateway.sendMessage(userId, message);
  }
}
