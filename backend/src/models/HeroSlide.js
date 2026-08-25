import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    mediaUrl: { type: String, required: true },
    ctaText: { type: String, default: "" },
    ctaLink: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("HeroSlide", heroSlideSchema);
