import prisma from "../config/db";

// Create a new message
export const createMessage = async (senderId: number, receiverId: number, content: string) => {
  return prisma.message.create({
    data: {
      content,
      senderId,
      receiverId,
    },
  });
};

// Get all messages between two users
export const getMessages = async (userId: number, otherUserId: number) => {
  return prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });
};

// Get the last message between two users
export const getLastMessage = async (userId: number, otherUserId: number) => {
  return prisma.message.findFirst({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });
};
