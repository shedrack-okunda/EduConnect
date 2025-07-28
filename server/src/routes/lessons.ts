import express from "express";
import {
	createLessonController,
	deleteLessonController,
	getLessonsByModuleController,
	updateLessonController,
} from "../controllers/lessonController";
import { authenticate } from "../middleware/auth";
import { requireEducatorOrAdmin } from "../middleware/rbac";

const router = express.Router();

router.post("/", authenticate, requireEducatorOrAdmin, createLessonController);
router.get("/module/:id", getLessonsByModuleController);
router.put(
	"/lesson/:id",
	authenticate,
	requireEducatorOrAdmin,
	updateLessonController
);
router.delete(
	"/lesson/:id",
	authenticate,
	requireEducatorOrAdmin,
	deleteLessonController
);

export default router;
