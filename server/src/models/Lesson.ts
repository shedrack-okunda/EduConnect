import { Schema, model, Document } from "mongoose";
import { ILesson, ILessonContent } from "../types";

export interface ILessonDocument extends ILesson, Document {}

const LessonContentSchema = new Schema<ILessonContent>(
	{
		videoUrl: { type: String },
		videoThumbnail: { type: String },
		textContent: { type: String },
		questions: [
			{
				question: { type: String, required: true },
				options: [{ type: String, required: true }],
				correctAnswerIndex: { type: Number, required: true },
			},
		],
		instructions: { type: String },
		submissionType: {
			type: String,
			enum: ["text", "file", "url"],
		},
		resources: [
			{
				title: { type: String, required: true },
				url: { type: String, required: true },
			},
		],
	},
	{ _id: false }
);

const LessonSchema = new Schema<ILessonDocument>(
	{
		moduleId: {
			type: Schema.Types.ObjectId,
			ref: "CourseModule",
			required: true,
			set: (value: string) => new Schema.Types.ObjectId(value),
		},
		title: { type: String, required: true },
		description: { type: String },
		order: { type: Number, required: true },
		type: {
			type: String,
			enum: ["video", "text", "quiz", "assignment", "resource"],
			required: true,
		},
		// content: { type: LessonContentSchema },
		duration: { type: Number, required: true },
		isPreview: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const Lesson = model<ILessonDocument>("Lesson", LessonSchema);
