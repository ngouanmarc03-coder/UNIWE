import { Router } from "express";
import {
  createReview,
  listApprovedReviews,
  listAllReviews,
  updateReviewStatus,
  deleteReview,
} from "../controllers/reviewController.js";
import { requireAuth } from "../middleware/auth.js";

export const publicReviewRouter = Router();
publicReviewRouter.get("/", listApprovedReviews);
publicReviewRouter.post("/", createReview);

export const adminReviewRouter = Router();
adminReviewRouter.use(requireAuth);
adminReviewRouter.get("/", listAllReviews);
adminReviewRouter.put("/:id", updateReviewStatus);
adminReviewRouter.delete("/:id", deleteReview);
