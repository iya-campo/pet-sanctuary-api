import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes";
import petRoutes from "./routes/pet.routes";
import userRoutes from "./routes/user.routes";
import messageRoutes from "./routes/message.routes";
import { errorHandler } from "./middlewares/error.middleware";

require('dotenv').config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/auth", authRoutes);
app.use("/pets", petRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Pet Sanctuary API running on http://localhost:${PORT}`);
});