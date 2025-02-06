import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule, AuthModule } from '@app/common';
import { BingoController } from './bingo.controller';
import { BingoService } from './bingo.service';
import { BingoRepository } from './bingo.repository';
import { Bingo, BingoSchema } from './schemas/bingo.schema';
import { BINGO_CHECK_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/bingo/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Bingo.name, schema: BingoSchema }]),
    RmqModule.register({
      name: BINGO_CHECK_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [BingoController],
  providers: [BingoService, BingoRepository],
  exports: [BingoService],
})
export class BingoModule {}
