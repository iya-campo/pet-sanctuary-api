import prisma from "../../config/db";
import { Gender, Pet, Species, Type } from "@prisma/client";

// List all pets with optional filters
export const fetch = async (
  filters: { type?: Type; species?: Species; location?: string },
  page: number = 1,
  limit: number = 9,
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<{ pets: Pet[]; totalCount: number }> => {
  const skip = (page - 1) * limit;
  const validSortFields = ['name', 'createdAt', 'age', 'species', 'breed'];

  // Ensure the sortBy field is valid
  if (!validSortFields.includes(sortBy)) sortBy = 'createdAt';

  // Fetch the paginated pets
  const pets = await prisma.pet.findMany({
    where: {
      type: filters.type ? filters.type : { notIn: ['ADOPTED', 'CLOSED'] },
      species: filters.species,
      location: filters.location ? { contains: filters.location } : undefined,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder, // Dynamically sort based on the field and order
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  // Fetch the total count of pets without pagination
  const totalCount = await prisma.pet.count({
    where: {
      type: filters.type ? filters.type : { notIn: ['ADOPTED', 'CLOSED'] },
      species: filters.species,
      location: filters.location ? { contains: filters.location } : undefined,
    },
  });

  return { pets, totalCount }; // Return both pets and the total count
};

// List pets of a specific user
export const fetchByUser = async (userId: number): Promise<Pet[]> => {
  return prisma.pet.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
};

// Create a new pet
export const create = async (data: {
  type: Type;
  name: string;
  desc: string;
  gender: Gender;
  species: Species;
  breed: string;
  age?: number;
  location?: string;
  imageUrls?: string;
  userId: number;
}): Promise<Pet> => {
  return prisma.pet.create({
    data,
  });
};

// Update a pet
export const update = async (id: number, data: Partial<Pet>): Promise<Pet> => {
  return prisma.pet.update({
    where: { id },
    data,
  });
};

// Remove a pet
export const remove = async (id: number): Promise<Pet> => {
  return prisma.pet.delete({
    where: { id },
  });
};

// Adopt a pet
export const adopt = async (petId: number, adopterId: number): Promise<Pet> => {
  return prisma.pet.update({
    where: { id: petId },
    data: {
      adopterId,
      type: 'ADOPTED',
    },
  });
};
