import { Router } from "express";
import { login, me, changeCredentials } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.get("/me", requireAuth, me);
router.put("/credentials", requireAuth, changeCredentials);

export default router;
