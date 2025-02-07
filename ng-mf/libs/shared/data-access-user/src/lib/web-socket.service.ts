// // src/app/services/web-socket.service.ts

// import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class WebSocketService {
//   private socket: Socket;

//   constructor() {
//     // Connect to the WebSocket server automatically
//     this.socket = io('http://localhost:3000'); // Change this URL to your WebSocket URL
//     console.log('WebSocket connection established');
//   }

//   // Register the user connection with their userId
//   connectUser(userId: string) {
//     this.socket.emit('connect_user', userId);  // Send userId to the server
//   }

//   // Listen for incoming messages from the server (notifications)
//   onMessage(): Observable<string> {
//     return new Observable((observer) => {
//       // Listen for "notification" events from the server
//       this.socket.on('notification', (message: string) => {
//         console.log('📩 WebSocket Message:', message);
//         observer.next(message);
//       });

//       // Clean up the listener when the observable is unsubscribed
//       return () => {
//         this.socket.off('notification');
//       };
//     });
//   }

//   // Send a message to the server (like a test or notification)
//   sendMessage(event: string, data: any) {
//     this.socket.emit(event, data);
//   }

//   // Optionally: Disconnect the WebSocket connection
//   disconnect() {
//     this.socket.disconnect();
//     console.log('WebSocket disconnected');
//   }
// }
