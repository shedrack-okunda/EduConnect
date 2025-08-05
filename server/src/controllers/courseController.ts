import { Request, Response } from "express";
import {
	createCourse,
	getCourses,
	getCourseById,
	updateCourse,
	deleteCourse,
} from "../services/course";
import { ICourseDTO, IUser, UserRole } from "../types";
import { Course } from "../models/Course";

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
