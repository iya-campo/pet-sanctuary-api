import cors from 'cors';
const express = require("express");
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // allow frontend origin
  credentials: true,               // if using cookies or auth headers
}));

import authRoutes from "./routes/auth.routes";
import petRoutes from "@/routes/pet.routes";
// import userRoutes from "@/routes/user.routes";
import { errorHandler } from "./middlewares/error.middleware";

app.use("/auth", authRoutes);
app.use("/pets", petRoutes);
// app.use("/users", userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Pet Sanctuary API running on http://localhost:${PORT}`);
});