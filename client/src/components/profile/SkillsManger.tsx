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
			const updated = [...skills, newSkill.trim()];
			const updatedUser = await profileService.updateSkills(updated);
			onSkillsUpdate(updated);
			updateUser(updatedUser);
			setNewSkill("");
			navigate("/profile");
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveSkill = async (toRemove: string) => {
		try {
			setIsLoading(true);
			const updated = skills.filter((s) => s !== toRemove);
			const updatedUser = await profileService.updateSkills(updated);
			onSkillsUpdate(updated);
			updateUser(updatedUser);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mt-6 p-2 space-y-4">
			<label className="block text-lg font-bold text-purple-200">
				Skills
			</label>

			<div className="flex flex-wrap gap-2">
				{skills.map((skill, index) => (
					<span
						key={index}
						className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600/20 text-purple-200 border border-purple-500/30">
						{skill}
						<button
							onClick={() => handleRemoveSkill(skill)}
							className="ml-2 text-purple-400 hover:text-purple-200"
							disabled={isLoading}>
							×
						</button>
					</span>
				))}
			</div>

			<div className="flex gap-2">
				<input
					type="text"
					value={newSkill}
					onChange={(e) => setNewSkill(e.target.value)}
					placeholder="Add a skill"
					className="flex-1 px-3 py-2 border border-purple-500/40 rounded-md bg-purple-900/20 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
					onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
				/>
				<button
					onClick={handleAddSkill}
					disabled={!newSkill.trim() || isLoading}
					className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50">
					Add
				</button>
			</div>
		</div>
	);
};
