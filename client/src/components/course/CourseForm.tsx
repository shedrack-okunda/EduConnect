import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ICourse, ICourseDTO } from "../../../../shared/types";
import { courseService } from "../../services/course";

interface CourseFormProps {
	course?: ICourse;
	onSuccess: () => void;
	existingCourse?: ICourse | null;
}

export const CourseForm: React.FC<CourseFormProps> = ({
	course,
	onSuccess,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ICourseDTO>();

	useEffect(() => {
		if (course) {
			const {
				title,
				description,
				category,
				level,
				language,
				duration,
				slug,
			} = course;

			reset({
				title,
				description,
				category,
				level,
				language,
				duration,
				slug,
			});
		} else {
			reset();
		}
	}, [course, reset]);

	const onSubmit = async (data: ICourseDTO) => {
		try {
			if (course) {
				await courseService.updateCourse(course._id, data);
			} else {
				await courseService.createCourse(data);
			}
			onSuccess();
		} catch (error) {
			console.error("Failed to submit course", error);
		}
	};

	return (
		<div className="h-[80vh] overflow-y-auto">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-5xl mx-auto bg-gray-900/60 border border-gray-700 p-6 rounded-xl shadow text-white space-y-6">
				<h2 className="text-lg font-semibold text-purple-300">
					{course ? "Edit Course" : "Create Course"}
				</h2>

				{/* Two-column layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* LEFT COLUMN */}
					<div className="space-y-4">
						{/* Title */}
						<div>
							<label className="block text-sm text-gray-400">
								Title
							</label>
							<input
								{...register("title", {
									required: "Title is required",
								})}
								className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
							/>
							{errors.title && (
								<span className="text-red-500 text-sm">
									{errors.title.message}
								</span>
							)}
						</div>

						{/* Description */}
						<div>
							<label className="block text-sm text-gray-400">
								Description
							</label>
							<textarea
								rows={4}
								{...register("description", {
									required: "Description is required",
								})}
								className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
							/>
							{errors.description && (
								<span className="text-red-500 text-sm">
									{errors.description.message}
								</span>
							)}
						</div>

						{/* Category */}
						<div>
							<label className="block text-sm text-gray-400">
								Category
							</label>
							<input
								{...register("category", {
									required: "Category is required",
								})}
								className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
							/>
							{errors.category && (
								<span className="text-red-500 text-sm">
									{errors.category.message}
								</span>
							)}
						</div>

						{/* Level */}
						<div>
							<label className="block text-sm text-gray-400">
								Level
							</label>
							<select
								{...register("level", {
									required: "Level is required",
								})}
								className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500">
								<option value="">Select level</option>
								<option value="beginner">Beginner</option>
								<option value="intermediate">
									Intermediate
								</option>
								<option value="advanced">Advanced</option>
							</select>
							{errors.level && (
								<span className="text-red-500 text-sm">
									{errors.level.message}
								</span>
							)}
						</div>
					</div>

					{/* RIGHT COLUMN */}
					<div className="space-y-4">
						{/* Language */}
						<div>
							<label className="block text-sm text-gray-400">
								Language
							</label>
							<input
								{...register("language", {
									required: "Language is required",
								})}
								className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
							/>
							{errors.language && (
								<span className="text-red-500 text-sm">
									{errors.language.message}
								</span>
							)}
						</div>

						{/* Duration */}
						<div>
							<label className="block text-sm text-gray-400">
								Duration (minutes)
							</label>
							<input
								type="number"
								{...register("duration", {
									required: "Duration is required",
									valueAsNumber: true,
								})}
								className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
							/>
							{errors.duration && (
								<span className="text-red-500 text-sm">
									{errors.duration.message}
								</span>
							)}
						</div>

						{/* Slug */}
						<div>
							<label className="block text-sm text-gray-400">
								Slug (unique URL identifier)
							</label>
							<input
								{...register("slug", {
									required: "Slug is required",
								})}
								className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
							/>
							{errors.slug && (
								<span className="text-red-500 text-sm">
									{errors.slug.message}
								</span>
							)}
						</div>
					</div>
				</div>

				{/* Submit */}
				<div className="pt-4">
					<button
						type="submit"
						className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition">
						{course ? "Update Course" : "Create Course"}
					</button>
				</div>
			</form>
		</div>
	);
};
