import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { lessonService } from "../../services/lesson";
import { LessonForm } from "./LessonForm";
import type { ILesson } from "../../../../shared/types";

interface LessonDashboardProps {
	moduleId: string;
}

export const LessonDashboard: React.FC<LessonDashboardProps> = ({
	moduleId,
}) => {
	const [lessons, setLessons] = useState<ILesson[]>([]);
	const [editingLesson, setEditingLesson] = useState<ILesson | null>(null);
	const [showForm, setShowForm] = useState(false);

	const fetchLessons = async () => {
		try {
			const data = await lessonService.getLessonsByModule(moduleId);
			setLessons(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Error fetching lessons:", error);
			setLessons([]);
		}
	};

	useEffect(() => {
		if (moduleId) {
			fetchLessons();
		}
		fetchLessons();
	}, [moduleId]);

	const handleEdit = (lesson: ILesson) => {
		setEditingLesson(lesson);
		setShowForm(true);
	};

	const handleDelete = async (lessonId: string) => {
		try {
			await lessonService.deleteLesson(lessonId);
			fetchLessons();
		} catch (error) {
			console.error("Failed to delete lesson:", error);
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">Lessons</h2>
				<button
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
					onClick={() => {
						setEditingLesson(null);
						setShowForm(true);
					}}>
					+ Add Lesson
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{lessons.map((lesson) => (
					<div
						key={lesson._id}
						className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300">
						<h3 className="text-lg font-semibold mb-2">
							{lesson.title}
						</h3>
						<p className="text-gray-600 mb-2 line-clamp-3">
							{lesson.description}
						</p>
						<p className="text-sm text-gray-400 mb-1">
							Type: {lesson.type}
						</p>
						<p className="text-sm text-gray-400 mb-1">
							Order: {lesson.order}
						</p>
						<p className="text-sm text-gray-400 mb-3">
							Preview: {lesson.isPreview ? "Yes" : "No"}
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => handleEdit(lesson)}
								className="text-blue-500 hover:text-blue-700">
								<Pencil size={20} />
							</button>
							<button
								onClick={() => handleDelete(lesson._id)}
								className="text-red-500 hover:text-red-700">
								<Trash2 size={20} />
							</button>
						</div>
					</div>
				))}
			</div>

			{showForm && (
				<div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-[9999]">
					<div className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-6 w-full max-w-xl border border-white/20 shadow-xl relative">
						<button
							className="absolute top-3 right-3 text-gray-500 hover:text-black"
							onClick={() => setShowForm(false)}>
							✕
						</button>
						<LessonForm
							existingLesson={editingLesson ?? undefined}
							onSuccess={() => {
								setShowForm(false);
								fetchLessons();
							}}
							moduleId={moduleId}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
