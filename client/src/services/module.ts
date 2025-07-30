import type { ICourseModule, ICourseModuleDTO } from "../../../shared/types";
import { apiClient } from "../utils/api";

const createModule = async (
	moduleData: ICourseModuleDTO
): Promise<ICourseModule> => {
	try {
		const response = await apiClient.post("/modules", moduleData);
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create module");
	}
};

const getModulesByCourse = async (
	courseId: string
): Promise<ICourseModule[]> => {
	try {
		const response = await apiClient.get(`/modules/course/${courseId}`);
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch modules");
	}
};

const updateModule = async (
	moduleId: string,
	moduleData: Partial<ICourseModuleDTO>
): Promise<ICourseModule> => {
	try {
		const response = await apiClient.put(
			`/modules/module/${moduleId}`,
			moduleData
		);
		return response.data.data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to update module");
	}
};

const deleteModule = async (moduleId: string): Promise<void> => {
	try {
		await apiClient.delete(`/modules/module/${moduleId}`);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to delete module");
	}
};

export const moduleService = {
	createModule,
	getModulesByCourse,
	updateModule,
	deleteModule,
};
