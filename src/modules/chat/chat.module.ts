import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
// import { ChatController } from './chat.controller';
import * as fs from 'fs';
import { resolve } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

// ใช้ path.resolve เพื่อระบุเส้นทางที่ชัดเจน
const protoChatFiles = fs
  .readdirSync(resolve(__dirname, '../../proto/chat'))
  .filter((file) => file.endsWith('.proto'))
  .map((file) => resolve(__dirname, '../../proto/chat', file));

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'chat',
          protoPath: protoChatFiles.filter((file) =>
            file.includes('chat.proto'),
          ),
        },
      },
    ]),
  ],
  // controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
