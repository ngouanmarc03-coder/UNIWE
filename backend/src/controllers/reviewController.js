import Review from "../models/Review.js";

export async function createReview(req, res) {
  const { name, company, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ message: "Nom, note et commentaire requis" });
  }

  const review = await Review.create({
    name,
    company,
    rating,
    comment,
    status: "pending",
  });

  res.status(201).json(review);
}

export async function listApprovedReviews(req, res) {
  const items = await Review.find({ status: "approved" }).sort({ createdAt: -1 });
  res.json(items);
}

export async function listAllReviews(req, res) {
  const items = await Review.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function updateReviewStatus(req, res) {
  const { status } = req.body;
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Statut invalide" });
  }
  const item = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!item) return res.status(404).json({ message: "Introuvable" });
  res.json(item);
}

export async function deleteReview(req, res) {
  const item = await Review.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Introuvable" });
  res.json({ message: "Supprimé" });
}
