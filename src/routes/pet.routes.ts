const express = require("express");
const router = express.Router();
import petController from "../controllers/pet.controller";

router.get('/', petController.fetchPets); // List all pets with optional filters
router.get('/:userId', petController.fetchUserPets); // List user's pets
router.post('/', petController.createPet); // Add a new pet
router.put('/:id', petController.updatePet); // Update an existing pet
router.delete('/:id', petController.removePet); // Remove a pet
router.post('/adopt', petController.adoptPet); // Adopt a pet

export default router;