import { Request, Response } from 'express';
import { create, getById, update, remove, getByEmail, fetch } from '../services/user.service';

// Fetch Users
const fetchUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await fetch();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get User by Email
export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    const user = await getByEmail(email);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Get User by ID
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getById(Number(id));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create User
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await create(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update User
const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await update(Number(id), req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Remove User
const removeUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await remove(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove user' });
  }
};

export default { 
  fetchUsers, 
  createUser,
  getUserById, 
  getUserByEmail, 
  updateUser, 
  removeUser 
};