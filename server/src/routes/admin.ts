import express from "express";
import { authenticate } from "../middleware/auth";
import {
	getAllUsersController,
	updateUserRoleController,
	updateUserStatusController,
	deleteUserController,
	getSystemStatsController,
} from "../controllers/adminController";
import { requireAdmin } from "../middleware/rbac";

const router = express.Router();

router.use(authenticate, requireAdmin);

router.get("/users", getAllUsersController);
router.patch("/users/:id/role", updateUserRoleController);
router.patch("/users/:id/status", updateUserStatusController);
router.delete("/users/:id", deleteUserController);
router.get("/stats", getSystemStatsController);

export default router;
