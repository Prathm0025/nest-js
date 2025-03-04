import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class SocketGateway {
  private logger = new Logger('SocketGateway');

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): string {
    this.logger.log(`Received message: ${message}`);
    return `Server received: ${message}`;
  }
}
