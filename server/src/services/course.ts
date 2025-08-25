import { Course, ICourseDocument } from "../models/Course";
import { User } from "../models/User";
import type { ICourse, ICourseDTO } from "../types";

// Create a course
export const createCourse = async (
	courseData: ICourseDTO,
	educatorId: string
): Promise<ICourse> => {
	try {
		const course = new Course({ ...courseData, instructorId: educatorId });
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
		const filter = educatorId ? { instructorId: educatorId } : {};
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

export const enrollInCourse = async (
	studentId: string,
	courseId: string
): Promise<ICourse> => {
	try {
		const course = await Course.findById(courseId);
		if (!course) throw new Error("Course not found");

		const user = await User.findById(studentId);
		if (!user) throw new Error("Student not found");

		// Prevent duplicate enrollment
		if (user.enrolledCourses.some((id) => id.toString() === courseId)) {
			throw new Error("Already enrolled in this course");
		}

		user.enrolledCourses.push(courseId);
		await user.save();

		return course.toObject();
	} catch (error: any) {
		throw new Error(`Enrollment failed: ${error.message}`);
	}
};

// Unenroll
export const unenrollFromCourse = async (
	studentId: string,
	courseId: string
) => {
	const user = await User.findById(studentId);
	if (!user) throw new Error("Student not found");

	user.enrolledCourses = user.enrolledCourses.filter(
		(c: any) => c.courseId.toString() !== courseId
	);
	await user.save();
	return true;
};

// Update progress
export const updateCourseProgress = async (
	studentId: string,
	courseId: string,
	progress: number
) => {
	const user = await User.findById(studentId);
	if (!user) throw new Error("Student not found");

	const courseProgress: any = user.enrolledCourses.find(
		(c: any) => c.courseId.toString() === courseId
	);
	if (!courseProgress) throw new Error("Not enrolled in this course");

	courseProgress.progress = progress;
	if (progress >= 100) {
		courseProgress.status = "completed";
	}

	await user.save();
	return courseProgress;
};

// Completed courses
export const getCompletedCourses = async (studentId: string) => {
	const user = await User.findById(studentId).populate(
		"enrolledCourses.courseId"
	);
	if (!user) throw new Error("Student not found");

	return user.enrolledCourses.filter((c: any) => c.status === "completed");
};
