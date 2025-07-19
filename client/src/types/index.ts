import type { IEducation, IExperience, ISocialLinks, IUserPreferences } from '../../../server/src/types/index';
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
	_id: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	profile: IUserProfile;
	createdAt: string;
	updatedAt: string;
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
