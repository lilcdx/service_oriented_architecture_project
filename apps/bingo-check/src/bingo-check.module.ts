import { Module } from '@nestjs/common';
import { RmqModule, AuthModule } from '@app/common';
import * as Joi from 'joi';
import { BingoCheckController } from './bingo-check.controller';
import { BingoCheckService } from './bingo-check.service';
import { ConfigModule } from '@nestjs/config';
import { WebsocketGateway } from './websocket/websocket.gateway';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BINGO_CHECK_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    AuthModule,
  ],
  controllers: [BingoCheckController],
  providers: [BingoCheckService, WebsocketGateway],
})
export class BingoCheckModule {}
