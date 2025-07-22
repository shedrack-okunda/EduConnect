import { IUserDocument, User } from "../models/User";
import { IEducation, IExperience, IUserProfile } from "../types";

// Get user profile
export const getProfile = async (userId: string): Promise<IUserDocument> => {
	try {
		const user = await User.findById(userId);
		if (!user) throw new Error("User not found");
		return user;
	} catch (error: any) {
		throw new Error(`Failed to get profile: ${error.message}`);
	}
};

// Update user profile
export const updateProfile = async (
	userId: string,
	profileData: Partial<IUserProfile>
): Promise<IUserDocument> => {
	try {
		const user = await User.findById(userId);
		if (!user) throw new Error("User not found");

		if (profileData.firstName)
			user.profile.firstName = profileData.firstName;
		if (profileData.lastName) user.profile.lastName = profileData.lastName;
		if (profileData.bio !== undefined) user.profile.bio = profileData.bio;
		if (profileData.avatar !== undefined)
			user.profile.avatar = profileData.avatar;
		if (profileData.skills) user.profile.skills = profileData.skills;
		if (profileData.interests)
			user.profile.interests = profileData.interests;
		if (profileData.socialLinks) {
			user.profile.socialLinks = {
				...user.profile.socialLinks,
				...profileData.socialLinks,
			};
		}
		if (profileData.preferences) {
			user.profile.preferences = {
				...user.profile.preferences,
				...profileData.preferences,
			};
		}

		await user.save();
		return user;
	} catch (error: any) {
		throw new Error(`Failed to update profile: ${error.message}`);
	}
};

// Add education
export const addEducation = async (
	userId: string,
	education: IEducation
): Promise<IUserDocument> => {
	try {
		const user = await User.findById(userId);
		if (!user) throw new Error("User not found");

		user.profile.education = user.profile.education || [];
		user.profile.education.push(education);
		await user.save();
		return user;
	} catch (error: any) {
		throw new Error(`Failed to add education: ${error.message}`);
	}
};

// Add experience
export const addExperience = async (
	userId: string,
	experience: IExperience
): Promise<IUserDocument> => {
	try {
		const user = await User.findById(userId);
		if (!user) throw new Error("User not found");

		user.profile.experience = user.profile.experience || [];
		user.profile.experience.push(experience);
		await user.save();
		return user;
	} catch (error: any) {
		throw new Error(`Failed to add experience: ${error.message}`);
	}
};

// Update skills
export const updateSkills = async (
	userId: string,
	skills: string[]
): Promise<IUserDocument> => {
	try {
		const user = await User.findById(userId);
		if (!user) throw new Error("User not found");

		user.profile.skills = skills;
		await user.save();
		return user;
	} catch (error: any) {
		throw new Error(`Failed to update skills: ${error.message}`);
	}
};

// Update interests
export const updateInterests = async (
	userId: string,
	interests: string[]
): Promise<IUserDocument> => {
	try {
		const user = await User.findById(userId);
		if (!user) throw new Error("User not found");

		user.profile.interests = interests;
		await user.save();
		return user;
	} catch (error: any) {
		throw new Error(`Failed to update interests: ${error.message}`);
	}
};

// Search users by skills or interests
export const searchUsers = async (
	query: string,
	currentUserId: string
): Promise<IUserDocument[]> => {
	try {
		const users = await User.find({
			_id: { $ne: currentUserId },
			status: "active",
			$or: [
				{ "profile.skills": { $regex: query, $options: "i" } },
				{ "profile.interests": { $regex: query, $options: "i" } },
				{ "profile.firstName": { $regex: query, $options: "i" } },
				{ "profile.lastName": { $regex: query, $options: "i" } },
			],
		}).limit(20);

		return users;
	} catch (error: any) {
		throw new Error(`Failed to search users: ${error.message}`);
	}
};
