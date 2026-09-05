import GalleryItem from "../models/GalleryItem.js";
import { makeCrud } from "./crudFactory.js";

const crud = makeCrud(GalleryItem, { publicFilter: { active: true } });

async function getBySlug(req, res) {
  const item = await GalleryItem.findOne({ slug: req.params.slug, active: true });
  if (!item) return res.status(404).json({ message: "Introuvable" });
  res.json(item);
}

export default { ...crud, getBySlug };
