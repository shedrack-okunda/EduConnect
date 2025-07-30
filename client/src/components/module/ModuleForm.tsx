import { useForm } from "react-hook-form";
import { moduleService } from "../../services/module";
import { useEffect } from "react";
import type { ICourseModule, ICourseModuleDTO } from "../../../../shared/types";

interface ModuleFormProps {
	courseId: string;
	onSuccess: () => void;
	existingModule?: ICourseModule | null;
}

export const ModuleForm: React.FC<ModuleFormProps> = ({
	courseId,
	onSuccess,
	existingModule,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ICourseModuleDTO>();

	useEffect(() => {
		if (existingModule) {
			const { title, description, order, isPreview, courseId } =
				existingModule;

			reset({ title, description, order, isPreview, courseId });
		} else {
			reset();
		}
	}, [existingModule, reset, courseId]);

	const onSubmit = async (data: ICourseModuleDTO) => {
		try {
			if (existingModule?._id) {
				await moduleService.updateModule(existingModule._id, data);
			} else {
				await moduleService.createModule({ ...data, courseId });
			}
			onSuccess();
		} catch (err) {
			console.error(err);
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
				<label className="inline-flex items-center">
					<input
						type="checkbox"
						{...register("isPreview")}
						className="mr-2"
					/>
					Preview Lesson
				</label>
			</div>

			<button type="submit" className="btn bg-blue-600 p-3 rounded">
				{existingModule ? "Update Module" : "Add Module"}
			</button>
		</form>
	);
};
