import mongoose, { model } from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

export const MessageModel = model('messages', messageSchema);
