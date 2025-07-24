import { useEffect, useState } from "react";
import { profileService } from "../services/profile";
import { useAuth } from "../context/AuthContext";
import { SkillsDisplay } from "../components/profile/SkillsDisplay";
import { EducationDisplay } from "../components/profile/EducationDisplay";
import type { IEducation } from "../../../shared/types";
import { InterestsDisplay } from "../components/profile/InterestDisplay";

const Dashboard = () => {
	const { state } = useAuth();
	const { user } = state;
	const [skills, setSkills] = useState<string[]>([]);
	const [interests, setInterests] = useState<string[]>([]);
	const [education, setEducation] = useState<IEducation[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const profile = await profileService.getProfile();
				setSkills(profile?.profile?.skills || []);
				setInterests(profile?.profile?.interests || []);
				setEducation(profile?.profile?.education || []);
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
				<SkillsDisplay skills={skills} />
			</div>

			{/* Interest */}
			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-xl font-semibold mb-4">Interests</h2>
				<InterestsDisplay interests={interests} />
			</div>

			{/* Education */}
			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-xl font-semibold mb-4">Education</h2>
				<EducationDisplay education={education} />
			</div>
		</div>
	);
};

export default Dashboard;
