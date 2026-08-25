import dns from "dns";
import mongoose from "mongoose";

// Le résolveur DNS système ne traite pas toujours correctement les
// enregistrements SRV utilisés par les URI mongodb+srv://. On force
// un résolveur public fiable pour éviter les erreurs ECONNREFUSED.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI manquant dans .env");
  }
  await mongoose.connect(uri);
  console.log("MongoDB connecté");
}
