import { Request, Response } from "express";
import {
	getProfile,
	updateProfile,
	updateSkills,
	updateInterests,
	searchUsers,
	updateEducation,
	updateExperience,
} from "../services/profile";
import { IUserProfile } from "../types";

// Get current user's profile
export const getUserProfile = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - user not found",
			});
		}

		const userId = req.user._id;
		const user = await getProfile(userId);
		res.status(200).json({
			success: true,
			message: "Profile retrieved successfully",
			data: user,
		});
	} catch (error: any) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - user not found",
			});
		}

		const userId = req.user._id;
		const profileData: Partial<IUserProfile> = req.body;

		const user = await updateProfile(userId, profileData);
		res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			data: user,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Update education
export const updateUserEducation = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - user not found",
			});
		}

		const userId = req.user._id;
		const { education } = req.body;

		const user = await updateEducation(userId, education);
		res.status(200).json({
			success: true,
			message: "Education updated successfully",
			data: user,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// update experience
export const updateUserExperience = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - user not found",
			});
		}

		const userId = req.user._id;
		const { experience } = req.body;

		const user = await updateExperience(userId, experience);
		res.status(200).json({
			success: true,
			message: "Experience added successfully",
			data: user,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Update skills
export const updateUserSkills = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - user not found",
			});
		}

		const userId = req.user._id;
		const { skills } = req.body;

		const user = await updateSkills(userId, skills);
		res.status(200).json({
			success: true,
			message: "Skills updated successfully",
			data: user,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Update interests
export const updateUserInterests = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - user not found",
			});
		}

		const userId = req.user._id;
		const { interests } = req.body;

		const user = await updateInterests(userId, interests);
		res.status(200).json({
			success: true,
			message: "Interests updated successfully",
			data: user,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Search users
export const searchUsersByQuery = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - user not found",
			});
		}

		const currentUserId = req.user._id;
		const { query } = req.query;

		if (!query || typeof query !== "string") {
			return res.status(400).json({
				success: false,
				message: "Query string is required",
			});
		}

		const users = await searchUsers(query, currentUserId);
		res.status(200).json({
			success: true,
			message: "Users found",
			data: users,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
