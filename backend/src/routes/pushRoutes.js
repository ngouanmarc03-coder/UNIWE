import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getPublicKey, subscribe, unsubscribe } from "../controllers/pushController.js";

const router = Router();
router.use(requireAuth);
router.get("/public-key", getPublicKey);
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);

export default router;
