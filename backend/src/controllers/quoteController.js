import QuoteRequest from "../models/QuoteRequest.js";
import { uploadBufferToCloudinary } from "../utils/uploadBuffer.js";
import { notifyAdmins } from "../utils/push.js";

export async function createQuote(req, res) {
  const { name, phone, email, company, goodsType, origin, destination, details, channel } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Nom et téléphone requis" });
  }

  let photoUrl = "";
  if (req.file) {
    const result = await uploadBufferToCloudinary(req.file.buffer, {
      folder: "uniwe/devis",
      resourceType: "image",
    });
    photoUrl = result.secure_url;
  }

  const quote = await QuoteRequest.create({
    name,
    phone,
    email,
    company,
    goodsType,
    origin,
    destination,
    details,
    photoUrl,
    channel: channel === "whatsapp" ? "whatsapp" : "site",
  });

  notifyAdmins({
    title: "Nouvelle demande de devis",
    body: "Une nouvelle demande vient d'arriver sur le site.",
  }).catch(() => {});

  res.status(201).json(quote);
}

export async function listQuotes(req, res) {
  const items = await QuoteRequest.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function updateQuote(req, res) {
  const { status } = req.body;
  const item = await QuoteRequest.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!item) return res.status(404).json({ message: "Introuvable" });
  res.json(item);
}

export async function deleteQuote(req, res) {
  const item = await QuoteRequest.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Introuvable" });
  res.json({ message: "Supprimé" });
}
