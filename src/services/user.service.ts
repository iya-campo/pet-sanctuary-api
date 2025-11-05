import prisma from '@/config/db';
import { User } from '@prisma/client';
import { hashPassword } from "@/utils/passwordUtils";

// Get Users
export const fetch = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

// Get User by email
export const getByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
    include: {
      pets: true,
      adoptedPets: true,
    },
  });
};

// Get User by ID
export const getById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

// Create User
export const create = async (email: string, password: string): Promise<User> => {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};

// Update User
export const update = async (id: number, data: Partial<User>): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

// Remove User
export const remove = async (id: number): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
};