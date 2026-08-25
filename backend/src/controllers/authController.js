import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

function signToken(admin) {
  return jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  const token = signToken(admin);
  res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
}

export async function me(req, res) {
  const admin = await Admin.findById(req.admin.id).select("-passwordHash");
  res.json(admin);
}

export async function changeCredentials(req, res) {
  const { name, email, currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin.id);
  if (!admin) return res.status(404).json({ message: "Admin introuvable" });

  if (newPassword) {
    if (!currentPassword) {
      return res.status(400).json({ message: "Mot de passe actuel requis" });
    }
    const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Mot de passe actuel incorrect" });
    }
    admin.passwordHash = await bcrypt.hash(newPassword, 10);
  }

  if (email) admin.email = email.toLowerCase().trim();
  if (name) admin.name = name;

  await admin.save();
  const token = signToken(admin);
  res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
}
