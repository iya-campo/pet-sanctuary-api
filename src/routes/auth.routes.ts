const express = require("express");
const router = express.Router();
import authController from '@/controllers/auth.controller';
import { verify } from '@/middlewares/auth.middleware';

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/verify-email', authController.verify);

export default router;