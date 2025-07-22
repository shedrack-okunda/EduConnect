import express from "express";
import {
	loginUser,
	me,
	refreshToken,
	registerUser,
} from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.get("/me", authenticate, me);

export default router;
