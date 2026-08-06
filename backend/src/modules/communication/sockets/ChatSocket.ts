import { Server, Socket } from 'socket.io';
import { MessageEncryption } from '../security/MessageEncryption';
import { MessageQueue } from '../services/MessageQueue';

export const setupChatSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`[Chat] User connected: ${socket.id}`);

    // Join a specific consultation room
    socket.on('join_room', (roomId: string) => {
      socket.join(roomId);
      console.log(`[Chat] Socket ${socket.id} joined room ${roomId}`);
    });

    // Handle incoming messages
    socket.on('send_message', async (data: { roomId: string; senderId: string; content: string }) => {
      console.log(`[Chat] Message received in room ${data.roomId}`);
      
      // 1. Encrypt payload
      const encryptedContent = MessageEncryption.encrypt(data.content);
      
      // 2. Queue for DB insertion (prevent blocking)
      MessageQueue.enqueue({
        roomId: data.roomId,
        senderId: data.senderId,
        encryptedContent,
        timestamp: new Date()
      });

      // 3. Broadcast to others in the room
      socket.to(data.roomId).emit('receive_message', {
        senderId: data.senderId,
        content: data.content, // Broadcast plain text to active socket (SSL protected)
        timestamp: new Date()
      });
    });

    // Typing indicators
    socket.on('typing', (data: { roomId: string; isTyping: boolean }) => {
      socket.to(data.roomId).emit('typing_status', data);
    });

    // Read receipts
    socket.on('mark_read', (data: { roomId: string; messageId: string }) => {
      socket.to(data.roomId).emit('message_read', data);
    });

    socket.on('disconnect', () => {
      console.log(`[Chat] User disconnected: ${socket.id}`);
    });
  });
};
