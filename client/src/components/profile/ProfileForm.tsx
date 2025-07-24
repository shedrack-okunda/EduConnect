import React, { useState } from "react";
import type { IUserProfile } from "../../types";

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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		// Handle array fields as comma-separated strings
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSave({
			...formData,
			skills: formData.skills,
			interests: formData.interests,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 bg-white p-6 rounded shadow">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium">
						First Name
					</label>
					<input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						className="w-full border p-2 rounded"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						className="w-full border p-2 rounded"
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium">Avatar URL</label>
				<input
					type="text"
					name="avatar"
					value={formData.avatar}
					onChange={handleChange}
					className="w-full border p-2 rounded"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium">Bio</label>
				<textarea
					name="bio"
					value={formData.bio}
					onChange={handleChange}
					className="w-full border p-2 rounded"
					rows={3}
				/>
			</div>

			<div>
				<label className="block text-sm font-medium">
					Skills (comma-separated)
				</label>
				<input
					type="text"
					name="skills"
					value={
						Array.isArray(formData.skills)
							? formData.skills.join(", ")
							: ""
					}
					onChange={handleChange}
					className="w-full border p-2 rounded"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium">
					Interests (comma-separated)
				</label>
				<input
					type="text"
					name="interests"
					value={
						Array.isArray(formData.interests)
							? formData.interests.join(", ")
							: ""
					}
					onChange={handleChange}
					className="w-full border p-2 rounded"
				/>
			</div>

			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
				Save Profile
			</button>
		</form>
	);
};

export default ProfileForm;
