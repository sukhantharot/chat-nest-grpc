import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  ChatServiceController,
  ChatServiceControllerMethods,
} from '../../proto/chat/chat';
import { Observable, of } from 'rxjs';
import { Message, SendMessageResponse, User } from './chat.interface';

@Controller('chat')
@ChatServiceControllerMethods()
export class ChatController implements ChatServiceController {
  constructor(private readonly chatService: ChatService) {}

  chatStream(request: Observable<Message>): Observable<Message> {
    return this.chatService.chatStream(request);
  }

  sendMessage(
    request: Message,
  ):
    | Promise<SendMessageResponse>
    | Observable<SendMessageResponse>
    | SendMessageResponse {
    return this.chatService.sendMessage(request, null);
  }

  streamMessages(request: User): Observable<Message> {
    return this.chatService.streamMessages(request);
  }
}
