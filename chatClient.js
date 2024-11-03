const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// โหลด proto definition
const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, './src/proto/chat/chat.proto'),
  {}
);
const chatProto = grpc.loadPackageDefinition(packageDefinition).chat;

// เชื่อมต่อกับเซิร์ฟเวอร์ gRPC
const client = new chatProto.ChatService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// สร้างสตรีมสำหรับ ChatStream
const call = client.ChatStream();

call.on('data', (message) => {
  console.log('Received message:', message);
});

call.on('error', (error) => {
  console.error('Stream error:', error);
});

call.on('end', () => {
  console.log('Stream ended');
});

// ส่งข้อความ
function sendMessage(senderId, receiverId, content) {
  const timestamp = Date.now().toString();
  call.write({ senderId, receiverId, messageContent: content, timestamp });
}

// ทดสอบการส่งข้อความ
sendMessage('user1', 'user2', 'Hello from client');
