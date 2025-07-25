import type {
	IEducation,
	IExperience,
	ISocialLinks,
	IUserPreferences,
} from "../../../shared/types/index";

// Mirror backend types for frontend use
export enum UserRole {
	STUDENT = "student",
	EDUCATOR = "educator",
	ADMIN = "admin",
}

export enum UserStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
	PENDING = "pending",
	SUSPENDED = "suspended",
}

export interface IUser {
	email: string;
	role: UserRole;
	status: UserStatus;
	profile: IUserProfile;
}

export interface IUserProfile {
	firstName: string;
	lastName: string;
	avatar?: string;
	bio?: string;
	skills: string[];
	interests: string[];
	education?: IEducation[];
	experience?: IExperience[];
	socialLinks?: ISocialLinks;
	preferences?: IUserPreferences;
}
