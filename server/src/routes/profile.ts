import express from "express";
import {
	getUserProfile,
	updateUserProfile,
	addUserEducation,
	addUserExperience,
	updateUserSkills,
	updateUserInterests,
	searchUsersByQuery,
	updateUserEducation,
} from "../controllers/profileController";
import { authenticate } from "../middleware/auth"; // your middleware that sets req.user

const router = express.Router();

// All routes below require authentication
router.use(authenticate);

// GET /api/profile/me
router.get("/me", getUserProfile);

// PUT /api/profile
router.put("/", updateUserProfile);

// POST /api/profile/education
router.post("/education", addUserEducation);

// PUT /api/profile/education
router.put("/education", authenticate, updateUserEducation);

// POST /api/profile/experience
router.post("/experience", addUserExperience);

// PUT /api/profile/skills
router.put("/skills", updateUserSkills);

// PUT /api/profile/interests
router.put("/interests", updateUserInterests);

// GET /api/profile/search?query=design
router.get("/search", searchUsersByQuery);

export default router;
