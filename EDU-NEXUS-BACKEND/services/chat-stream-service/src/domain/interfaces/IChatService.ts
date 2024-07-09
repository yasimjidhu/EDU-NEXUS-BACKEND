import { Message } from '../entities/message';

export interface IChatService {
  sendMessage(message: Message): Promise<Message>;
  getMessages(userId: string): Promise<Message[]>;
}
