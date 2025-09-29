const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import prisma from "@/config/db";

async function register(data) {
  const hashed = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { email: data.email, name: data.name, password: hashed },
  });
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  return jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
}

export default { register, login };