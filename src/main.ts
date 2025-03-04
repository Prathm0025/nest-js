import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Database connection simulation
  Logger.log('Database connected', 'Database');

  // WebSocket connection
  app.useWebSocketAdapter(new IoAdapter(app));
  Logger.log('WebSocket server running', 'WebSocket');

  await app.listen(3000);
  Logger.log('Application is running on: http://localhost:3000', 'Bootstrap');
}
bootstrap();
