import { Message } from '../../domain/entities/message';
import { IChatService } from '../../domain/interfaces/IChatService';
import { ChatRepository } from '../repositories/ChatRepository';

export class ChatService implements IChatService {
  constructor(private chatRepository: ChatRepository) {}

  async saveMessage(message: Message): Promise<Message> {
    return this.chatRepository.saveMessage(message);
  }
  async sendMessage(message: Message): Promise<Message> {
    return this.chatRepository.saveMessage(message);
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return this.chatRepository.getMessagesByUserId(conversationId);
  }
}
