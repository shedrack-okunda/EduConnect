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
		const updated = [...interests, newInterest.trim()];
		setIsLoading(true);
		const updatedUser = await profileService.updateInterests(updated);
		onInterestsUpdate(updated);
		updateUser(updatedUser);
		setNewInterest("");
		setIsLoading(false);
		navigate("/profile");
	};

	const handleRemoveInterest = async (toRemove: string) => {
		const updated = interests.filter((i) => i !== toRemove);
		setIsLoading(true);
		const updatedUser = await profileService.updateInterests(updated);
		onInterestsUpdate(updated);
		updateUser(updatedUser);
		setIsLoading(false);
	};

	return (
		<div className="mt-20 p-2 space-y-4">
			<div>
				<label className="block text-lg font-bold text-gray-700">
					Interests
				</label>
				<div className="mt-2 flex flex-wrap gap-2">
					{interests.map((interest, index) => (
						<span
							key={index}
							className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-green-800">
							{interest}
							<button
								onClick={() => handleRemoveInterest(interest)}
								className="ml-2 text-green-600 hover:text-green-800"
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
					value={newInterest}
					onChange={(e) => setNewInterest(e.target.value)}
					placeholder="Add a skill"
					className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
					onKeyPress={(e) => e.key === "Enter" && handleAddInterest()}
				/>
				<button
					onClick={handleAddInterest}
					disabled={!newInterest.trim() || isLoading}
					className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50">
					Add
				</button>
			</div>
		</div>
	);
};
