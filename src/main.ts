import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Database connection
  try {
    await connect(process.env.MONGODB_URI);
    Logger.log('Database connected', 'Database');
  } catch (error) {
    Logger.error('Database connection failed', error, 'Database');
  }

  // WebSocket connection
  app.useWebSocketAdapter(new IoAdapter(app));
  Logger.log('WebSocket server running', 'WebSocket');

  await app.listen(3000);
  Logger.log('Application is running on: http://localhost:3000', 'Bootstrap');
}
bootstrap();
