import { Request, Response } from "express";
import {
	createLesson,
	getLessonsByModule,
	updateLesson,
	deleteLesson,
} from "../services/lesson";
import { ILessonDTO } from "../types";
import mongoose from "mongoose";

// Create lesson
export const createLessonController = async (req: Request, res: Response) => {
	try {
		const lessonData = req.body;
		const castedLessonData: ILessonDTO = {
			...lessonData,
			moduleId: new mongoose.Types.ObjectId(lessonData.moduleId),
		};

		const lesson = await createLesson(castedLessonData);

		res.status(201).json({
			success: true,
			message: "Lesson created successfully",
			data: lesson,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Get lessons by module
export const getLessonsByModuleController = async (
	req: Request,
	res: Response
) => {
	try {
		const { moduleId } = req.params;
		const lessons = await getLessonsByModule(moduleId);

		res.status(200).json({
			success: true,
			message: "Lessons retrieved successfully",
			data: lessons,
		});
	} catch (error: any) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

// Update lesson
export const updateLessonController = async (req: Request, res: Response) => {
	try {
		const { lessonId } = req.params;
		const lessonData: Partial<ILessonDTO> = req.body;

		const updated = await updateLesson(lessonId, lessonData);
		res.status(200).json({
			success: true,
			message: "Lesson updated successfully",
			data: updated,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Delete lesson
export const deleteLessonController = async (req: Request, res: Response) => {
	try {
		const { lessonId } = req.params;
		await deleteLesson(lessonId);

		res.status(200).json({
			success: true,
			message: "Lesson deleted successfully",
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
