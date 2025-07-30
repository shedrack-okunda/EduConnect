import React, { useEffect, useState } from "react";
import { ModuleForm } from "./ModuleForm";
import { Pencil, Trash2 } from "lucide-react";
import type { ICourseModule } from "../../../../shared/types";
import { moduleService } from "../../services/module";

interface ModuleDashboardProps {
	courseId: string;
	onModuleSelect?: (id: string) => void;
}

export const ModuleDashboard: React.FC<ModuleDashboardProps> = ({
	courseId,
	onModuleSelect,
}) => {
	const [modules, setModules] = useState<ICourseModule[]>([]);
	const [editingModule, setEditingModule] = useState<ICourseModule | null>(
		null
	);
	const [showForm, setShowForm] = useState(false);

	const fetchModules = async () => {
		try {
			const data = await moduleService.getModulesByCourse(courseId);
			setModules(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Error fetching modules:", error);
			setModules([]);
		}
	};

	useEffect(() => {
		fetchModules();
	}, [courseId]);

	const handleEdit = (module: ICourseModule) => {
		setEditingModule(module);
		setShowForm(true);
	};

	const handleDelete = async (moduleId: string) => {
		try {
			await moduleService.deleteModule(moduleId);
			fetchModules();
		} catch (error) {
			console.error("Failed to delete module:", error);
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">Modules</h2>
				<button
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
					onClick={() => {
						setEditingModule(null);
						setShowForm(true);
					}}>
					+ Add Module
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{modules.map((mod) => (
					<div
						key={mod._id}
						className="bg-white shadow-md rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300">
						<h3 className="text-lg font-semibold mb-2">
							{mod.title}
							<button onClick={() => onModuleSelect?.(mod._id)}>
								View Lessons
							</button>
						</h3>
						<p className="text-gray-600 mb-2 line-clamp-3">
							{mod.description}
						</p>
						<p className="text-sm text-gray-400 mb-1">
							Order: {mod.order}
						</p>
						<p className="text-sm text-gray-400 mb-3">
							Preview: {mod.isPreview ? "Yes" : "No"}
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => handleEdit(mod)}
								className="text-blue-500 hover:text-blue-700">
								<Pencil size={20} />
							</button>
							<button
								onClick={() => handleDelete(mod._id)}
								className="text-red-500 hover:text-red-700">
								<Trash2 size={20} />
							</button>
						</div>
					</div>
				))}
			</div>

			{showForm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
					<div className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-6 w-full max-w-xl border border-white/20 shadow-xl relative">
						<button
							className="absolute top-3 right-3 text-gray-500 hover:text-black"
							onClick={() => setShowForm(false)}>
							✕
						</button>
						<ModuleForm
							existingModule={editingModule ?? undefined}
							onSuccess={() => {
								setShowForm(false);
								fetchModules();
							}}
							courseId={courseId}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
