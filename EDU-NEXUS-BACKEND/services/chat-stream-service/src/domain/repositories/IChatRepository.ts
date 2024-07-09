import { Message } from '../entities/message';

export interface IChatRepository {
  saveMessage(message: Message): Promise<Message>;
  getMessagesByUserId(userId: string): Promise<Message[]>;
}
