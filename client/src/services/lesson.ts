import type { ILesson, ILessonDTO } from "../../../shared/types";
import { apiClient } from "../utils/api";

const createLesson = async (lessonData: ILessonDTO): Promise<ILesson> => {
	try {
		const response = await apiClient.post("/lessons", lessonData);
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create lesson");
	}
};

const getLessonsByModule = async (moduleId: string): Promise<ILesson[]> => {
	try {
		const response = await apiClient.get(`/lessons/module/${moduleId}`);
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch lessons");
	}
};

const updateLesson = async (
	lessonId: string,
	lessonData: Partial<ILessonDTO>
): Promise<ILesson> => {
	try {
		const response = await apiClient.put(
			`/lessons/lesson/${lessonId}`,
			lessonData
		);
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to update lesson");
	}
};

const deleteLesson = async (lessonId: string): Promise<void> => {
	try {
		await apiClient.delete(`/lessons/lesson/${lessonId}`);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to delete lesson");
	}
};

export const lessonService = {
	createLesson,
	getLessonsByModule,
	updateLesson,
	deleteLesson,
};
