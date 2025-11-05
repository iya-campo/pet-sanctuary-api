import { Request, Response, NextFunction } from 'express';
import { authenticateUser, registerUser, verifyEmail } from '@/services/auth.service';
import { loginSchema } from '@/utils/validatorUtils';

const login = async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  try {
    const { token } = await authenticateUser(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    } else if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  
  try {
    const user = await registerUser(email, password);
    return res.status(201).json({ user, message: 'Registration successful. Please check your email to verify.' });
  } catch (error) {
    if (error.message === 'Email already registered') {
      return res.status(400).json({ message: error.message });
    }

    console.log(error);
    next(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const verify = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.query;
  
  try {
    const user = await verifyEmail(token);
    return res.status(201).json({ user, message: 'Email verification successful.' });
  } catch (error) {
    if (error.message === 'Invalid or expired token') {
      return res.status(400).json({ message: 'Invalid or missing verification token.' });
    }

    console.log(error);
    next(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default { login, logout, register, verify };