export interface Message {
  _id?: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: Date;
}
