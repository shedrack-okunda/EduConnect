import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { profileService } from "../../services/profile";
import { useNavigate } from "react-router-dom";
import type { IEducation } from "../../../../shared/types";
import FormWrapper from "./FormWrapper";
import DisplayCard from "./DisplayCard";
import DateRange from "./DateRange";

interface EducationManagerProps {
	education: IEducation[];
	onEducationUpdate: (education: IEducation[]) => void;
}

export const EducationManager: React.FC<EducationManagerProps> = ({
	education,
	onEducationUpdate,
}) => {
	const [formData, setFormData] = useState<IEducation>({
		institution: "",
		degree: "",
		fieldOfStudy: "",
		startDate: "",
		endDate: "",
		current: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [editIndex, setEditIndex] = useState<number | null>(null);

	const { updateUser, refreshUser } = useAuth();
	const navigate = useNavigate();

	const resetForm = () => {
		setFormData({
			institution: "",
			degree: "",
			fieldOfStudy: "",
			startDate: "",
			endDate: "",
			current: false,
		});
		setEditIndex(null);
	};

	const handleSave = async () => {
		if (!formData.institution.trim() || !formData.degree.trim()) return;

		try {
			setIsLoading(true);
			let updatedEducation;

			if (editIndex !== null) {
				updatedEducation = [...education];
				updatedEducation[editIndex] = formData;
			} else {
				updatedEducation = [...education, formData];
			}

			const updatedUser = await profileService.updateEducation(
				updatedEducation
			);
			onEducationUpdate(updatedEducation);
			await refreshUser();
			updateUser(updatedUser);

			resetForm();
			navigate("/profile");
		} catch (error) {
			console.error("Failed to save education:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = (index: number) => {
		setFormData(education[index]);
		setEditIndex(index);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleRemove = async (indexToRemove: number) => {
		try {
			setIsLoading(true);
			const updatedEducation = education.filter(
				(_, i) => i !== indexToRemove
			);
			const updatedUser = await profileService.updateEducation(
				updatedEducation
			);
			onEducationUpdate(updatedEducation);
			await refreshUser();
			updateUser(updatedUser);

			if (editIndex === indexToRemove) resetForm();
		} catch (error) {
			console.error("Failed to remove education:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormWrapper
			title="Education"
			actions={
				editIndex !== null && (
					<button
						onClick={resetForm}
						className="px-3 py-1 rounded-lg bg-gray-500 text-white text-sm shadow hover:bg-gray-600 transition">
						Cancel
					</button>
				)
			}>
			{/* Form */}
			<div className="p-5 rounded-xl border bg-gray-50 dark:bg-gray-800 shadow-sm space-y-4 mb-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-1">
							Institution
						</label>
						<input
							type="text"
							placeholder="Institution"
							value={formData.institution}
							onChange={(e) =>
								setFormData({
									...formData,
									institution: e.target.value,
								})
							}
							className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:text-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">
							Degree
						</label>
						<input
							type="text"
							placeholder="Degree"
							value={formData.degree}
							onChange={(e) =>
								setFormData({
									...formData,
									degree: e.target.value,
								})
							}
							className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:text-white"
						/>
					</div>
					<div className="md:col-span-2">
						<label className="block text-sm font-medium mb-1">
							Field of Study
						</label>
						<input
							type="text"
							placeholder="Field of Study"
							value={formData.fieldOfStudy}
							onChange={(e) =>
								setFormData({
									...formData,
									fieldOfStudy: e.target.value,
								})
							}
							className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:text-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">
							Start Date
						</label>
						<input
							type="date"
							value={formData.startDate}
							onChange={(e) =>
								setFormData({
									...formData,
									startDate: e.target.value,
								})
							}
							className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:text-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">
							End Date
						</label>
						<input
							type="date"
							value={formData.endDate}
							disabled={formData.current}
							onChange={(e) =>
								setFormData({
									...formData,
									endDate: e.target.value,
								})
							}
							className="w-full p-2.5 border rounded-lg disabled:opacity-50 dark:bg-gray-700 dark:text-white"
						/>
						<div className="mt-2 flex items-center gap-2">
							<input
								type="checkbox"
								checked={formData.current}
								onChange={(e) =>
									setFormData({
										...formData,
										current: e.target.checked,
									})
								}
								className="h-4 w-4 text-blue-600 border-gray-300 rounded"
							/>
							<span className="text-sm">Ongoing</span>
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						onClick={handleSave}
						disabled={isLoading}
						className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50 transition">
						{editIndex !== null
							? "Update Education"
							: "Add Education"}
					</button>
				</div>
			</div>

			{/* Education List */}
			{education.length === 0 ? (
				<p className="text-gray-500">No education records added yet.</p>
			) : (
				<div className="space-y-4">
					{education.map((edu, idx) => (
						<DisplayCard
							key={idx}
							title={edu.institution}
							subtitle={edu.degree}
							footer={
								<DateRange
									startDate={edu.startDate}
									endDate={edu.endDate}
									isOngoing={edu.current}
								/>
							}
							actions={
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(idx)}
										className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
										Edit
									</button>
									<button
										onClick={() => handleRemove(idx)}
										disabled={isLoading}
										className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
										Delete
									</button>
								</div>
							}>
							<p className="text-sm">{edu.fieldOfStudy}</p>
						</DisplayCard>
					))}
				</div>
			)}
		</FormWrapper>
	);
};
