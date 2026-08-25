import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "UNIWÊ" },
    logoUrl: { type: String, default: "" },
    tagline: { type: String, default: "Import-export entre l'Afrique et l'Europe" },
    whatsappAdminNumber: { type: String, default: "" },
    whatsappCommunityLink: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    legalTexts: {
      mentionsLegales: { type: String, default: "" },
      cgu: { type: String, default: "" },
      confidentialite: { type: String, default: "" },
    },
    stats: {
      type: [
        {
          value: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
