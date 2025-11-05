import { Request, Response } from 'express';
import { adopt, create, fetch, fetchByUser, remove, update } from '@/services/pet.service';

const fetchPets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, species, location, page, limit, sortBy, sortOrder } = req.query;

    // Parse pagination and sorting parameters
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 9;
    const sortField = (sortBy as string) || 'createdAt'; // Default to sorting by createdAt
    const sortOrderValue = (sortOrder as 'asc' | 'desc') || 'asc'; // Default to ascending order

    const { pets, totalCount } = await fetch({
        type: type as any,
        species: species as any,
        location: location as string,
      },
      pageNumber,
      limitNumber,
      sortField,
      sortOrderValue
    );
    res.status(200).json({ pets, totalCount });
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to fetch pets' });
  }
};

const fetchUserPets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const pets = await fetchByUser(Number(userId));
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to fetch user pets' });
  }
};

const createPet = async (req: Request, res: Response): Promise<void> => {
  try {
    const petData = req.body;
    const pet = await create(petData);
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to create pet' });
  }
};

const updatePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const petData = req.body;
    const pet = await update(Number(id), petData);
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to update pet' });
  }
};

const removePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const pet = await remove(Number(id));
    res.status(204).json(pet);
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to remove pet' });
  }
};

const adoptPet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { petId, adopterId } = req.body;
    const pet = await adopt(Number(petId), Number(adopterId));
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to adopt pet' });
  }
};

export default {
  fetchPets,
  fetchUserPets,
  createPet,
  updatePet,
  removePet,
  adoptPet,
};