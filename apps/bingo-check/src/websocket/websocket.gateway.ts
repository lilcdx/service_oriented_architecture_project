import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ cors: true })
export class WebsocketGateway {
    @WebSocketServer() server: Server;
    private connectedUsers = new Map<string, string>(); 

    @SubscribeMessage('connect_user')
    handleUserConnection(client: Socket, userId: string) {
        this.connectedUsers.set(userId, client.id);
        console.log(`User ${userId} connected with socket ${client.id}`);
    }

    sendMessage(userId: string, message: string) {
        const socketId = this.connectedUsers.get(userId);
        if (!socketId) {
            console.warn(`WebSocket client for user ${userId} not found.`);
            return;
        }
        this.server.to(socketId).emit('notification', message);
    }
}

  