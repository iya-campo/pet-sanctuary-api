import { authenticateUser, registerUser, verifyUserEmail } from '@/services/auth.service';
import { loginSchema } from '@/validators/authValidator';
import { Request, Response, NextFunction } from 'express';

const login = async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  try {
    const { token } = await authenticateUser(email, password);
    res.json({ token });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    } else if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const result = await registerUser(email, password);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  const { token } = req.query;
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Invalid token' });
  }
  try {
    const result = await verifyUserEmail(token);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default { login, register, verifyEmail };