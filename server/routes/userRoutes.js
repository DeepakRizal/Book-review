import express from "express";
import { login, signup } from "../middleware/auth.js";
import { getUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/signin").post(signup);
router.route("/login").post(login);

// get and update endpoints
router.route("/:id").get(getUser).put(updateUser);

export default router;
