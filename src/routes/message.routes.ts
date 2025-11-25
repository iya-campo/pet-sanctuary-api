const express = require("express");
const router = express.Router();
import messageController from "../controllers/message.controller";

router.post('/', messageController.sendMessage);
router.get('/:userId/:otherUserId', messageController.getMessagesByUserId);
router.get('/last/:userId/:otherUserId', messageController.getLastMessageByUserId);

export default router;