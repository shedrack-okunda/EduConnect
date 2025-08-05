import express from "express";
import {
	createCourseController,
	deleteCourseController,
	enrollInCourseController,
	getCourseByIdController,
	getCoursesController,
	getEnrolledCoursesController,
	updateCourseController,
} from "../controllers/courseController";
import { authenticate } from "../middleware/auth";
import { requireEducatorOrAdmin } from "../middleware/rbac";

const router = express.Router();

router.post("/", authenticate, requireEducatorOrAdmin, createCourseController);
router.get("/", getCoursesController);
router.get("/enrolled", authenticate, getEnrolledCoursesController);
router.post("/enroll/:courseId", authenticate, enrollInCourseController);
router.get("/course/:courseId", getCourseByIdController);
router.put(
	"/course/:courseId",
	authenticate,
	requireEducatorOrAdmin,
	updateCourseController
);
router.delete(
	"/course/:courseId",
	authenticate,
	requireEducatorOrAdmin,
	deleteCourseController
);

export default router;
