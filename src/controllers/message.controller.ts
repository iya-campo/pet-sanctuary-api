import { createMessage, getLastMessage, getMessages } from '@/services/message.service';
import { Request, Response } from 'express';

// Create a new message
const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { senderId, receiverId, content } = req.body;
    const message = await createMessage(senderId, receiverId, content);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Get all messages between two users
const getMessagesByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, otherUserId } = req.params;
    const messages = await getMessages(Number(userId), Number(otherUserId));
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Get the last message between two users
const getLastMessageByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, otherUserId } = req.params;
    const lastMessage = await getLastMessage(Number(userId), Number(otherUserId));
    res.status(200).json(lastMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch last message' });
  }
};

export default {
  sendMessage,
  getMessagesByUserId,
  getLastMessageByUserId
};