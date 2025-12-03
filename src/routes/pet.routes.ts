const express = require("express");
const router = express.Router();
import petController from "../controllers/pet.controller";
import { uploadFiles } from "@/utils/multerUtils";

router.get('/', petController.fetchPets); // List all pets with optional filters
router.get('/:userId', petController.fetchUserPets); // List user's pets
router.post('/', uploadFiles, petController.createPet);
router.put('/:id', petController.updatePet); // Update an existing pet
router.delete('/:id', petController.removePet); // Remove a pet
router.post('/adopt', petController.adoptPet); // Adopt a pet

export default router;