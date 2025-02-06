import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { BingoCheckModule } from './bingo-check.module';

async function bootstrap() {
  const app = await NestFactory.create(BingoCheckModule);
  app.enableCors({
    origin: 'http://localhost:4200',  // URL frontend (Angular)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Methods allowed
    credentials: true,  // Allow cookies
  });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BINGO_CHECK'));
  await app.startAllMicroservices();
}
bootstrap();
