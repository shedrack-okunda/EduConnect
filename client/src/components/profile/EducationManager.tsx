import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { profileService } from "../../services/profile";
import type { IEducation } from "../../../../shared/types";

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
	const { updateUser, refreshUser } = useAuth();

	const handleAddEducation = async () => {
		if (!formData.institution.trim()) return;

		try {
			setIsLoading(true);
			const updatedEducation = [...education, formData];
			const updatedUser = await profileService.updateEducation(
				updatedEducation
			); // send full array
			onEducationUpdate(updatedEducation);
			await refreshUser();
			updateUser(updatedUser);
			setFormData({
				institution: "",
				degree: "",
				fieldOfStudy: "",
				startDate: "",
				endDate: "",
				current: false,
			});
		} catch (error) {
			console.error("Failed to add education:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveEducation = async (indexToRemove: number) => {
		try {
			setIsLoading(true);
			const updatedEducation = education.filter(
				(_, index) => index !== indexToRemove
			);
			const updatedUser = await profileService.updateEducation(
				updatedEducation
			); // ✅ send updated array
			onEducationUpdate(updatedEducation);
			await refreshUser();
			updateUser(updatedUser);
		} catch (error) {
			console.error("Failed to remove education:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-4 bg-purple-50 p-4 rounded-lg">
			<label className="block text-sm font-medium text-gray-700">
				Education
			</label>

			<div className="flex flex-col md:flex-row gap-2">
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
					className="px-3 py-2 border border-gray-300 rounded-md flex-1"
				/>
				<input
					type="text"
					placeholder="Degree"
					value={formData.degree}
					onChange={(e) =>
						setFormData({ ...formData, degree: e.target.value })
					}
					className="px-3 py-2 border border-gray-300 rounded-md flex-1"
				/>
			</div>

			<div className="flex flex-col md:flex-row gap-2">
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
					className="px-3 py-2 border border-gray-300 rounded-md flex-1"
				/>
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
					className="form-checkbox text-purple-600"
				/>
				<span className="ml-2 text-sm text-gray-700">
					Currently Studying
				</span>
			</label>

			<button
				onClick={handleAddEducation}
				disabled={isLoading}
				className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50">
				Add Education
			</button>

			<div className="space-y-2">
				{education.map((edu, index) => (
					<div
						key={index}
						className="flex items-center justify-between bg-white border p-2 rounded-md">
						<div className="text-sm">
							<strong>{edu.institution}</strong> – {edu.degree},{" "}
							{edu.fieldOfStudy}
							<br />
							<small className="text-gray-600">
								{new Date(edu.startDate).toLocaleDateString()} –{" "}
								{edu.current
									? "Present"
									: edu.endDate
									? new Date(edu.endDate).toLocaleDateString()
									: "N/A"}
							</small>
						</div>
						<button
							onClick={() => handleRemoveEducation(index)}
							disabled={isLoading}
							className="text-red-600 hover:text-red-800 text-xl font-bold">
							×
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
