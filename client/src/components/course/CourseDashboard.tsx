import React, { useEffect, useState } from "react";
import { CourseForm } from "./CourseForm";
import { Pencil, Trash2 } from "lucide-react";
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
			setCourses([]); // Prevent undefined
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
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">Courses</h2>
				<button
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
					onClick={() => {
						setEditingCourse(null);
						setShowForm(true);
					}}>
					+ Add Course
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{courses.map((course) => (
					<div
						key={course._id}
						className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300">
						<h3 className="text-lg font-semibold mb-2">
							{course.title}
						</h3>
						<p className="text-gray-600 mb-2 line-clamp-3">
							{course.description}
						</p>
						<p className="text-sm text-gray-400 mb-3">
							Category: {course.category}
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => handleEdit(course)}
								className="text-blue-500 hover:text-blue-700">
								<Pencil size={20} />
							</button>
							<button
								onClick={() => handleDelete(course._id)}
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
