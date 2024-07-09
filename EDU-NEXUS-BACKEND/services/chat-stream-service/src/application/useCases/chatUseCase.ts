import { IChatService } from '../../domain/interfaces/IChatService';
import { Message } from '../../domain/entities/message';

export class ChatUseCase {
  constructor(private chatService: IChatService) {}

  async sendMessage(message: Message): Promise<Message> {
    return this.chatService.sendMessage(message);
  }
  async getConversationMessages(conversationId: string): Promise<Message[]> {
    return this.chatService.getMessages(conversationId);
  }
}
