import express from "express";
import {
	createCourseController,
	deleteCourseController,
	getCourseByIdController,
	getCoursesController,
	updateCourseController,
} from "../controllers/courseController";
import { authenticate } from "../middleware/auth";
import { requireEducatorOrAdmin } from "../middleware/rbac";

const router = express.Router();

router.post("/", authenticate, requireEducatorOrAdmin, createCourseController);
router.get("/", getCoursesController);
router.get("/course/:id", getCourseByIdController);
router.put(
	"/course/:id",
	authenticate,
	requireEducatorOrAdmin,
	updateCourseController
);
router.delete(
	"/course/:id",
	authenticate,
	requireEducatorOrAdmin,
	deleteCourseController
);

export default router;
