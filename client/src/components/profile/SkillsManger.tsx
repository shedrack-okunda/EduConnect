import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { profileService } from "../../services/profile";
import { useNavigate } from "react-router-dom";

interface SkillsManagerProps {
	skills: string[];
	onSkillsUpdate: (skills: string[]) => void;
}

export const SkillsManager: React.FC<SkillsManagerProps> = ({
	skills,
	onSkillsUpdate,
}) => {
	const [newSkill, setNewSkill] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { updateUser } = useAuth();
	const navigate = useNavigate();

	const handleAddSkill = async () => {
		if (!newSkill.trim()) return;

		try {
			setIsLoading(true);
			const updatedSkills = [...skills, newSkill.trim()];
			const updatedUser = await profileService.updateSkills(
				updatedSkills
			);
			onSkillsUpdate(updatedSkills);
			updateUser(updatedUser);
			setNewSkill("");
			navigate("/profile");
		} catch (error) {
			console.error("Failed to add skill:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveSkill = async (skillToRemove: string) => {
		try {
			setIsLoading(true);
			const updatedSkills = skills.filter(
				(skill) => skill !== skillToRemove
			);
			const updatedUser = await profileService.updateSkills(
				updatedSkills
			);
			onSkillsUpdate(updatedSkills);
			updateUser(updatedUser);
		} catch (error) {
			console.error("Failed to remove skill:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mt-20 p-2 space-y-4">
			<div>
				<label className="block text-lg font-bold text-gray-700">
					Skills
				</label>
				<div className="mt-2 flex flex-wrap gap-2">
					{skills.map((skill, index) => (
						<span
							key={index}
							className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
							{skill}
							<button
								onClick={() => handleRemoveSkill(skill)}
								className="ml-2 text-blue-600 hover:text-blue-800"
								disabled={isLoading}>
								×
							</button>
						</span>
					))}
				</div>
			</div>

			<div className="flex gap-2">
				<input
					type="text"
					value={newSkill}
					onChange={(e) => setNewSkill(e.target.value)}
					placeholder="Add a skill"
					className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
				/>
				<button
					onClick={handleAddSkill}
					disabled={!newSkill.trim() || isLoading}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
					Add
				</button>
			</div>
		</div>
	);
};
