import { Course } from "../models/Course";
import type { ICourse, ICourseDTO } from "../types";

// Create a course
export const createCourse = async (
	courseData: ICourseDTO,
	educatorId: string
): Promise<ICourse> => {
	try {
		const course = new Course({ ...courseData, eductor: educatorId });
		await course.save();
		return course;
	} catch (error: any) {
		throw new Error(`Failed to create course: ${error.message}`);
	}
};

// Get a single course
export const getCourseById = async (courseId: string): Promise<ICourse> => {
	try {
		const course = await Course.findById(courseId).populate("educator");
		if (!course) throw new Error("Course not found");
		return course;
	} catch (error: any) {
		throw new Error(`Failed to fetch course: ${error.message}`);
	}
};

// Get all courses (optionally by educator)
export const getCourses = async (educatorId?: string): Promise<ICourse[]> => {
	try {
		const filter = educatorId ? { educator: educatorId } : {};
		return await Course.find(filter).sort({ createdAt: -1 });
	} catch (error: any) {
		throw new Error(`Failed to fetch courses: ${error.message}`);
	}
};

// Update course
export const updateCourse = async (
	courseId: string,
	updates: Partial<ICourse>
): Promise<ICourse> => {
	try {
		const course = await Course.findByIdAndUpdate(courseId, updates, {
			new: true,
		});
		if (!course) throw new Error("Course not found");
		return course;
	} catch (error: any) {
		throw new Error(`Failed to update course: ${error.message}`);
	}
};

// Delete course
export const deleteCourse = async (courseId: string): Promise<void> => {
	try {
		const deleted = await Course.findByIdAndDelete(courseId);
		if (!deleted) throw new Error("Course not found");
	} catch (error: any) {
		throw new Error(`Failed to delete course: ${error.message}`);
	}
};
