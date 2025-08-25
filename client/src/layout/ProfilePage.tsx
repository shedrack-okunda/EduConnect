import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EducationDisplay } from "../components/profile/EducationDisplay";
import { ExperienceDisplay } from "../components/profile/ExperienceDisplay";
import { profileService } from "../services/profile";

const ProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const { state, refreshUser, updateUser } = useAuth();
	const { user } = state;

	useEffect(() => {
		refreshUser();
	}, []);

	if (!user) return <p className="p-4 text-gray-300">Loading profile...</p>;

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
		<div className="max-w-5xl mx-auto space-y-8 text-white">
			{/* Profile Header */}
			<div className="p-6 bg-gray-900/60 border border-gray-700 rounded-xl shadow space-y-6">
				<div className="flex items-center gap-6">
					{avatar ? (
						<img
							src={avatar}
							alt="avatar"
							className="w-24 h-24 rounded-full object-cover border-2 border-purple-500/40 shadow-lg"
						/>
					) : (
						<div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 text-3xl font-bold uppercase border border-gray-600">
							{firstName.charAt(0)}
						</div>
					)}

					<div>
						<h2 className="text-3xl font-bold">
							{firstName} {lastName}
						</h2>
						<p className="text-gray-400">{user.email}</p>
						<span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full border border-purple-500/30">
							{user.role.charAt(0).toUpperCase() +
								user.role.slice(1)}
						</span>
					</div>
				</div>

				<div>
					<button
						onClick={() => navigate("/profile/edit")}
						className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:opacity-90 transition">
						Edit Profile
					</button>
				</div>
			</div>

			{/* Bio */}
			{bio && (
				<div
					id="bio"
					className="bg-gray-900/60 border border-gray-700 p-6 rounded-xl shadow">
					<h4 className="text-xl font-semibold text-purple-300 mb-3">
						Bio
					</h4>
					<p className="text-gray-300 leading-relaxed">{bio}</p>
				</div>
			)}

			{/* Skills */}
			{skills?.length > 0 && (
				<div
					id="skills"
					className="bg-gray-900/60 border border-gray-700 p-6 rounded-xl shadow">
					<div className="flex justify-between items-center mb-4">
						<h4 className="text-xl font-semibold text-blue-300">
							Skills
						</h4>
						<button
							onClick={() => navigate("/skills/edit")}
							className="px-3 py-1.5 rounded-md text-sm bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 transition">
							Edit Skills
						</button>
					</div>
					<div className="flex flex-wrap gap-2">
						{skills.map((skill, index) => (
							<span
								key={index}
								className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30">
								{skill}
								<button
									onClick={() => handleRemoveSkill(skill)}
									className="ml-2 text-blue-400 hover:text-blue-200">
									×
								</button>
							</span>
						))}
					</div>
				</div>
			)}

			{/* Interests */}
			{interests?.length > 0 && (
				<div
					id="interests"
					className="bg-gray-900/60 border border-gray-700 p-6 rounded-xl shadow">
					<div className="flex justify-between items-center mb-4">
						<h4 className="text-xl font-semibold text-green-300">
							Interests
						</h4>
						<button
							onClick={() => navigate("/interests/edit")}
							className="px-3 py-1.5 rounded-md text-sm bg-green-600/30 text-green-300 hover:bg-green-600/50 transition">
							Edit Interests
						</button>
					</div>
					<div className="flex flex-wrap gap-2">
						{interests.map((interest, index) => (
							<span
								key={index}
								className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30">
								{interest}
								<button
									onClick={() =>
										handleRemoveInterest(interest)
									}
									className="ml-2 text-green-400 hover:text-green-200">
									×
								</button>
							</span>
						))}
					</div>
				</div>
			)}

			{/* Education */}
			<div
				id="education"
				className="bg-gray-900/60 border border-gray-700 p-6 rounded-xl shadow">
				<div className="flex justify-between items-center mb-4">
					<h4 className="text-xl font-semibold text-purple-300">
						Education
					</h4>
					<button
						onClick={() => navigate("/education/edit")}
						className="px-3 py-1.5 rounded-md text-sm bg-purple-600/30 text-purple-300 hover:bg-purple-600/50 transition">
						Edit Education
					</button>
				</div>

				<EducationDisplay education={user?.profile?.education || []} />
			</div>

			{/* Experience */}
			<div
				id="experience"
				className="bg-gray-900/60 border border-gray-700 p-6 rounded-xl shadow">
				<div className="flex justify-between items-center mb-4">
					<h4 className="text-xl font-semibold text-pink-300">
						Experience
					</h4>
					<button
						onClick={() => navigate("/experience/edit")}
						className="px-3 py-1.5 rounded-md text-sm bg-pink-600/30 text-pink-300 hover:bg-pink-600/50 transition">
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
