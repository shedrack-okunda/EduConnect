import { Request, Response } from "express";
import {
	getAllUsersService,
	updateUserRoleService,
	updateUserStatusService,
	deleteUserService,
	getSystemStatsService,
} from "../services/admin";
import { UserRole, UserStatus } from "../types";

// GET /api/admin/users
export const getAllUsersController = async (req: Request, res: Response) => {
	try {
		const { role, status } = req.query;
		const users = await getAllUsersService(
			role as string,
			status as string
		);

		res.status(200).json({
			success: true,
			message: "Users retrieved successfully",
			data: users,
		});
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// PATCH /api/admin/users/:id/role
export const updateUserRoleController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { role } = req.body;

		const updatedUser = await updateUserRoleService(id, role as UserRole);

		res.status(200).json({
			success: true,
			message: "User role updated successfully",
			data: updatedUser,
		});
	} catch (error: any) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// PATCH /api/admin/users/:id/status
export const updateUserStatusController = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const updatedUser = await updateUserStatusService(
			id,
			status as UserStatus
		);

		res.status(200).json({
			success: true,
			message: "User status updated successfully",
			data: updatedUser,
		});
	} catch (error: any) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// DELETE /api/admin/users/:id
export const deleteUserController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteUserService(id);

		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error: any) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// GET /api/admin/stats
export const getSystemStatsController = async (
	_req: Request,
	res: Response
) => {
	try {
		const stats = await getSystemStatsService();
		res.status(200).json({
			success: true,
			message: "System stats retrieved successfully",
			data: stats,
		});
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
	}
};
