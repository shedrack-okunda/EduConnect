import express from "express";
import {
	getUserProfile,
	updateUserProfile,
	updateUserSkills,
	updateUserInterests,
	searchUsersByQuery,
	updateUserEducation,
	updateUserExperience,
} from "../controllers/profileController";
import { authenticate } from "../middleware/auth"; // your middleware that sets req.user

const router = express.Router();

// All routes below require authentication
router.use(authenticate);

// GET /api/profile/me
router.get("/me", getUserProfile);

// PUT /api/profile
router.put("/", updateUserProfile);

// PUT /api/profile/education
router.put("/education", authenticate, updateUserEducation);

// PUT /api/profile/experience
router.put("/experience", authenticate, updateUserExperience);

// PUT /api/profile/skills
router.put("/skills", updateUserSkills);

// PUT /api/profile/interests
router.put("/interests", updateUserInterests);

// GET /api/profile/search?query=design
router.get("/search", searchUsersByQuery);

export default router;
