import { useEffect, useState } from "react";
import { profileService } from "../services/profile";
import { useAuth } from "../context/AuthContext";
import { SkillsManager } from "../components/profile/SkillsManger";

const Dashboard = () => {
	const { state } = useAuth();
	const { user } = state;
	const [skills, setSkills] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const profile = await profileService.getProfile(); // This should call the backend
				setSkills(profile?.profile?.skills || []);
			} catch (error) {
				console.error("Failed to fetch profile:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, []);

	if (isLoading) {
		return <div className="p-4 text-gray-600">Loading profile...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<h1 className="text-2xl font-bold text-gray-800">
				Welcome, {user?.profile?.firstName}
			</h1>

			{/* Skills */}
			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-xl font-semibold mb-4">Skills</h2>
				<SkillsManager skills={skills} onSkillsUpdate={setSkills} />
			</div>

			{/* Future Sections */}
			{/* 
				<EducationManager />
				<ExperienceManager />
				<SocialLinks />
			*/}
		</div>
	);
};

export default Dashboard;
