import { Injectable } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, of, Subject } from 'rxjs';
import { Message, SendMessageResponse, User } from './chat.interface';

@Injectable()
export class ChatService {
  private messageStream = new Subject<Message>();

  @GrpcMethod('ChatService', 'SendMessage')
  sendMessage(data: Message, metadata: any): Observable<SendMessageResponse> {
    this.messageStream.next(data);
    return of({ success: true });
  }

  @GrpcStreamMethod('ChatService', 'StreamMessages')
  streamMessages(user: User) {
    return this.messageStream.asObservable();
  }

  @GrpcStreamMethod('ChatService', 'ChatStream')
  chatStream(message$: Observable<Message>): Observable<Message> {
    message$.subscribe((message) => {
      this.messageStream.next(message); // ส่งข้อความไปยังทุกไคลเอนต์ที่เชื่อมต่อ
    });

    return this.messageStream.asObservable(); // ส่งสตรีมกลับไปยังไคลเอนต์ที่เชื่อมต่อ
  }
}
