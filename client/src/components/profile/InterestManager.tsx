import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { profileService } from "../../services/profile";
import { useNavigate } from "react-router-dom";

export const InterestsManager: React.FC<{
	interests: string[];
	onInterestsUpdate: (updated: string[]) => void;
}> = ({ interests, onInterestsUpdate }) => {
	const [newInterest, setNewInterest] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { updateUser } = useAuth();
	const navigate = useNavigate();

	const handleAddInterest = async () => {
		if (!newInterest.trim()) return;
		try {
			setIsLoading(true);
			const updated = [...interests, newInterest.trim()];
			const updatedUser = await profileService.updateInterests(updated);
			onInterestsUpdate(updated);
			updateUser(updatedUser);
			setNewInterest("");
			navigate("/profile");
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveInterest = async (toRemove: string) => {
		try {
			setIsLoading(true);
			const updated = interests.filter((i) => i !== toRemove);
			const updatedUser = await profileService.updateInterests(updated);
			onInterestsUpdate(updated);
			updateUser(updatedUser);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mt-6 p-2 space-y-4">
			<label className="block text-lg font-bold text-purple-200">
				Interests
			</label>

			<div className="flex flex-wrap gap-2">
				{interests.map((interest, index) => (
					<span
						key={index}
						className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600/20 text-purple-200 border border-purple-500/30">
						{interest}
						<button
							onClick={() => handleRemoveInterest(interest)}
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
					value={newInterest}
					onChange={(e) => setNewInterest(e.target.value)}
					placeholder="Add an interest"
					className="flex-1 px-3 py-2 border border-purple-500/40 rounded-md bg-purple-900/20 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
					onKeyDown={(e) => e.key === "Enter" && handleAddInterest()}
				/>
				<button
					onClick={handleAddInterest}
					disabled={!newInterest.trim() || isLoading}
					className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50">
					Add
				</button>
			</div>
		</div>
	);
};
