import { Router } from "express";
import { createQuote, listQuotes, updateQuote, deleteQuote } from "../controllers/quoteController.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

export const publicQuoteRouter = Router();
publicQuoteRouter.post("/", upload.single("photo"), createQuote);

export const adminQuoteRouter = Router();
adminQuoteRouter.use(requireAuth);
adminQuoteRouter.get("/", listQuotes);
adminQuoteRouter.put("/:id", updateQuote);
adminQuoteRouter.delete("/:id", deleteQuote);
