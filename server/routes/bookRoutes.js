import express from "express";
import { protect, restrictTo } from "../middleware/auth.js";
import {
  addBook,
  getAllBooks,
  getBook,
  getFeaturedBooks,
} from "../controllers/bookController.js";

const router = express.Router();

router.route("/").get(getAllBooks).post(protect, restrictTo("admin"), addBook);

router.route("/featured").get(getFeaturedBooks);

router.route("/:id").get(getBook);

export default router;
