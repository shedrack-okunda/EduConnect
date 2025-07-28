import { Types } from "mongoose";
import type { IUserDocument } from "../models/User";

// Base User Interface
export interface IUser {
	email: string;
	password: string;
	role: UserRole;
	status: UserStatus;
	profile: IUserProfile;
	createdAt: Date;
	updatedAt: Date;
}

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
	startDate: string;
	endDate?: string;
	current: boolean;
}

// Experience Interface
export interface IExperience {
	company: string;
	position: string;
	description?: string;
	startDate: string;
	endDate?: string;
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

declare global {
	namespace Express {
		interface Request {
			user?: IUserDocument;
		}
	}
}

// Course interface
export interface ICourse {
	title: string;
	description: string;
	instructorId: Types.ObjectId;
	coInstructors?: Types.ObjectId[];
	category: string;
	subcategory?: string;
	level: "beginner" | "intermediate" | "advanced";
	language: string;
	duration: number;
	modules: Types.ObjectId[];
	totalLessons: number;
	totalDuration: number;
	thumbnail: string;
	previewVideo?: string;
	status: "draft" | "published" | "archived";
	isPublic: boolean;
	publishedAt?: Date;
	prerequisites: string[];
	learningOutcomes: string[];
	targetAudience: string[];
	enrollmentCount: number;
	rating: number;
	reviewCount: number;
	tags: string[];
	slug: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICourseModule {
	courseId: Types.ObjectId;
	title: string;
	description: string;
	order: number;
	lessons: Types.ObjectId[];
	duration: number;
	isPreview: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ILesson {
	moduleId: Types.ObjectId;
	title: string;
	description: string;
	order: number;
	type: "video" | "text" | "quiz" | "assignment" | "resource";
	content: ILessonContent;
	duration: number;
	isPreview: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ILessonContent {
	videoUrl?: string;
	videoThumbnail?: string;
	textContent?: string;
	questions?: IQuizQuestion[];
	instructions?: string;
	submissionType?: "text" | "file" | "url";
	resources?: IResource[];
}

export interface IQuizQuestion {
	question: string;
	options: string[];
	correctAnswerIndex: number;
}

export interface IResource {
	title: string;
	url: string;
}

// Course DTO's
export interface ICourseDTO {
	title: string;
	description: string;
	instructorId: Types.ObjectId;
	coInstructors?: Types.ObjectId[];
	category: string;
	subcategory?: string;
	level: "beginner" | "intermediate" | "advanced";
	language: string;
	duration: number;
	thumbnail?: string;
	previewVideo?: string;
	prerequisites: string[];
	learningOutcomes: string[];
	targetAudience: string[];
	tags: string[];
	slug: string;
	isPublic: boolean;
	status: "draft" | "published" | "archived";
}

export interface ICourseModuleDTO {
	courseId: Types.ObjectId;
	title: string;
	description: string;
	order: number;
	isPreview: boolean;
}

export interface ILessonDTO {
	moduleId: Types.ObjectId;
	title: string;
	description: string;
	order: number;
	type: "video" | "text" | "quiz" | "assignment" | "resource";
	duration: number;
	isPreview: boolean;
	content: ILessonContent;
}
