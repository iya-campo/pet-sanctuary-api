const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/pets', async (req, res) => {
    try {
        const { name, desc, gender, species, breed, age, ownerId, imageUrl } = req.body;
        const newPet = await prisma.pet.create({
            name,
            desc,
            gender,
            species,
            breed,
            age,
            ownerId,
            imageUrl
        });
        res.status(201).json({ message: 'Pet created successfully.', newPet });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating the pet.' });
    }
});

app.get('/pets', async (req, res) => {
    try {
        const allPets = await prisma.pet.findMany();
        return res.status(201).json({ message: 'Pets retrieved successfully.', allPets });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred retrieving pets.' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});