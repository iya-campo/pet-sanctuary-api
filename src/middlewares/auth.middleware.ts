import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/jwtUtils';

export const verify = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Invalid or Expired Token.' });
  }
};