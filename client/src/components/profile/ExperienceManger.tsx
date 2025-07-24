import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { profileService } from "../../services/profile";
import { useNavigate } from "react-router-dom";
import type { IExperience } from "../../../../shared/types";

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

			// Reset form
			setFormData({
				company: "",
				position: "",
				description: "",
				startDate: "",
				endDate: "",
				current: false,
			});
			setEditIndex(null);
			navigate("/profile");
		} catch (error) {
			console.error("Failed to save experience:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = (index: number) => {
		const item = experience[index];
		setFormData(item);
		setEditIndex(index);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleRemove = async (indexToRemove: number) => {
		try {
			setIsLoading(true);
			const updatedExperience = experience.filter(
				(_, index) => index !== indexToRemove
			);
			const updatedUser = await profileService.updateExperience(
				updatedExperience
			);
			onExperienceUpdate(updatedExperience);
			await refreshUser();
			updateUser(updatedUser);

			if (editIndex === indexToRemove) {
				setFormData({
					company: "",
					position: "",
					description: "",
					startDate: "",
					endDate: "",
					current: false,
				});
				setEditIndex(null);
			}
		} catch (error) {
			console.error("Failed to remove experience:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mt-20 space-y-4 bg-yellow-50 p-4 rounded-lg">
			<label className="block text-lg font-bold text-gray-700">
				{editIndex !== null ? "Edit Experience" : "Add Experience"}
			</label>

			<div className="flex flex-col md:flex-row gap-2">
				<input
					type="text"
					placeholder="Company"
					value={formData.company}
					onChange={(e) =>
						setFormData({ ...formData, company: e.target.value })
					}
					className="px-3 py-2 border border-gray-300 rounded-md flex-1"
				/>
				<input
					type="text"
					placeholder="Position"
					value={formData.position}
					onChange={(e) =>
						setFormData({ ...formData, position: e.target.value })
					}
					className="px-3 py-2 border border-gray-300 rounded-md flex-1"
				/>
			</div>

			<textarea
				placeholder="Description"
				value={formData.description}
				onChange={(e) =>
					setFormData({ ...formData, description: e.target.value })
				}
				className="w-full px-3 py-2 border border-gray-300 rounded-md"
				rows={3}
			/>

			<div className="flex flex-col md:flex-row gap-2">
				<input
					type="date"
					value={formData.startDate}
					onChange={(e) =>
						setFormData({ ...formData, startDate: e.target.value })
					}
					className="px-3 py-2 border border-gray-300 rounded-md"
				/>
				<input
					type="date"
					value={formData.endDate}
					onChange={(e) =>
						setFormData({ ...formData, endDate: e.target.value })
					}
					className="px-3 py-2 border border-gray-300 rounded-md"
					disabled={formData.current}
				/>
			</div>

			<label className="inline-flex items-center mt-2">
				<input
					type="checkbox"
					checked={formData.current}
					onChange={(e) =>
						setFormData({ ...formData, current: e.target.checked })
					}
					className="form-checkbox text-yellow-600"
				/>
				<span className="ml-2 text-sm text-gray-700">
					Currently Working
				</span>
			</label>

			<button
				onClick={handleSave}
				disabled={isLoading}
				className="flex px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50">
				{editIndex !== null ? "Update Experience" : "Add Experience"}
			</button>

			{/* List */}
			<div className="space-y-2">
				{experience.map((exp, index) => (
					<div
						key={index}
						className="flex items-center justify-between bg-white border p-2 rounded-md">
						<div className="text-sm">
							<strong>{exp.company}</strong> – {exp.position}
							{exp.description && (
								<p className="text-xs text-gray-600 mt-1">
									{exp.description}
								</p>
							)}
							<small className="text-gray-600 block mt-1">
								{new Date(exp.startDate).toLocaleDateString()} –{" "}
								{exp.current
									? "Present"
									: exp.endDate
									? new Date(exp.endDate).toLocaleDateString()
									: "N/A"}
							</small>
						</div>
						<div className="flex gap-2 items-center">
							<button
								onClick={() => handleEdit(index)}
								className="text-blue-600 border p-2 hover:text-blue-800 text-sm font-medium cursor-pointer">
								Edit
							</button>
							<button
								onClick={() => handleRemove(index)}
								disabled={isLoading}
								className="text-red-600 hover:text-red-800 text-xl font-bold">
								×
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
