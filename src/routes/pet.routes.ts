const express = require("express");
const router = express.Router();
import petController from "@/controllers/pet.controller";

router.post("/", petController.addPet);
router.get("/", petController.listPets);
router.put("/:id/adopt", petController.adoptPet);

export default router;