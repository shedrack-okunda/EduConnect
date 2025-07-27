import React, { useState, useEffect } from "react";
import {
	Play,
	Clock,
	Award,
	TrendingUp,
	Star,
	Target,
	Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const StudentDashboard: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { state } = useAuth();
	const { user } = state;

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const recentCourses = [
		{
			id: 1,
			title: "React Fundamentals",
			progress: 75,
			instructor: "Sarah Johnson",
			thumbnail:
				"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
			duration: "4h 30m",
			rating: 4.8,
		},
		{
			id: 2,
			title: "Python for Data Science",
			progress: 45,
			instructor: "Mike Chen",
			thumbnail:
				"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop",
			duration: "6h 15m",
			rating: 4.9,
		},
		{
			id: 3,
			title: "UI/UX Design Principles",
			progress: 90,
			instructor: "Emma Wilson",
			thumbnail:
				"https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=200&fit=crop",
			duration: "3h 45m",
			rating: 4.7,
		},
	];

	const upcomingAssignments = [
		{
			id: 1,
			title: "React Project Submission",
			course: "React Fundamentals",
			dueDate: "2 days",
			priority: "high",
		},
		{
			id: 2,
			title: "Data Analysis Quiz",
			course: "Python for Data Science",
			dueDate: "5 days",
			priority: "medium",
		},
		{
			id: 3,
			title: "Design Portfolio Review",
			course: "UI/UX Design",
			dueDate: "1 week",
			priority: "low",
		},
	];

	const achievements = [
		{
			id: 1,
			title: "Fast Learner",
			description: "Completed 3 courses this month",
			icon: <TrendingUp className="w-6 h-6" />,
			earned: true,
		},
		{
			id: 2,
			title: "Quiz Master",
			description: "Scored 100% on 5 quizzes",
			icon: <Target className="w-6 h-6" />,
			earned: true,
		},
		{
			id: 3,
			title: "Consistent Learner",
			description: "12-day learning streak",
			icon: <Award className="w-6 h-6" />,
			earned: true,
		},
		{
			id: 4,
			title: "Community Helper",
			description: "Help 10 fellow students",
			icon: <Users className="w-6 h-6" />,
			earned: false,
		},
	];

	return (
		<>
			{/* Animated Background */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
				<div className="grid lg:grid-cols-4 gap-8">
					<h1 className="text-2xl font-bold text-gray-300">
						Welcome, {user?.profile?.firstName}
					</h1>
					{/* Main Content */}
					<div className="lg:col-span-3 space-y-8">
						{/* Continue Learning Section */}
						<div
							className={`transition-all duration-1000 delay-700 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold">
									Continue Learning
								</h2>
							</div>

							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{recentCourses.map((course) => (
									<div
										key={course.id}
										className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
										<div className="relative">
											<img
												src={course.thumbnail}
												alt={course.title}
												className="w-full h-40 object-cover"
											/>
											<div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												<div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
													<Play className="w-6 h-6 ml-1" />
												</div>
											</div>
											<div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
												{course.duration}
											</div>
										</div>

										<div className="p-4">
											<h3 className="font-semibold mb-2 group-hover:text-purple-300 transition-colors">
												{course.title}
											</h3>
											<p className="text-gray-400 text-sm mb-3">
												by {course.instructor}
											</p>

											<div className="flex items-center justify-between mb-3">
												<div className="flex items-center space-x-1">
													<Star className="w-4 h-4 text-yellow-400 fill-current" />
													<span className="text-sm">
														{course.rating}
													</span>
												</div>
												<span className="text-sm text-gray-400">
													{course.progress}% complete
												</span>
											</div>

											<div className="w-full bg-gray-700 rounded-full h-2">
												<div
													className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
													style={{
														width: `${course.progress}%`,
													}}></div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Upcoming Assignments */}
						<div
							className={`transition-all duration-1000 delay-900 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							<h2 className="text-2xl font-bold mb-6">
								Upcoming Assignments
							</h2>

							<div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
								<div className="space-y-4">
									{upcomingAssignments.map((assignment) => (
										<div
											key={assignment.id}
											className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
											<div className="flex items-center space-x-4">
												<div
													className={`w-3 h-3 rounded-full ${
														assignment.priority ===
														"high"
															? "bg-red-500"
															: assignment.priority ===
															  "medium"
															? "bg-yellow-500"
															: "bg-green-500"
													}`}></div>
												<div>
													<h3 className="font-semibold">
														{assignment.title}
													</h3>
													<p className="text-gray-400 text-sm">
														{assignment.course}
													</p>
												</div>
											</div>

											<div className="flex items-center space-x-4">
												<div className="text-right">
													<p className="text-sm text-gray-400">
														Due in
													</p>
													<p className="font-semibold">
														{assignment.dueDate}
													</p>
												</div>
												<Clock className="w-5 h-5 text-gray-400" />
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Achievements */}
						<div
							className={`transition-all duration-1000 delay-1100 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							<h2 className="text-2xl font-bold mb-6">
								Recent Achievements
							</h2>

							<div className="grid md:grid-cols-2 gap-4">
								{achievements.map((achievement) => (
									<div
										key={achievement.id}
										className={`p-4 rounded-2xl border transition-all duration-300 ${
											achievement.earned
												? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/50"
												: "bg-white/5 border-white/20 opacity-60"
										}`}>
										<div className="flex items-center space-x-4">
											<div
												className={`w-12 h-12 rounded-xl flex items-center justify-center ${
													achievement.earned
														? "bg-gradient-to-r from-purple-500 to-blue-500"
														: "bg-gray-600"
												}`}>
												{achievement.icon}
											</div>
											<div>
												<h3 className="font-semibold">
													{achievement.title}
												</h3>
												<p className="text-gray-400 text-sm">
													{achievement.description}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StudentDashboard;
