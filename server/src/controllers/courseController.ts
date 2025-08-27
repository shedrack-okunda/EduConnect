import { Request, Response } from "express";
import {
	createCourse,
	getCourses,
	getCourseById,
	updateCourse,
	deleteCourse,
	enrollInCourse,
	updateCourseProgress,
	getCompletedCourses,
	unenrollFromCourse,
	getCourseEnrollments,
} from "../services/course";
import { ICourseDTO, IUser, UserRole } from "../types";
import { Course } from "../models/Course";
import { User } from "../models/User";

// Create new course
export const createCourseController = async (req: Request, res: Response) => {
	try {
		const courseData: ICourseDTO = req.body;
		const educatorId = req.user?._id;

		if (!educatorId) throw new Error("Educator ID not found");

		const course = await createCourse(courseData, educatorId);
		res.status(201).json({
			success: true,
			message: "Course created successfully",
			data: course,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Get all courses
export const getCoursesController = async (req: Request, res: Response) => {
	try {
		// Optionally: check user's role
		const user = req.user as IUser; // if using auth middleware

		let query = Course.find().sort({ createdAt: -1 });

		// Only populate if the requester is a student
		if (user?.role === UserRole.STUDENT) {
			query = query.populate("instructorId", "profile");
		}

		const courses = await query;

		res.status(200).json({
			success: true,
			message: "Courses retrieved successfully",
			data: courses,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Get single course
export const getCourseByIdController = async (req: Request, res: Response) => {
	try {
		const { courseId } = req.params;
		const course = await getCourseById(courseId);
		res.status(200).json({
			success: true,
			message: "Course retrieved successfully",
			data: course,
		});
	} catch (error: any) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

// Update course
export const updateCourseController = async (req: Request, res: Response) => {
	try {
		const { courseId } = req.params;
		const courseData: Partial<ICourseDTO> = req.body;

		const updated = await updateCourse(courseId, courseData);
		res.status(200).json({
			success: true,
			message: "Course updated successfully",
			data: updated,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Delete course
export const deleteCourseController = async (req: Request, res: Response) => {
	try {
		const { courseId } = req.params;
		await deleteCourse(courseId);
		res.status(200).json({
			success: true,
			message: "Course deleted successfully",
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// POST /courses/enroll/:courseId
export const enrollInCourseController = async (req: Request, res: Response) => {
	try {
		const { courseId } = req.params;
		const studentId = req.user?._id;

		if (!studentId) throw new Error("Student ID not found");

		const enrolledCourse = await enrollInCourse(studentId, courseId);

		res.status(200).json({
			success: true,
			message: "Successfully enrolled in course",
			data: enrolledCourse,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// GET /courses/enrolled
export const getEnrolledCoursesController = async (
	req: Request,
	res: Response
) => {
	try {
		const studentId = req.user?._id;
		if (!studentId) throw new Error("Student ID not found");

		const user = await User.findById(studentId).populate("enrolledCourses");

		if (!user) throw new Error("Student not found");

		res.status(200).json({
			success: true,
			message: "Enrolled courses retrieved successfully",
			data: user.enrolledCourses,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// POST /courses/unenroll/:courseId
export const unenrollFromCourseController = async (
	req: Request,
	res: Response
) => {
	try {
		const { courseId } = req.params;
		const studentId = req.user?._id;

		if (!studentId) throw new Error("Student ID not found");

		await unenrollFromCourse(studentId, courseId);

		res.status(200).json({
			success: true,
			message: "Successfully unenrolled from course",
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// PUT /courses/progress/:courseId
export const updateCourseProgressController = async (
	req: Request,
	res: Response
) => {
	try {
		const { courseId } = req.params;
		const { progress } = req.body;
		const studentId = req.user?._id;

		if (!studentId) throw new Error("Student ID not found");

		const updated = await updateCourseProgress(
			studentId,
			courseId,
			progress
		);

		res.status(200).json({
			success: true,
			message: "Course progress updated",
			data: updated,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// GET /courses/completed
export const getCompletedCoursesController = async (
	req: Request,
	res: Response
) => {
	try {
		const studentId = req.user?._id;
		if (!studentId) throw new Error("Student ID not found");

		const completed = await getCompletedCourses(studentId);

		res.status(200).json({
			success: true,
			message: "Completed courses retrieved successfully",
			data: completed,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

export const getCourseEnrollmentsController = async (
	req: Request,
	res: Response
) => {
	try {
		const { courseId } = req.params;
		const educatorId = req.user?._id;

		if (!educatorId) throw new Error("Educator ID not found");

		// Optionally: ensure educator owns this course
		const course = await Course.findById(courseId);
		if (!course) throw new Error("Course not found");
		if (course.instructorId.toString() !== educatorId.toString()) {
			return res.status(403).json({
				success: false,
				message:
					"You are not authorized to view this course's enrollments",
			});
		}

		const enrollments = await getCourseEnrollments(courseId);

		res.status(200).json({
			success: true,
			message: "Course enrollments retrieved successfully",
			data: enrollments,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
