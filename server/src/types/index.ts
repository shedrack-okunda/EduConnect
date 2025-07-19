// User Role Enum
export enum UserRole {
	STUDENT = "student",
	EDUCATOR = "educator",
	ADMIN = "admin",
}

// User Status Enum
export enum UserStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
	PENDING = "pending",
	SUSPENDED = "suspended",
}

// Base User Interface
export interface IUser {
	_id: string;
	email: string;
	password: string;
	role: UserRole;
	status: UserStatus;
	profile: IUserProfile;
	createdAt: Date;
	updatedAt: Date;
}

// User Profile Interface
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

// Education Interface
export interface IEducation {
	institution: string;
	degree: string;
	fieldOfStudy: string;
	startDate: Date;
	endDate?: Date;
	current: boolean;
}

// Experience Interface
export interface IExperience {
	company: string;
	position: string;
	description?: string;
	startDate: Date;
	endDate?: Date;
	current: boolean;
}

// Social Links Interface
export interface ISocialLinks {
	linkedin?: string;
	github?: string;
	twitter?: string;
	website?: string;
}

// User Preferences Interface
export interface IUserPreferences {
	notifications: {
		email: boolean;
		push: boolean;
		marketing: boolean;
	};
	privacy: {
		profileVisibility: "public" | "private" | "connections";
		showEmail: boolean;
	};
	theme: "light" | "dark" | "system";
}

// Authentication DTOs
export interface IRegisterDTO {
	email: string;
	password: string;
	role: UserRole;
	profile: {
		firstName: string;
		lastName: string;
	};
}

export interface ILoginDTO {
	email: string;
	password: string;
}

export interface IAuthResponse {
	user: IUser;
	token: string;
	refreshToken: string;
}
