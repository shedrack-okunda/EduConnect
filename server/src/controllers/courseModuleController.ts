import { Request, Response } from "express";
import { ICourseModuleDTO } from "../types";
import {
	createCourseModule,
	deleteCourseModule,
	getModulesByCourse,
	updateCourseModule,
} from "../services/courseModule";

// Create new module
export const createCourseModuleController = async (
	req: Request,
	res: Response
) => {
	try {
		const moduleData: ICourseModuleDTO = req.body;
		const module = await createCourseModule(moduleData);

		res.status(201).json({
			success: true,
			message: "Module created successfully",
			data: module,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Get modules by course
export const getModulesByCourseController = async (
	req: Request,
	res: Response
) => {
	try {
		const { courseId } = req.params;
		const modules = await getModulesByCourse(courseId);

		res.status(200).json({
			success: true,
			message: "Modules retrieved successfully",
			data: modules,
		});
	} catch (error: any) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

// Update module
export const updateCourseModuleController = async (
	req: Request,
	res: Response
) => {
	try {
		const { moduleId } = req.params;
		const moduleData: Partial<ICourseModuleDTO> = req.body;

		const updated = await updateCourseModule(moduleId, moduleData);
		res.status(200).json({
			success: true,
			message: "Module updated successfully",
			data: updated,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Delete module
export const deleteCourseModuleController = async (
	req: Request,
	res: Response
) => {
	try {
		const { moduleId } = req.params;
		await deleteCourseModule(moduleId);

		res.status(200).json({
			success: true,
			message: "Module deleted successfully",
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
