import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CourseDashboard } from "../components/course/CourseDashboard";
// import { LessonDashboard } from "../components/lesson/LessonDashboard";
import { courseService } from "../services/course";
import { ModuleDashboard } from "../components/module/ModuleDashboard";

const EducatorDashboard: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [courseId, setCourseId] = useState<string>("");
	const [moduleId, setModuleId] = useState<string>("");
	console.log(moduleId);
	const { state } = useAuth();
	const { user } = state;

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const courses = await courseService.getCourses();

				const educatorCourse = courses.find(
					(course) => course.instructorId === user?._id
				);

				if (educatorCourse) {
					setCourseId(educatorCourse._id);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchCourse();
		setIsVisible(true);
	}, [user?._id]);

	return (
		<>
			{/* Animated Background */}
			<div className="absolute inset-0 overflow-hidden z-0">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
				<div className=" grid lg:grid-cols-4 gap-8">
					<h1 className="text-2xl font-bold text-gray-300">
						Welcome, {user?.profile?.firstName}
					</h1>
					{/* Main Content */}
					<div className="lg:col-span-3 space-y-8">
						{/* Stats Cards */}
						<div
							className={`grid md:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}></div>

						{/* My Courses Section */}
						<div
							className={`transition-all duration-1000 delay-700 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold">
									My Courses
								</h2>
							</div>
							<CourseDashboard />

							{courseId && (
								<ModuleDashboard
									courseId={courseId}
									onModuleSelect={(id) => setModuleId(id)}
								/>
							)}

							{/* <LessonDashboard moduleId={moduleId} /> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EducatorDashboard;
