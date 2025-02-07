// // src/websocket/websocket.gateway.ts

// import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway(3000, {
//   cors: {
//     origin: '*',  // Allow all origins for testing purposes (adjust this for production)
//     methods: ['GET', 'POST'],
//   },
// })
// export class BingoWebSocketGateway {
//   @WebSocketServer() server: Server;
//   private connectedUsers = new Map<string, string>();  // Store userId -> socketId mapping

//   @SubscribeMessage('connect_user')
//   handleUserConnection(client: Socket, userId: string) {
//     this.connectedUsers.set(userId, client.id);
//     console.log(`User ${userId} connected with socket ${client.id}`);
//   }

//   // Send notification to a specific user
//   sendMessage(userId: string, message: string) {
//     const socketId = this.connectedUsers.get(userId);
//     if (!socketId) {
//       console.warn(`WebSocket client for user ${userId} not found.`);
//       return;
//     }
//     this.server.to(socketId).emit('notification', message);
//   }
// }
