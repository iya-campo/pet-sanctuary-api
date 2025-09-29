const express = require("express");
const app = express();
app.use(express.json());

import userRoutes from "@/routes/user.routes";
import petRoutes from "@/routes/pet.routes";

app.use("/users", userRoutes);
app.use("/pets", petRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Pet Sanctuary API running on http://localhost:${PORT}`);
});