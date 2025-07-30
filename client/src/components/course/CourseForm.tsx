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
		<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 space-y-4 space-x-5">
			{/* Title */}
			<div>
				<label className="block">Title</label>
				<input
					{...register("title", { required: "Title is required" })}
					className="border p-2 w-full"
				/>
				{errors.title && (
					<span className="text-red-500">{errors.title.message}</span>
				)}
			</div>

			{/* Description */}
			<div>
				<label className="block">Description</label>
				<textarea
					{...register("description", {
						required: "Description is required",
					})}
					className="border p-2 w-full"
				/>
				{errors.description && (
					<span className="text-red-500">
						{errors.description.message}
					</span>
				)}
			</div>

			{/* Category */}
			<div>
				<label className="block">Category</label>
				<input
					{...register("category", {
						required: "Category is required",
					})}
					className="border p-2 w-full"
				/>
				{errors.category && (
					<span className="text-red-500">
						{errors.category.message}
					</span>
				)}
			</div>

			{/* Level */}
			<div>
				<label className="block">Level</label>
				<select
					{...register("level", { required: "Level is required" })}
					className="border p-2 w-full text-gray-100 bg-blue-600">
					<option value="">Select level</option>
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
					<option value="advanced">Advanced</option>
				</select>
				{errors.level && (
					<span className="text-red-500">{errors.level.message}</span>
				)}
			</div>

			{/* Language */}
			<div>
				<label className="block">Language</label>
				<input
					{...register("language", {
						required: "Language is required",
					})}
					className="border p-2 w-full"
				/>
				{errors.language && (
					<span className="text-red-500">
						{errors.language.message}
					</span>
				)}
			</div>

			{/* Duration */}
			<div>
				<label className="block">Duration (in minutes)</label>
				<input
					type="number"
					{...register("duration", {
						required: "Duration is required",
						valueAsNumber: true,
					})}
					className="border p-2 w-full"
				/>
				{errors.duration && (
					<span className="text-red-500">
						{errors.duration.message}
					</span>
				)}
			</div>

			{/* Slug */}
			<div>
				<label className="block">Slug (unique URL identifier)</label>
				<input
					{...register("slug", { required: "Slug is required" })}
					className="border p-2 w-full"
				/>
				{errors.slug && (
					<span className="text-red-500">{errors.slug.message}</span>
				)}
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded">
				{course ? "Update Course" : "Create Course"}
			</button>
		</form>
	);
};
