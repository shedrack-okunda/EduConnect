import React, { useState } from "react";
import type { IUserProfile } from "../../types";
import { useAuth } from "../../context/AuthContext";

interface ProfileFormProps {
	profile?: IUserProfile;
	onSave: (profile: IUserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave }) => {
	const [formData, setFormData] = useState<IUserProfile>({
		firstName: profile?.firstName || "",
		lastName: profile?.lastName || "",
		avatar: profile?.avatar || "",
		bio: profile?.bio || "",
		skills: profile?.skills || [],
		interests: profile?.interests || [],
	});
	const { updateUser, refreshUser } = useAuth();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		if (name === "skills" || name === "interests") {
			setFormData((prev) => ({
				...prev,
				[name]: value.split(",").map((s) => s.trim()),
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSave(formData);

		const refreshedUser = await refreshUser();
		updateUser(refreshedUser);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 bg-gray-900/60 border border-gray-700 p-6 rounded-xl shadow text-white">
			{/* Basic Info */}
			<h2 className="text-lg font-semibold text-purple-300">
				Basic Info
			</h2>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm text-gray-400">
						First Name
					</label>
					<input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
					/>
				</div>
				<div>
					<label className="block text-sm text-gray-400">
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
					/>
				</div>
			</div>

			{/* Avatar */}
			<div>
				<label className="block text-sm text-gray-400">
					Avatar URL
				</label>
				<input
					type="text"
					name="avatar"
					value={formData.avatar}
					onChange={handleChange}
					className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
				/>
			</div>

			{/* Bio */}
			<div>
				<label className="block text-sm text-gray-400">Bio</label>
				<textarea
					name="bio"
					value={formData.bio}
					onChange={handleChange}
					rows={3}
					className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
				/>
			</div>

			{/* Skills */}
			<div>
				<label className="block text-sm text-gray-400">
					Skills (comma-separated)
				</label>
				<input
					type="text"
					name="skills"
					value={formData.skills.join(", ")}
					onChange={handleChange}
					className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			{/* Interests */}
			<div>
				<label className="block text-sm text-gray-400">
					Interests (comma-separated)
				</label>
				<input
					type="text"
					name="interests"
					value={formData.interests.join(", ")}
					onChange={handleChange}
					className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
				/>
			</div>

			{/* Save */}
			<button
				type="submit"
				className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition">
				Save Profile
			</button>
		</form>
	);
};

export default ProfileForm;
