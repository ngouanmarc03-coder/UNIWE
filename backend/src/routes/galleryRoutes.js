import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import galleryController from "../controllers/galleryController.js";

const publicGalleryRouter = Router();
publicGalleryRouter.get("/", galleryController.listPublic);
publicGalleryRouter.get("/:slug", galleryController.getBySlug);

const adminGalleryRouter = Router();
adminGalleryRouter.use(requireAuth);
adminGalleryRouter.get("/", galleryController.listAdmin);
adminGalleryRouter.post("/", galleryController.create);
adminGalleryRouter.put("/:id", galleryController.update);
adminGalleryRouter.delete("/:id", galleryController.remove);

export { publicGalleryRouter, adminGalleryRouter };
