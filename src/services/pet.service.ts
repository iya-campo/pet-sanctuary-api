import prisma from "@/config/db";

async function create(data) {
  return prisma.pet.create({ 
    data: { 
        name: data.name, 
        type: data.type,
        desc: data.desc, 
        gender: data.gender, 
        species: data.species, 
        breed: data.breed, 
        age: data.age, 
        imageUrl: data.imageUrl,
        userId: data.userId
    },
   });
}

async function getAll() {
  return prisma.pet.findMany({
    where: { adopted: false },
    include: { owner: true },
  });
}

async function adopt(petId, userId) {
  return prisma.pet.update({
    where: { id: petId },
    data: { adopted: true, ownerId: userId },
  });
}

export default { create, getAll, adopt };