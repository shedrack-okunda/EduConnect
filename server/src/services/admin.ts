import { User } from "../models/User";
import { UserRole, UserStatus, IUser } from "../types";
import mongoose from "mongoose";

// ✅ Get all users (optionally filtered by role/status)
export const getAllUsersService = async (
	role?: string,
	status?: string
): Promise<IUser[]> => {
	try {
		const filter: any = {};
		if (role) filter.role = role;
		if (status) filter.status = status;

		const users = await User.find(filter).select("-password");
		return users;
	} catch (error: any) {
		throw new Error(`Failed to fetch users: ${error.message}`);
	}
};

// ✅ Update user role (with last-admin protection)
export const updateUserRoleService = async (
	userId: string,
	role: UserRole
): Promise<IUser> => {
	try {
		if (!Object.values(UserRole).includes(role)) {
			throw new Error("Invalid role");
		}

		const user = await User.findById(userId);
		if (!user) throw new Error("User not found");

		// Prevent last-admin lockout
		if (user.role === UserRole.ADMIN && role !== UserRole.ADMIN) {
			const adminCount = await User.countDocuments({
				role: UserRole.ADMIN,
			});
			if (adminCount <= 1)
				throw new Error("Cannot remove the last admin");
		}

		user.role = role;
		await user.save();
		return user.toJSON();
	} catch (error: any) {
		throw new Error(`Failed to update user role: ${error.message}`);
	}
};

// ✅ Update user status (active/suspended)
export const updateUserStatusService = async (
	userId: string,
	status: UserStatus
): Promise<IUser> => {
	try {
		if (!Object.values(UserStatus).includes(status)) {
			throw new Error("Invalid status");
		}

		const user = await User.findByIdAndUpdate(
			userId,
			{ status },
			{ new: true }
		).select("-password");

		if (!user) throw new Error("User not found");

		return user.toJSON();
	} catch (error: any) {
		throw new Error(`Failed to update user status: ${error.message}`);
	}
};

// ✅ Delete user (with last-admin protection)
export const deleteUserService = async (userId: string): Promise<void> => {
	try {
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			throw new Error("Invalid user ID");
		}

		const user = await User.findById(userId);
		if (!user) throw new Error("User not found");

		if (user.role === UserRole.ADMIN) {
			const adminCount = await User.countDocuments({
				role: UserRole.ADMIN,
			});
			if (adminCount <= 1)
				throw new Error("Cannot delete the last admin");
		}

		await user.deleteOne();
	} catch (error: any) {
		throw new Error(`Failed to delete user: ${error.message}`);
	}
};

// ✅ Get system statistics
export const getSystemStatsService = async () => {
	try {
		const totalUsers = await User.countDocuments();
		const activeUsers = await User.countDocuments({
			status: UserStatus.ACTIVE,
		});
		const suspendedUsers = await User.countDocuments({
			status: UserStatus.SUSPENDED,
		});

		const byRole = await User.aggregate([
			{ $group: { _id: "$role", count: { $sum: 1 } } },
		]);

		return {
			totalUsers,
			activeUsers,
			suspendedUsers,
			byRole,
		};
	} catch (error: any) {
		throw new Error(`Failed to fetch system stats: ${error.message}`);
	}
};
