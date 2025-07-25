import type { IEducation, IExperience } from "../../../shared/types";
import type { IUser, IUserProfile } from "../types";
import { apiClient } from "../utils/api";

class ProfileService {
	// Get user profile
	async getProfile(): Promise<IUser> {
		try {
			const response = await apiClient.get("/profile/me");
			return response.data.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to get profile");
		}
	}

	// Update profile
	async updateProfile(profileData: Partial<IUserProfile>): Promise<IUser> {
		try {
			const response = await apiClient.put("/profile", profileData);
			return response.data.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to update profile");
		}
	}

	// Update skills
	async updateSkills(skills: string[]): Promise<IUser> {
		try {
			const response = await apiClient.put("/profile/skills", { skills });
			return response.data.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to update skills");
		}
	}

	// Update interests
	async updateInterests(interests: string[]): Promise<IUser> {
		try {
			const response = await apiClient.put("/profile/interests", {
				interests,
			});
			return response.data.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to update interests");
		}
	}

	// Replace entire education array
	async updateEducation(education: IEducation[]): Promise<IUser> {
		try {
			const response = await apiClient.put("/profile/education", {
				education,
			});
			return response.data.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to update education");
		}
	}

	// Add experience
	async updateExperience(experience: IExperience[]): Promise<IUser> {
		try {
			const response = await apiClient.put("/profile/experience", {
				experience,
			});
			return response.data.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to add experience");
		}
	}

	// Search users
	async searchUsers(query: string): Promise<IUser[]> {
		try {
			const response = await apiClient.get(
				`/profile/search?q=${encodeURIComponent(query)}`
			);
			return response.data.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to search users");
		}
	}
}

export const profileService = new ProfileService();
