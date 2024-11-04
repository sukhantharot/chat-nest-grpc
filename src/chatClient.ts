const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

async function main() {
  const packageDefinition = await protoLoader.load(
    path.join(__dirname, 'proto/chat/chat.proto')
  );
  const chatProto = grpc.loadPackageDefinition(packageDefinition).chat;

  const client = new chatProto.ChatService(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  function initiateChatStream() {
    const call = client.ChatStream();

    call.on('data', (message) => {
      console.log('Received message:', message);
    });

    call.on('error', (error) => {
      console.error('Stream error:', error);
      if (error.code === grpc.status.UNAVAILABLE) {
        console.log('Attempting to reconnect...');
        setTimeout(initiateChatStream, 1000);
      }
    });

    call.on('end', () => {
      console.log('Stream ended');
    });

    return call;
  }

  const call = initiateChatStream();

  function sendMessage(senderId, receiverId, content) {
    const timestamp = Date.now().toString();
    call.write({ senderId, receiverId, content, timestamp });
  }

  sendMessage('user1', 'user2', 'Hello from user1!');
  sendMessage('user2', 'user1', 'Hello from user2!');

  process.stdin.on('data', () => {
    call.end();
  });
}

main();
