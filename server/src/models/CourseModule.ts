import { Schema, model, Document } from "mongoose";
import { ICourseModule } from "../types";

export interface ICourseModuleDocument extends ICourseModule, Document {}

const CourseModuleSchema = new Schema<ICourseModuleDocument>(
	{
		courseId: {
			type: Schema.Types.ObjectId,
			ref: "Course",
			required: true,
		},
		title: { type: String, required: true },
		description: { type: String },
		order: { type: Number, required: true },
		lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
		duration: { type: Number, default: 0 },
		isPreview: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const CourseModule = model<ICourseModuleDocument>(
	"CourseModule",
	CourseModuleSchema
);
