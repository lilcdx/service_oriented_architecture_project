import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { BingoModule } from './bingo.module';

async function bootstrap() {
  const app = await NestFactory.create(BingoModule);
  app.enableCors({
    origin: 'http://localhost:4200',  // URL frontend (Angular)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Methods allowed
    credentials: true,  // Allow cookies
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
