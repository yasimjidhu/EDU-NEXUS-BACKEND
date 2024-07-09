import { IChatRepository } from '../../domain/repositories/IChatRepository';
import { Message } from '../../domain/entities/message';
import { MessageModel } from '../database/models/MessageModel';

export class ChatRepository implements IChatRepository {
  async saveMessage(message: Message): Promise<Message> {
    const newMessage = new MessageModel(message);
    const savedMessage = await newMessage.save();
    return savedMessage.toObject() as Message;
  }

  async getMessagesByUserId(userId: string): Promise<Message[]> {
    const messages = await MessageModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .sort({ timestamp: 1 })
      .exec();

    return messages.map((message) => message.toObject() as Message);
  }
}
