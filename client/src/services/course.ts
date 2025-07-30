import type { ICourse, ICourseDTO } from "../../../shared/types";
import { apiClient } from "../utils/api";

const createCourse = async (courseData: ICourseDTO): Promise<ICourse> => {
	try {
		const response = await apiClient.post("/courses", courseData);
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create course");
	}
};

const getCourses = async (): Promise<ICourse[]> => {
	try {
		const response = await apiClient.get("/courses");
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch courses");
	}
};

const getCourseById = async (courseId: string): Promise<ICourse> => {
	try {
		const response = await apiClient.get(`/courses/course/${courseId}`);
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch course details");
	}
};

const updateCourse = async (
	courseId: string,
	courseData: Partial<ICourseDTO>
): Promise<ICourse> => {
	try {
		const response = await apiClient.put(
			`/courses/course/${courseId}`,
			courseData
		);
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to update course");
	}
};

const deleteCourse = async (courseId: string): Promise<void> => {
	try {
		await apiClient.delete(`/courses/course/${courseId}`);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to delete course");
	}
};

export const courseService = {
	deleteCourse,
	updateCourse,
	getCourseById,
	getCourses,
	createCourse,
};
