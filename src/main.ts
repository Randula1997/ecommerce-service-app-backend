/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow only specified methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specified headers
  });
  const port = process.env.PORT || 8080;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
