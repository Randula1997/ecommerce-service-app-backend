/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specified methods
    allowedHeaders: ['Content-Type'], // Allow only specified headers
  });
  const port = process.env.PORT
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
