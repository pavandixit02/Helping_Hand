import { Server, Socket } from 'socket.io';

export const setupWebRTCSignaling = (io: Server) => {
  const rtcNamespace = io.of('/webrtc');

  rtcNamespace.on('connection', (socket: Socket) => {
    console.log(`[WebRTC] Peer connected: ${socket.id}`);

    socket.on('join_call', (callId: string) => {
      socket.join(callId);
      console.log(`[WebRTC] Socket ${socket.id} joined call ${callId}`);
      // Notify others in the call that a new peer joined
      socket.to(callId).emit('peer_joined', { peerId: socket.id });
    });

    // Relay Offer (SDP)
    socket.on('offer', (data: { callId: string; offer: any }) => {
      socket.to(data.callId).emit('offer_received', {
        peerId: socket.id,
        offer: data.offer
      });
    });

    // Relay Answer (SDP)
    socket.on('answer', (data: { callId: string; answer: any }) => {
      socket.to(data.callId).emit('answer_received', {
        peerId: socket.id,
        answer: data.answer
      });
    });

    // Relay ICE Candidates
    socket.on('ice_candidate', (data: { callId: string; candidate: any }) => {
      socket.to(data.callId).emit('ice_candidate_received', {
        peerId: socket.id,
        candidate: data.candidate
      });
    });

    socket.on('disconnect', () => {
      console.log(`[WebRTC] Peer disconnected: ${socket.id}`);
    });
  });
};
