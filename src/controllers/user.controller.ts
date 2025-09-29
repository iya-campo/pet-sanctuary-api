import userService from "@/services/user.service";

async function registerUser(req, res) {
  try {
    const user = await userService.register(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const token = await userService.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export default { registerUser, loginUser };