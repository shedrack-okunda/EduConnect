import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { profileService } from "../../services/profile";
import { useNavigate } from "react-router-dom";
import type { IExperience } from "../../../../shared/types";
import FormWrapper from "./FormWrapper";
import DisplayCard from "./DisplayCard";
import DateRange from "./DateRange";

interface ExperienceManagerProps {
	experience: IExperience[];
	onExperienceUpdate: (experience: IExperience[]) => void;
}

export const ExperienceManager: React.FC<ExperienceManagerProps> = ({
	experience,
	onExperienceUpdate,
}) => {
	const [formData, setFormData] = useState<IExperience>({
		company: "",
		position: "",
		description: "",
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
			company: "",
			position: "",
			description: "",
			startDate: "",
			endDate: "",
			current: false,
		});
		setEditIndex(null);
	};

	const handleSave = async () => {
		if (!formData.company.trim() || !formData.position.trim()) return;

		try {
			setIsLoading(true);
			let updatedExperience;

			if (editIndex !== null) {
				updatedExperience = [...experience];
				updatedExperience[editIndex] = formData;
			} else {
				updatedExperience = [...experience, formData];
			}

			const updatedUser = await profileService.updateExperience(
				updatedExperience
			);
			onExperienceUpdate(updatedExperience);
			await refreshUser();
			updateUser(updatedUser);

			resetForm();
			navigate("/profile");
		} catch (error) {
			console.error("Failed to save experience:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = (index: number) => {
		setFormData(experience[index]);
		setEditIndex(index);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleRemove = async (indexToRemove: number) => {
		try {
			setIsLoading(true);
			const updatedExperience = experience.filter(
				(_, i) => i !== indexToRemove
			);
			const updatedUser = await profileService.updateExperience(
				updatedExperience
			);
			onExperienceUpdate(updatedExperience);
			await refreshUser();
			updateUser(updatedUser);

			if (editIndex === indexToRemove) resetForm();
		} catch (error) {
			console.error("Failed to remove experience:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormWrapper
			title="Experience"
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
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Company
						</label>
						<input
							type="text"
							placeholder="Company"
							value={formData.company}
							onChange={(e) =>
								setFormData({
									...formData,
									company: e.target.value,
								})
							}
							className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Position
						</label>
						<input
							type="text"
							placeholder="Position"
							value={formData.position}
							onChange={(e) =>
								setFormData({
									...formData,
									position: e.target.value,
								})
							}
							className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
						/>
					</div>
					<div className="md:col-span-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Description
						</label>
						<textarea
							placeholder="Description"
							value={formData.description}
							onChange={(e) =>
								setFormData({
									...formData,
									description: e.target.value,
								})
							}
							className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
							rows={3}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
							className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
							className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
								className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-600 dark:text-gray-300">
								Currently Working
							</span>
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						onClick={handleSave}
						disabled={isLoading}
						className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50 transition">
						{editIndex !== null
							? "Update Experience"
							: "Add Experience"}
					</button>
				</div>
			</div>

			{/* Experience List */}
			{experience.length === 0 ? (
				<p className="text-gray-500 dark:text-gray-400">
					No experience records added yet.
				</p>
			) : (
				<div className="space-y-4">
					{experience.map((exp, idx) => (
						<DisplayCard
							key={idx}
							title={exp.company}
							subtitle={exp.position}
							footer={
								<DateRange
									startDate={exp.startDate}
									endDate={exp.endDate}
									isOngoing={exp.current}
								/>
							}
							actions={
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(idx)}
										className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
										Edit
									</button>
									<button
										onClick={() => handleRemove(idx)}
										disabled={isLoading}
										className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition">
										Delete
									</button>
								</div>
							}>
							{exp.description && (
								<p className="text-gray-600 dark:text-gray-300 text-sm">
									{exp.description}
								</p>
							)}
						</DisplayCard>
					))}
				</div>
			)}
		</FormWrapper>
	);
};
