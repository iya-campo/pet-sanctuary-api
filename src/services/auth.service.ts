import prisma from "@/config/db";
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { signToken } from '@/utils/jwtUtils';
import { sendVerificationEmail } from '@/utils/emailUtils';

export const authenticateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = signToken({ id: user.id });

  return { token };
};

export const registerUser = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      verificationToken,
    },
  });

  await sendVerificationEmail(user.email, verificationToken);

  return;
};

export const verifyEmail = async (token: string) => {
  const user = await prisma.user.findFirst({ where: { verificationToken: token } });
  if (!user) throw new Error('Invalid or expired token');

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isEmailVerified: true,
      verificationToken: null,
    },
  });

  return;
};