import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

async function main() {
  // โหลดโปรโตคอลที่กำหนดใน chat.proto
  const packageDefinition = await protoLoader.load(
    path.join(__dirname, 'path/to/chat.proto'),
  );
  const chatProto: any = grpc.loadPackageDefinition(packageDefinition).chat;

  // เชื่อมต่อกับเซิร์ฟเวอร์ gRPC
  const client = new chatProto.ChatService(
    'localhost:5000',
    grpc.credentials.createInsecure(),
  );

  // สร้าง stream สำหรับการแชท
  const call = client.ChatStream();

  call.on('data', (message) => {
    console.log('Received message:', message);
  });

  call.on('end', () => {
    console.log('Stream ended');
  });

  // ส่งข้อความโดยการเขียนไปยัง stream
  function sendMessage(senderId: string, receiverId: string, content: string) {
    const timestamp = Date.now().toString();
    call.write({ senderId, receiverId, content, timestamp });
  }

  // ทดลองส่งข้อความ
  sendMessage('user1', 'user2', 'Hello from user1!');
  sendMessage('user2', 'user1', 'Hello from user2!');

  // กดปุ่มเพื่อปิดโปรแกรม
  process.stdin.on('data', () => {
    call.end();
  });
}

main();
