// LessonForm.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ILesson, ILessonDTO } from "../../../../shared/types";
import { lessonService } from "../../services/lesson";

interface LessonFormProps {
	lesson?: ILesson;
	onSuccess: () => void;
	existingLesson?: ILesson | null;
	moduleId: string;
}

export const LessonForm: React.FC<LessonFormProps> = ({
	lesson,
	onSuccess,
	moduleId,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ILessonDTO>();

	useEffect(() => {
		if (lesson) {
			const {
				title,
				description,
				order,
				type,
				duration,
				isPreview,
				content,
				moduleId,
			} = lesson;
			reset({
				title,
				description,
				order,
				type,
				duration,
				isPreview,
				content,
				moduleId,
			});
		} else {
			reset();
		}
	}, [lesson, reset, moduleId]);

	const onSubmit = async (data: ILessonDTO) => {
		try {
			if (lesson) {
				await lessonService.updateLesson(lesson._id, data);
			} else {
				console.log(data);
				await lessonService.createLesson({ ...data, moduleId });
			}
			onSuccess();
		} catch (error) {
			console.error("Failed to submit lesson", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-2 space-y-4 space-x-5">
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

			<div>
				<label className="block">Type</label>
				<select
					{...register("type", { required: "Type is required" })}
					className="text-gray-200 bg-blue-600 border p-2 w-full">
					<option value="">Select type</option>
					<option value="video">Video</option>
					<option value="text">Text</option>
					<option value="quiz">Quiz</option>
					<option value="assignment">Assignment</option>
					<option value="resource">Resource</option>
				</select>
				{errors.type && (
					<span className="text-red-500">{errors.type.message}</span>
				)}
			</div>

			<div>
				<label className="block">Order</label>
				<input
					type="number"
					{...register("order", { required: "Order is required" })}
					className="border p-2 w-full"
				/>
				{errors.order && (
					<span className="text-red-500">{errors.order.message}</span>
				)}
			</div>

			<div>
				<label className="block">Duration (minutes)</label>
				<input
					type="number"
					{...register("duration", {
						required: "Duration is required",
					})}
					className="border p-2 w-full"
				/>
				{errors.duration && (
					<span className="text-red-500">
						{errors.duration.message}
					</span>
				)}
			</div>

			<div>
				<label className="inline-flex items-center">
					<input
						type="checkbox"
						{...register("isPreview")}
						className="mr-2"
					/>
					Preview Lesson
				</label>
			</div>

			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded">
				{lesson ? "Update Lesson" : "Create Lesson"}
			</button>
		</form>
	);
};
