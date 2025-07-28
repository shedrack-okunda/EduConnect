import { Lesson } from "../models/Lesson";
import type { ILesson, ILessonDTO } from "../types";

// Create lesson
export const createLesson = async (
	lessonData: ILessonDTO
): Promise<ILesson> => {
	try {
		const lesson = new Lesson(lessonData);
		await lesson.save();
		return lesson;
	} catch (error: any) {
		throw new Error(`Failed to create lesson: ${error.message}`);
	}
};

// Get lessons by module
export const getLessonsByModule = async (
	moduleId: string
): Promise<ILesson[]> => {
	try {
		return await Lesson.find({ module: moduleId });
	} catch (error: any) {
		throw new Error(`Failed to fetch lessons: ${error.message}`);
	}
};

// Update lesson
export const updateLesson = async (
	lessonId: string,
	updates: Partial<ILesson>
): Promise<ILesson> => {
	try {
		const lesson = await Lesson.findByIdAndUpdate(lessonId, updates, {
			new: true,
		});
		if (!lesson) throw new Error("Lesson not found");
		return lesson;
	} catch (error: any) {
		throw new Error(`Failed to update lesson: ${error.message}`);
	}
};

// Delete lesson
export const deleteLesson = async (lessonId: string): Promise<void> => {
	try {
		const deleted = await Lesson.findByIdAndDelete(lessonId);
		if (!deleted) throw new Error("Lesson not found");
	} catch (error: any) {
		throw new Error(`Failed to delete lesson: ${error.message}`);
	}
};
