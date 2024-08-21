/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // const port = process.env.PORT || 8080;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
