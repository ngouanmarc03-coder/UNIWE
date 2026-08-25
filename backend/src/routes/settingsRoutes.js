import { Router } from "express";
import { getPublicSettings, getSettings, updateSettings } from "../controllers/settingsController.js";
import { requireAuth } from "../middleware/auth.js";

export const publicSettingsRouter = Router();
publicSettingsRouter.get("/", getPublicSettings);

export const adminSettingsRouter = Router();
adminSettingsRouter.use(requireAuth);
adminSettingsRouter.get("/", getSettings);
adminSettingsRouter.put("/", updateSettings);
