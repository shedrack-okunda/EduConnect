import { Schema, model, Document } from "mongoose";
import type { ICourse } from "../types";

export interface ICourseDocument extends ICourse, Document {}

const CourseSchema = new Schema<ICourseDocument>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		instructorId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		coInstructors: [{ type: Schema.Types.ObjectId, ref: "User" }],

		category: { type: String, required: true },
		subcategory: { type: String },
		level: {
			type: String,
			enum: ["beginner", "intermediate", "advanced"],
			required: true,
		},
		language: { type: String, required: true },
		duration: { type: Number, required: true },

		modules: [{ type: Schema.Types.ObjectId, ref: "CourseModule" }],
		totalLessons: { type: Number, default: 0 },
		totalDuration: { type: Number, default: 0 },

		thumbnail: { type: String, required: true },
		previewVideo: { type: String },

		status: {
			type: String,
			enum: ["draft", "published", "archived"],
			default: "draft",
		},
		isPublic: { type: Boolean, default: false },
		publishedAt: { type: Date },

		prerequisites: [{ type: String }],
		learningOutcomes: [{ type: String }],
		targetAudience: [{ type: String }],

		enrollmentCount: { type: Number, default: 0 },
		rating: { type: Number, default: 0 },
		reviewCount: { type: Number, default: 0 },

		tags: [{ type: String }],
		slug: { type: String, required: true, unique: true },
	},
	{ timestamps: true }
);

export const Course = model<ICourseDocument>("Course", CourseSchema);
