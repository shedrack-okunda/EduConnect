import React, { useEffect, useState } from "react";
import { profileService } from "../services/profile";
import type { IUserProfile } from "../types";
import ProfileForm from "../components/profile/ProfileForm";
import { useNavigate } from "react-router-dom";

const EditProfilePage: React.FC = () => {
	const [profile, setProfile] = useState<IUserProfile | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const loadProfile = async () => {
			try {
				const user = await profileService.getProfile();
				setProfile(user.profile);
			} catch (error) {
				console.error("Failed to load profile for editing", error);
			}
		};

		loadProfile();
	}, []);

	const handleSave = async (updated: Partial<IUserProfile>) => {
		try {
			await profileService.updateProfile(updated);
			navigate("/profile"); // go back after save
		} catch (error) {
			console.error("Failed to save", error);
		}
	};

	if (!profile) return <p className="p-4">Loading...</p>;

	return (
		<div className="max-w-2xl mx-auto mt-20 p-2">
			<h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>
			<ProfileForm profile={profile} onSave={handleSave} />
		</div>
	);
};

export default EditProfilePage;
