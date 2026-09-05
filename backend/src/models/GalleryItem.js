import mongoose from "mongoose";

const galleryPhotoSchema = new mongoose.Schema(
  {
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    mediaUrl: { type: String, required: true },
    caption: { type: String, default: "" },
  },
  { _id: false }
);

const galleryItemSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    photos: { type: [galleryPhotoSchema], default: [] },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("GalleryItem", galleryItemSchema);
