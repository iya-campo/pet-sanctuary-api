import petService from "@/services/pet.service";

async function addPet(req, res) {
  try {
    const pet = await petService.create(req.body);
    res.json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function listPets(req, res) {
  const pets = await petService.getAll();
  res.json(pets);
}

async function adoptPet(req, res) {
  try {
    const pet = await petService.adopt(Number(req.params.id), req.body.userId);
    res.json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export default { addPet, listPets, adoptPet };