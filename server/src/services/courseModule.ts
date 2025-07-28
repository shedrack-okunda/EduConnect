import { CourseModule } from "../models/CourseModule";
import type { ICourseModule, ICourseModuleDTO } from "../types";

// Create module
export const createCourseModule = async (
	moduleData: ICourseModuleDTO
): Promise<ICourseModule> => {
	try {
		const module = new CourseModule(moduleData);
		await module.save();
		return module;
	} catch (error: any) {
		throw new Error(`Failed to create module: ${error.message}`);
	}
};

// Get modules by course
export const getModulesByCourse = async (
	courseId: string
): Promise<ICourseModule[]> => {
	try {
		return await CourseModule.find({ course: courseId }).populate(
			"lessons"
		);
	} catch (error: any) {
		throw new Error(`Failed to fetch modules: ${error.message}`);
	}
};

// Update module
export const updateCourseModule = async (
	moduleId: string,
	updates: Partial<ICourseModule>
): Promise<ICourseModule> => {
	try {
		const module = await CourseModule.findByIdAndUpdate(moduleId, updates, {
			new: true,
		});
		if (!module) throw new Error("Module not found");
		return module;
	} catch (error: any) {
		throw new Error(`Failed to update module: ${error.message}`);
	}
};

// Delete module
export const deleteCourseModule = async (moduleId: string): Promise<void> => {
	try {
		const deleted = await CourseModule.findByIdAndDelete(moduleId);
		if (!deleted) throw new Error("Module not found");
	} catch (error: any) {
		throw new Error(`Failed to delete module: ${error.message}`);
	}
};
