import { Router } from "express";
import { uploadMedia } from "../controllers/uploadController.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();
router.post("/", requireAuth, upload.single("file"), uploadMedia);

export default router;
