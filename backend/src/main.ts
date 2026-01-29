import * as dotenv from 'dotenv'; // 1. Importe o dotenv
dotenv.config();                // 2. Carregue o .env ANTES de tudo

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');;
  console.log(`🚀 Server is running on: http://localhost:${port}`);
}
bootstrap();