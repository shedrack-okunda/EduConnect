import express from "express";
import {
	createCourseModuleController,
	deleteCourseModuleController,
	getModulesByCourseController,
	updateCourseModuleController,
} from "../controllers/courseModuleController";
import { authenticate } from "../middleware/auth";
import { requireEducatorOrAdmin } from "../middleware/rbac";

const router = express.Router();

router.post(
	"/",
	authenticate,
	requireEducatorOrAdmin,
	createCourseModuleController
);
router.get("/course/:id", getModulesByCourseController);
router.put(
	"/module/:id",
	authenticate,
	requireEducatorOrAdmin,
	updateCourseModuleController
);
router.delete(
	"/module/:id",
	authenticate,
	requireEducatorOrAdmin,
	deleteCourseModuleController
);

export default router;
