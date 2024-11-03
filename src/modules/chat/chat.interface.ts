// chat.interface.ts

export interface User {
  userId: string;
}

export interface SendMessageResponse {
  success: boolean;
}

export interface Message {
  senderId: string;
  receiverId: string;
  messageContent: string;
  timestamp: string;
}

export interface ChatMessage {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}
