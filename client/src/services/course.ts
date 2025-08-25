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

const enrollInCourse = async (courseId: string): Promise<void> => {
	try {
		await apiClient.post(`/courses/enroll/${courseId}`);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to enroll in course");
	}
};

const enrolledCourses = async (): Promise<ICourse[]> => {
	try {
		const response = await apiClient.get("/courses/enrolled");
		return response.data.data ?? [];
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch enrolled courses");
	}
};

const unenrollFromCourse = async (courseId: string): Promise<void> => {
	try {
		await apiClient.post(`/courses/unenroll/${courseId}`);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to unenroll from course");
	}
};

const updateCourseProgress = async (courseId: string, progress: number) => {
	try {
		await apiClient.put(`/courses/progress/${courseId}`, { progress });
	} catch (error) {
		console.error(error);
		throw new Error("Failed to update course progress");
	}
};

const completedCourses = async (): Promise<ICourse[]> => {
	try {
		const response = await apiClient.get("/courses/completed");
		return response.data.data ?? [];
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch completed courses");
	}
};

export const courseService = {
	deleteCourse,
	updateCourse,
	getCourseById,
	getCourses,
	createCourse,
	enrollInCourse,
	enrolledCourses,
	unenrollFromCourse,
	updateCourseProgress,
	completedCourses,
};
