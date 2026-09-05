import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { makePublicRouter, makeAdminRouter } from "./routes/crudRoutes.js";
import { publicQuoteRouter, adminQuoteRouter } from "./routes/quoteRoutes.js";
import { publicReviewRouter, adminReviewRouter } from "./routes/reviewRoutes.js";
import { publicSettingsRouter, adminSettingsRouter } from "./routes/settingsRoutes.js";
import { publicGalleryRouter, adminGalleryRouter } from "./routes/galleryRoutes.js";

import heroController from "./controllers/heroController.js";
import locationController from "./controllers/locationController.js";
import postController from "./controllers/postController.js";
import sponsorController from "./controllers/sponsorController.js";
import faqController from "./controllers/faqController.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Requêtes sans origine (curl, apps mobiles, Postman) toujours autorisées.
      if (!origin) return callback(null, true);
      // Si aucune URL client n'est configurée, on n'impose aucune restriction.
      if (allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Toujours autoriser le développement local et sur le réseau local (mobile).
      if (/^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origine non autorisée par CORS"));
    },
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Public
app.use("/api/heroes", makePublicRouter(heroController));
app.use("/api/locations", makePublicRouter(locationController));
app.use("/api/posts", makePublicRouter(postController));
app.use("/api/sponsors", makePublicRouter(sponsorController));
app.use("/api/faqs", makePublicRouter(faqController));
app.use("/api/gallery", publicGalleryRouter);
app.use("/api/quotes", publicQuoteRouter);
app.use("/api/reviews", publicReviewRouter);
app.use("/api/settings", publicSettingsRouter);

// Admin
app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/upload", uploadRoutes);
app.use("/api/admin/heroes", makeAdminRouter(heroController));
app.use("/api/admin/locations", makeAdminRouter(locationController));
app.use("/api/admin/posts", makeAdminRouter(postController));
app.use("/api/admin/sponsors", makeAdminRouter(sponsorController));
app.use("/api/admin/faqs", makeAdminRouter(faqController));
app.use("/api/admin/gallery", adminGalleryRouter);
app.use("/api/admin/quotes", adminQuoteRouter);
app.use("/api/admin/reviews", adminReviewRouter);
app.use("/api/admin/settings", adminSettingsRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend UNIWÊ démarré sur le port ${PORT} (accessible sur le réseau local)`);
    });
  })
  .catch((err) => {
    console.error("Échec de connexion à MongoDB :", err.message);
    process.exit(1);
  });
