import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(3002, {})
export class ChatGateWay {
  @SubscribeMessage('newMessage')
  handleNewMessage(@MessageBody() message: any) {
    console.log(message);
  }
}
