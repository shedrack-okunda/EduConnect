import React, { useEffect, useState } from "react";
import { profileService } from "../services/profile";
import type { IUserProfile } from "../types";
import ProfileForm from "../components/profile/ProfileForm";
import { useNavigate } from "react-router-dom";

const EditProfilePage: React.FC = () => {
	const [profile, setProfile] = useState<IUserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loadProfile = async () => {
			try {
				const user = await profileService.getProfile();
				setProfile(user.profile);
			} catch (error) {
				console.error("❌ Failed to load profile for editing", error);
			} finally {
				setLoading(false);
			}
		};

		loadProfile();
	}, []);

	const handleSave = async (updated: Partial<IUserProfile>) => {
		try {
			await profileService.updateProfile(updated);
			navigate("/profile");
		} catch (error) {
			console.error("❌ Failed to save profile", error);
		}
	};

	if (loading) return <p className="p-4 text-gray-400">Loading profile...</p>;

	return (
		<div className="max-w-3xl mx-auto mt-16 p-6 bg-gray-900/60 border border-gray-700 rounded-xl shadow">
			<h1 className="text-2xl font-bold text-purple-300 mb-6">
				Edit Your Profile
			</h1>
			{profile && <ProfileForm profile={profile} onSave={handleSave} />}
		</div>
	);
};

export default EditProfilePage;
