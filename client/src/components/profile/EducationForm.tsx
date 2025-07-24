import React, { useState } from "react";
import type { IEducation } from "../../../../shared/types";

interface EducationFormProps {
	education?: IEducation;
	onSave: (education: IEducation) => void;
	onCancel?: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
	education,
	onSave,
	onCancel,
}) => {
	const [formData, setFormData] = useState<IEducation>({
		institution: education?.institution || "",
		degree: education?.degree || "",
		fieldOfStudy: education?.fieldOfStudy || "",
		startDate: education?.startDate || "",
		endDate: education?.endDate || "",
		current: education?.current || false,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSave(formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4  bg-white p-6 rounded shadow">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium">
						Institution
					</label>
					<input
						type="text"
						name="institution"
						value={formData.institution}
						onChange={handleChange}
						className="w-full border p-2 rounded"
                        placeholder="Institution Name"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">Degree</label>
					<input
						type="text"
						name="degree"
						value={formData.degree}
						onChange={handleChange}
						className="w-full border p-2 rounded"
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium">
						Field of Study
					</label>
					<input
						type="text"
						name="fieldOfStudy"
						value={formData.fieldOfStudy}
						onChange={handleChange}
						className="w-full border p-2 rounded"
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium">
						Start Date
					</label>
					<input
						type="date"
						name="startDate"
						value={formData.startDate}
						onChange={handleChange}
						className="w-full border p-2 rounded"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">
						End Date
					</label>
					<input
						type="date"
						name="endDate"
						value={formData.endDate}
						onChange={handleChange}
						className="w-full border p-2 rounded"
					/>
				</div>
			</div>

			<div className="flex gap-2 justify-end">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
						Cancel
					</button>
				)}
				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
					{education ? "Update" : "Add"} Education
				</button>
			</div>
		</form>
	);
};

export default EducationForm;
