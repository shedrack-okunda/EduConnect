import React, { useEffect, useState } from "react";
import { CourseForm } from "./CourseForm";
import { Pencil, Trash2, Play, Star } from "lucide-react";
import type { ICourse } from "../../../../shared/types";
import { courseService } from "../../services/course";

export const CourseDashboard: React.FC = () => {
	const [courses, setCourses] = useState<ICourse[]>([]);
	const [editingCourse, setEditingCourse] = useState<ICourse | null>(null);
	const [showForm, setShowForm] = useState(false);

	const fetchCourses = async () => {
		try {
			const data = await courseService.getCourses();
			setCourses(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Error fetching courses:", error);
			setCourses([]);
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	const handleEdit = (course: ICourse) => {
		setEditingCourse(course);
		setShowForm(true);
	};

	const handleDelete = async (courseId: string) => {
		try {
			await courseService.deleteCourse(courseId);
			fetchCourses();
		} catch (error) {
			console.error("Failed to delete course:", error);
		}
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-900 text-white p-6">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">My Courses</h2>
				<button
					className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow"
					onClick={() => {
						setEditingCourse(null);
						setShowForm(true);
					}}>
					+ Add Course
				</button>
			</div>

			{/* Grid of Courses */}
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{courses.map((course) => (
					<div
						key={course._id}
						className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
						{/* Preview Image */}
						<div className="relative">
							<img
								src={
									course.language ||
									"https://via.placeholder.com/400x200"
								}
								alt={course.title}
								className="w-full h-40 object-cover"
							/>
							<div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
									<Play className="w-6 h-6 ml-1" />
								</div>
							</div>
							<div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
								{course.duration || "N/A"}
							</div>
						</div>

						{/* Course Info */}
						<div className="p-4">
							<h3 className="font-semibold mb-2 group-hover:text-purple-300 transition-colors">
								{course.title}
							</h3>
							<p className="text-gray-400 text-sm mb-3">
								{course.description ||
									"No description provided."}
							</p>

							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center space-x-1">
									<Star className="w-4 h-4 text-yellow-400 fill-current" />
									<span className="text-sm">
										{course.rating || "N/A"}
									</span>
								</div>
								<span className="text-sm text-gray-400">
									{course.category || "Uncategorized"}
								</span>
							</div>

							{/* Edit/Delete Actions */}
							<div className="flex gap-3 pt-2">
								<button
									onClick={() => handleEdit(course)}
									className="flex items-center gap-1 px-3 py-1 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition">
									<Pencil size={18} /> Edit
								</button>
								<button
									onClick={() => handleDelete(course._id)}
		className="flex items-center gap-1 px-3 py-1 rounded bg-gradient-to-r from-red-600 to-pink-600 text-white hover:opacity-90 transition">
									<Trash2 size={18} /> Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Modal Form */}
			{showForm && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
					<div className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-6 w-full max-w-xl border border-white/20 shadow-xl relative">
						<button
							className="absolute top-3 right-3 text-gray-400 hover:text-white"
							onClick={() => setShowForm(false)}>
							✕
						</button>
						<CourseForm
							existingCourse={editingCourse}
							onSuccess={() => {
								setShowForm(false);
								fetchCourses();
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
