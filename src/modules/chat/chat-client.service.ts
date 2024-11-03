import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Message, User } from './chat.interface';
import { lastValueFrom } from 'rxjs';
import { ChatService } from './chat.service';

@Injectable()
export class ChatClientService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'chat',
      protoPath: join(__dirname, '../../proto/chat'),
    },
  })
  private client: ClientGrpc;

  private chatService: ChatService;

  onModuleInit() {
    this.chatService = this.client.getService<ChatService>('ChatService');
  }

  async sendMessage(message: Message) {
    return lastValueFrom(this.chatService.sendMessage(message, undefined));
  }

  streamMessages(user: User) {
    return this.chatService.streamMessages(user); // นี่คือสตรีมแบบ Observable
  }
}
