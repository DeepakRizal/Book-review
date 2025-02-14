import express from "express";
import {
  createReview,
  getAllReviews,
  getBookReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getAllReviews).post(protect, createReview);

router.route("/:bookId").get(getBookReview);

export default router;
