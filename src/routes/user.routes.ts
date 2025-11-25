const express = require("express");
const router = express.Router();
import userController from '../controllers/user.controller';
import { verify } from '../middlewares/auth.middleware';

router.get('/', userController.fetchUsers);
router.post('/', userController.createUser);
router.get('/:email', userController.getUserByEmail);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.removeUser);

export default router;