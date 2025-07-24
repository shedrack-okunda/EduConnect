import React, { useEffect, useState } from "react";
import { profileService } from "../services/profile";
import type { IEducation } from "../../../shared/types";
import EducationForm from "../components/profile/EducationForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EditEducationPage: React.FC = () => {
	const [education, setEducation] = useState<IEducation[]>([]);
	const navigate = useNavigate();
	const { refreshUser, updateUser } = useAuth();

	useEffect(() => {
		const loadProfile = async () => {
			const user = await profileService.getProfile();
			setEducation(user?.profile?.education || []);
		};
		loadProfile();
	}, []);

	const handleSave = async (newEducation: IEducation) => {
		try {
			const updated = [...education, newEducation];
			const updatedUser = await profileService.updateProfile({
				education: updated,
			});
			setEducation(updated);
			await refreshUser();
			updateUser(updatedUser);
			navigate("/profile");
		} catch (err) {
			console.error("Error saving education", err);
		}
	};

	return (
		<div className="max-w-2xl mx-auto mt-20 p-2">
			<h1 className="text-2xl font-bold mb-6">Add Education</h1>
			<EducationForm onSave={handleSave} />
		</div>
	);
};

export default EditEducationPage;
