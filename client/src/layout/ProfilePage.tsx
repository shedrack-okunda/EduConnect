import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EducationDisplay } from "../components/profile/EducationDisplay";
import { profileService } from "../services/profile";
import { ExperienceDisplay } from "../components/profile/ExperienceDisplay";

const ProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const { state, refreshUser, updateUser } = useAuth();
	const { user } = state;

	useEffect(() => {
		refreshUser();
	}, []);

	if (!user) return <p className="p-4">Loading profile...</p>;

	const { firstName, lastName, avatar, bio, skills, interests } =
		user.profile;

	const handleRemoveSkill = async (skillToRemove: string) => {
		const updatedSkills = user.profile.skills.filter(
			(skill) => skill !== skillToRemove
		);
		const updatedUser = await profileService.updateSkills(updatedSkills);
		updateUser(updatedUser);
	};

	const handleRemoveInterest = async (interestToRemove: string) => {
		const updatedInterests = user.profile.interests.filter(
			(i) => i !== interestToRemove
		);
		const updatedUser = await profileService.updateInterests(
			updatedInterests
		);
		updateUser(updatedUser);
	};

	return (
		<div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-8">
			{/* Profile Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex items-center gap-4">
					{avatar ? (
						<img
							src={avatar}
							alt="avatar"
							className="w-20 h-20 rounded-full object-cover border"
						/>
					) : (
						<div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold uppercase">
							{firstName.charAt(0)}
						</div>
					)}

					<div>
						<h2 className="text-2xl font-bold text-gray-800">
							{firstName} {lastName}
						</h2>
						<p className="text-gray-600">{user.email}</p>
						<span className="text-sm inline-block px-2 py-1 mt-1 bg-gray-100 text-gray-800 rounded">
							{user.role.charAt(0).toUpperCase() +
								user.role.slice(1)}
						</span>
					</div>
				</div>

				<button
					onClick={() => navigate("/profile/edit")}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
					Edit Profile
				</button>
			</div>

			{/* Bio */}
			{bio && (
				<div className="bg-gray-50 p-4 rounded-md shadow-sm">
					<h4 className="text-lg font-semibold text-gray-800 mb-2">
						Bio
					</h4>
					<p className="text-gray-700 leading-relaxed">{bio}</p>
				</div>
			)}

			{/* Skills */}
			{skills?.length > 0 && (
				<div className="bg-blue-50 p-4 rounded-md shadow-sm">
					<div className="flex justify-between items-center mb-3">
						<h4 className="text-lg font-semibold text-blue-900">
							Skills
						</h4>
						<button
							onClick={() => navigate("/skills/edit")}
							className="border px-3 py-1.5 rounded-md text-sm text-blue-600 hover:bg-blue-100 transition">
							Edit Skills
						</button>
					</div>
					<div className="flex flex-wrap gap-2">
						{skills.map((skill, index) => (
							<span
								key={index}
								className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
								{skill}
								<button
									onClick={() => handleRemoveSkill(skill)}
									className="ml-2 text-blue-600 hover:text-blue-800">
									×
								</button>
							</span>
						))}
					</div>
				</div>
			)}

			{/* Interests */}
			{interests?.length > 0 && (
				<div className="bg-green-50 p-4 rounded-md shadow-sm">
					<div className="flex justify-between items-center mb-3">
						<h4 className="text-lg font-semibold text-green-900">
							Interests
						</h4>
						<button
							onClick={() => navigate("/interests/edit")}
							className="border px-3 py-1.5 rounded-md text-sm text-green-600 hover:bg-green-100 transition">
							Edit Interests
						</button>
					</div>
					<div className="flex flex-wrap gap-2">
						{interests.map((interest, index) => (
							<span
								key={index}
								className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
								{interest}
								<button
									onClick={() =>
										handleRemoveInterest(interest)
									}
									className="ml-2 text-green-600 hover:text-green-800">
									×
								</button>
							</span>
						))}
					</div>
				</div>
			)}

			<div className="bg-purple-50 p-4 rounded-md shadow-sm">
				<div className="flex justify-between items-center mb-3">
					<h4 className="text-lg font-semibold text-purple-900">
						Education
					</h4>
					<button
						onClick={() => navigate("/education/edit")}
						className="border px-3 py-1.5 rounded-md text-sm text-purple-600 hover:bg-purple-100 transition">
						Edit Education
					</button>
				</div>

				<EducationDisplay education={user?.profile?.education || []} />
			</div>

			<div className="bg-violet-50 p-4 rounded-md shadow-sm">
				<div className="flex justify-between items-center mb-3">
					<h4 className="text-lg font-semibold text-violet-700">
						Experience
					</h4>
					<button
						onClick={() => navigate("/experience/edit")}
						className="border px-3 py-1.5 rounded-md text-sm text-violet-600 hover:bg-violet-100 transition">
						Edit Experience
					</button>
				</div>

				<ExperienceDisplay
					experience={user?.profile?.experience || []}
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
