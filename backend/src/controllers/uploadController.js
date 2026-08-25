import { uploadBufferToCloudinary } from "../utils/uploadBuffer.js";

export async function uploadMedia(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier reçu" });
  }

  const resourceType = req.file.mimetype.startsWith("video") ? "video" : "image";

  try {
    const result = await uploadBufferToCloudinary(req.file.buffer, { folder: "uniwe", resourceType });
    res.json({ url: result.secure_url, resourceType, publicId: result.public_id });
  } catch (error) {
    next(error);
  }
}
