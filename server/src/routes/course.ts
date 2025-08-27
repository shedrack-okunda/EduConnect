import express from "express";
import {
	createCourseController,
	deleteCourseController,
	enrollInCourseController,
	getCompletedCoursesController,
	getCourseByIdController,
	getCourseEnrollmentsController,
	getCoursesController,
	getEnrolledCoursesController,
	unenrollFromCourseController,
	updateCourseController,
	updateCourseProgressController,
} from "../controllers/courseController";
import { authenticate } from "../middleware/auth";
import { requireEducatorOrAdmin } from "../middleware/rbac";

const router = express.Router();

router.post("/", authenticate, requireEducatorOrAdmin, createCourseController);
router.get("/", getCoursesController);
router.get("/enrolled", authenticate, getEnrolledCoursesController);
router.get("/completed", authenticate, getCompletedCoursesController);
router.post("/enroll/:courseId", authenticate, enrollInCourseController);
router.get("/course/:courseId", getCourseByIdController);

router.put(
	"/course/:courseId",
	authenticate,
	requireEducatorOrAdmin,
	updateCourseController
);
router.get(
	"/course/:courseId/enrollments",
	authenticate,
	requireEducatorOrAdmin,
	getCourseEnrollmentsController
);
router.post("/unenroll/:courseId", authenticate, unenrollFromCourseController);
router.put("/progress/:courseId", authenticate, updateCourseProgressController);
router.delete(
	"/course/:courseId",
	authenticate,
	requireEducatorOrAdmin,
	deleteCourseController
);

export default router;
