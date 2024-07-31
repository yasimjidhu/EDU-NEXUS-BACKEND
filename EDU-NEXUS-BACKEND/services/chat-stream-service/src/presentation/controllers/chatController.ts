import { Request, Response } from 'express';
import { ChatUseCase } from '../../application/useCases/chatUseCase';

export class ChatController {
  constructor(private chatUseCase: ChatUseCase) {}

  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      console.log('message got in backend',req.body)
      const message = req.body;
      const savedMessage = await this.chatUseCase.sendMessage(message);
      res.status(200).json(savedMessage);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  async getMessages(req: Request, res: Response): Promise<void> {
    try {
      const { conversationId } = req.params;
      const messages =
        await this.chatUseCase.getConversationMessages(conversationId);
      res.status(200).json(messages);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}
