import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket, // <-- added
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('new user connected', client.id);

    client.broadcast.emit('user-joined', {
      message: `new user joined the chat: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('user disconnected', client.id);

    this.server.emit('user-left', {
      message: `user left the chat: ${client.id}`,
    });
  }

  //   @SubscribeMessage('newMessage')
  //   handleNewMessage(client: Socket, message: any) {
  //     console.log(message);

  //     client.emit('reply', 'this is a reply from the server');

  //     this.server.emit('reply', 'broadcasting to all clients from the server');
  //   }

  @SubscribeMessage('newMessage')
  handleNewMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket, // <-- added
  ) {
    // this.server.emit('message', message); // broadcast to all clients

    this.server.emit('reply', { clientId: client.id, message }); // broadcast to all clients
  }
}

// socket.on

// io.emit - used to emit to all clients

// socket.emit - used to emit to a specific client or one single client
