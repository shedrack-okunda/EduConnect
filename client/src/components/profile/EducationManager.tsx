import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { profileService } from "../../services/profile";
import type { IEducation } from "../../../../shared/types";
import { useNavigate } from "react-router-dom";

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

	const handleSave = async () => {
		if (!formData.institution.trim()) return;

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

			// Reset form
			setFormData({
				institution: "",
				degree: "",
				fieldOfStudy: "",
				startDate: "",
				endDate: "",
				current: false,
			});
			setEditIndex(null);
			navigate("/profile");
		} catch (error) {
			console.error("Failed to save education:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = (index: number) => {
		const item = education[index];
		setFormData(item);
		setEditIndex(index);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleRemoveEducation = async (indexToRemove: number) => {
		try {
			setIsLoading(true);
			const updatedEducation = education.filter(
				(_, index) => index !== indexToRemove
			);
			const updatedUser = await profileService.updateEducation(
				updatedEducation
			);
			onEducationUpdate(updatedEducation);
			await refreshUser();
			updateUser(updatedUser);
			if (editIndex === indexToRemove) {
				setFormData({
					institution: "",
					degree: "",
					fieldOfStudy: "",
					startDate: "",
					endDate: "",
					current: false,
				});
				setEditIndex(null);
			}
		} catch (error) {
			console.error("Failed to remove education:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mt-20 space-y-4 bg-purple-50 p-4 rounded-lg">
			<label className="block text-lg font-bold text-gray-700">
				{editIndex !== null ? "Edit Education" : "Add Education"}
			</label>

			{/* Inputs */}
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
				onClick={handleSave}
				disabled={isLoading}
				className="flex px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50">
				{editIndex !== null ? "Update Education" : "Add Education"}
			</button>

			{/* List */}
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

						<div className="flex gap-2 items-center">
							<button
								onClick={() => handleEdit(index)}
								className="text-blue-600 border rounded p-2 hover:text-blue-800 text-sm font-medium cursor-pointer">
								Edit
							</button>
							<button
								onClick={() => handleRemoveEducation(index)}
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
