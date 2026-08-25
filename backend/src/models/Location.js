import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    phone: { type: String, default: "" },
    hours: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);
