import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
import DisplayCard from "./DisplayCard";
import DateRange from "./DateRange";
import type { IEducation } from "../../../../shared/types";

interface EducationWithStatus extends IEducation {
	isOngoing?: boolean;
	institution: string;
	degree: string;
	fieldOfStudy: string;
	startDate: string;
	endDate?: string;
}

interface EducationManagerProps {
	education: EducationWithStatus[];
	onEducationUpdate?: (updated: EducationWithStatus[]) => void;
}

const EducationManager: React.FC<EducationManagerProps> = ({
	education,
	onEducationUpdate,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [localEducation, setLocalEducation] =
		useState<EducationWithStatus[]>(education);

	const handleChange = (
		idx: number,
		field: keyof EducationWithStatus,
		value: string | boolean
	) => {
		const updated = [...localEducation];
		updated[idx] = { ...updated[idx], [field]: value };
		setLocalEducation(updated);
	};

	const handleSave = () => {
		setIsEditing(false);
		if (onEducationUpdate) onEducationUpdate(localEducation);
	};

	const handleDelete = (idx: number) => {
		const updated = localEducation.filter((_, i) => i !== idx);
		setLocalEducation(updated);
		if (onEducationUpdate) onEducationUpdate(updated);
	};

	return (
		<FormWrapper
			title="Education"
			actions={
				<button
					onClick={() => setIsEditing(!isEditing)}
					className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition">
					{isEditing ? "Cancel" : "Edit"}
				</button>
			}>
			{localEducation.length === 0 ? (
				<p className="text-gray-500 dark:text-gray-400">
					No education added yet.
				</p>
			) : isEditing ? (
				<div className="space-y-6">
					{localEducation.map((edu, idx) => (
						<div
							key={idx}
							className="p-5 rounded-xl border bg-gray-50 dark:bg-gray-800 shadow-sm space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Institution
									</label>
									<input
										type="text"
										value={edu.institution}
										onChange={(e) =>
											handleChange(
												idx,
												"institution",
												e.target.value
											)
										}
										placeholder="Institution"
										className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Degree
									</label>
									<input
										type="text"
										value={edu.degree}
										onChange={(e) =>
											handleChange(
												idx,
												"degree",
												e.target.value
											)
										}
										placeholder="Degree"
										className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
									/>
								</div>
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Field of Study
									</label>
									<input
										type="text"
										value={edu.fieldOfStudy}
										onChange={(e) =>
											handleChange(
												idx,
												"fieldOfStudy",
												e.target.value
											)
										}
										placeholder="Field of Study"
										className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Start Date
									</label>
									<input
										type="date"
										value={edu.startDate}
										onChange={(e) =>
											handleChange(
												idx,
												"startDate",
												e.target.value
											)
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
										value={edu.endDate || ""}
										disabled={edu.isOngoing}
										onChange={(e) =>
											handleChange(
												idx,
												"endDate",
												e.target.value
											)
										}
										className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
									/>
									<div className="mt-2 flex items-center gap-2">
										<input
											type="checkbox"
											checked={edu.isOngoing ?? false}
											onChange={(e) =>
												handleChange(
													idx,
													"isOngoing",
													e.target.checked
												)
											}
											className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
										/>
										<span className="text-sm text-gray-600 dark:text-gray-300">
											Ongoing
										</span>
									</div>
								</div>
							</div>
						</div>
					))}

					<div className="flex justify-end gap-3">
						<button
							onClick={handleSave}
							className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
							Save
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition">
							Cancel
						</button>
					</div>
				</div>
			) : (
				localEducation.map((edu, idx) => (
					<DisplayCard
						key={idx}
						title={edu.institution}
						subtitle={edu.degree}
						footer={
							<DateRange
								startDate={edu.startDate}
								endDate={edu.endDate}
								isOngoing={edu.isOngoing ?? !edu.endDate}
							/>
						}
						actions={
							<div className="flex gap-2">
								<button
									onClick={() => setIsEditing(true)}
									className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
									Edit
								</button>
								<button
									onClick={() => handleDelete(idx)}
									className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
									Delete
								</button>
							</div>
						}>
						<p className="text-gray-600 dark:text-gray-300 text-sm">
							{edu.fieldOfStudy}
						</p>
					</DisplayCard>
				))
			)}
		</FormWrapper>
	);
};

export default EducationManager;
