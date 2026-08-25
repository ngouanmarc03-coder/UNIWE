import mongoose from "mongoose";

const quoteRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    company: { type: String, default: "" },
    goodsType: { type: String, default: "" },
    origin: { type: String, default: "" },
    destination: { type: String, default: "" },
    details: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    channel: { type: String, enum: ["site", "whatsapp"], default: "site" },
    status: { type: String, enum: ["nouveau", "traite", "archive"], default: "nouveau" },
  },
  { timestamps: true }
);

export default mongoose.model("QuoteRequest", quoteRequestSchema);
