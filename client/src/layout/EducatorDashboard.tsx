import React, { useState, useEffect } from "react";
import {
	BookOpen,
	Plus,
	Users,
	BarChart3,
	MessageCircle,
	Award,
	Video,
	Star,
	Eye,
	Edit,
	Trash2,
	Upload,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EducatorDashboard: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { state, logout } = useAuth();
	const { user } = state;
	const navigate = useNavigate();

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const myCourses = [
		{
			id: 1,
			title: "Advanced React Development",
			students: 342,
			rating: 4.9,
			revenue: 12400,
			status: "published",
			thumbnail:
				"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
			lastUpdated: "2 days ago",
		},
		{
			id: 2,
			title: "JavaScript Fundamentals",
			students: 568,
			rating: 4.7,
			revenue: 18900,
			status: "published",
			thumbnail:
				"https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
			lastUpdated: "1 week ago",
		},
		{
			id: 3,
			title: "Node.js Backend Development",
			students: 89,
			rating: 4.8,
			revenue: 3200,
			status: "draft",
			thumbnail:
				"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
			lastUpdated: "3 days ago",
		},
	];

	const recentActivity = [
		{
			id: 1,
			type: "enrollment",
			message: "New student enrolled in React Development",
			time: "2 hours ago",
			student: "John Smith",
		},
		{
			id: 2,
			type: "review",
			message: "New 5-star review on JavaScript Fundamentals",
			time: "4 hours ago",
			student: "Emma Wilson",
		},
		{
			id: 3,
			type: "question",
			message: "Student question in Node.js course",
			time: "6 hours ago",
			student: "Mike Chen",
		},
		{
			id: 4,
			type: "completion",
			message: "Student completed Advanced React course",
			time: "1 day ago",
			student: "Lisa Anderson",
		},
	];

	const upcomingTasks = [
		{
			id: 1,
			title: "Grade React Project Submissions",
			course: "Advanced React Development",
			dueDate: "Today",
			priority: "high",
			count: 23,
		},
		{
			id: 2,
			title: "Update JavaScript Course Content",
			course: "JavaScript Fundamentals",
			dueDate: "2 days",
			priority: "medium",
			count: null,
		},
		{
			id: 3,
			title: "Live Q&A Session",
			course: "Node.js Backend",
			dueDate: "3 days",
			priority: "low",
			count: null,
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
			{/* Animated Background */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
			</div>

			{/* Header */}
			<header
				className={`fixed w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 transition-all duration-1000 ${
					isVisible
						? "translate-y-0 opacity-100"
						: "-translate-y-10 opacity-0"
				}`}>
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
								<BookOpen className="w-6 h-6 text-white" />
							</div>
							<span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
								EduConnect
							</span>
							<span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
								{user?.role}
							</span>
						</div>

						{/* User Actions */}
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-3 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-300 cursor-pointer">
								<img
									src={`https://ui-avatars.com/api/?name=${
										user?.profile?.firstName || "User"
									}`}
									alt="Profile"
									className="w-8 h-8 rounded-lg object-cover"
								/>
								<span className="font-medium">
									{user?.profile?.firstName || "Educator"}
								</span>
							</div>

							<button
								onClick={handleLogout}
								className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-200">
								Logout
							</button>
						</div>
					</div>
				</div>
			</header>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
				<div className="mt-20 grid lg:grid-cols-4 gap-8">
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

							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{myCourses.map((course) => (
									<div
										key={course.id}
										className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
										<div className="relative">
											<img
												src={course.thumbnail}
												alt={course.title}
												className="w-full h-40 object-cover"
											/>
											<div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												<div className="flex items-center space-x-2">
													<button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
														<Eye className="w-5 h-5" />
													</button>
													<button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
														<Edit className="w-5 h-5" />
													</button>
												</div>
											</div>
											<div
												className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs backdrop-blur-sm ${
													course.status ===
													"published"
														? "bg-green-500/60 text-green-100"
														: "bg-yellow-500/60 text-yellow-100"
												}`}>
												{course.status}
											</div>
										</div>

										<div className="p-4">
											<h3 className="font-semibold mb-2 group-hover:text-purple-300 transition-colors">
												{course.title}
											</h3>
											<p className="text-gray-400 text-sm mb-3">
												Updated {course.lastUpdated}
											</p>

											<div className="grid grid-cols-2 gap-4 mb-4">
												<div className="text-center">
													<p className="text-xl font-bold">
														{course.students}
													</p>
													<p className="text-gray-400 text-xs">
														Students
													</p>
												</div>
												<div className="text-center">
													<p className="text-xl font-bold">
														$
														{course.revenue.toLocaleString()}
													</p>
													<p className="text-gray-400 text-xs">
														Revenue
													</p>
												</div>
											</div>

											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-1">
													<Star className="w-4 h-4 text-yellow-400 fill-current" />
													<span className="text-sm">
														{course.rating}
													</span>
												</div>
												<div className="flex items-center space-x-2">
													<button className="p-1 hover:bg-white/10 rounded transition-colors">
														<Edit className="w-4 h-4 text-gray-400" />
													</button>
													<button className="p-1 hover:bg-red-500/20 rounded transition-colors">
														<Trash2 className="w-4 h-4 text-red-400" />
													</button>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Recent Activity & Tasks */}
						<div
							className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-900 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							{/* Recent Activity */}
							<div>
								<h2 className="text-2xl font-bold mb-6">
									Recent Activity
								</h2>
								<div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
									<div className="space-y-4">
										{recentActivity.map((activity) => (
											<div
												key={activity.id}
												className="flex items-start space-x-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
												<div
													className={`w-8 h-8 rounded-full flex items-center justify-center ${
														activity.type ===
														"enrollment"
															? "bg-blue-500/20 text-blue-400"
															: activity.type ===
															  "review"
															? "bg-yellow-500/20 text-yellow-400"
															: activity.type ===
															  "question"
															? "bg-purple-500/20 text-purple-400"
															: "bg-green-500/20 text-green-400"
													}`}>
													{activity.type ===
														"enrollment" && (
														<Users className="w-4 h-4" />
													)}
													{activity.type ===
														"review" && (
														<Star className="w-4 h-4" />
													)}
													{activity.type ===
														"question" && (
														<MessageCircle className="w-4 h-4" />
													)}
													{activity.type ===
														"completion" && (
														<Award className="w-4 h-4" />
													)}
												</div>
												<div className="flex-1">
													<p className="text-sm">
														{activity.message}
													</p>
													<div className="flex items-center justify-between mt-1">
														<p className="text-xs text-purple-400">
															{activity.student}
														</p>
														<p className="text-xs text-gray-400">
															{activity.time}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Upcoming Tasks */}
							<div>
								<h2 className="text-2xl font-bold mb-6">
									Upcoming Tasks
								</h2>
								<div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
									<div className="space-y-4">
										{upcomingTasks.map((task) => (
											<div
												key={task.id}
												className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
												<div className="flex items-center space-x-4">
													<div
														className={`w-3 h-3 rounded-full ${
															task.priority ===
															"high"
																? "bg-red-500"
																: task.priority ===
																  "medium"
																? "bg-yellow-500"
																: "bg-green-500"
														}`}></div>
													<div>
														<h3 className="font-semibold">
															{task.title}
														</h3>
														<p className="text-gray-400 text-sm">
															{task.course}
														</p>
														{task.count && (
															<p className="text-purple-400 text-sm">
																{task.count}{" "}
																submissions
															</p>
														)}
													</div>
												</div>

												<div className="text-right">
													<p className="text-sm text-gray-400">
														Due
													</p>
													<p className="font-semibold">
														{task.dueDate}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div
							className={`transition-all duration-1000 delay-1100 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							<h2 className="text-2xl font-bold mb-6">
								Quick Actions
							</h2>

							<div className="grid md:grid-cols-4 gap-4">
								{[
									{
										title: "Create Course",
										icon: <Plus className="w-6 h-6" />,
										color: "from-purple-600 to-blue-600",
										description: "Start a new course",
									},
									{
										title: "Upload Video",
										icon: <Upload className="w-6 h-6" />,
										color: "from-green-600 to-teal-600",
										description: "Add course content",
									},
									{
										title: "View Analytics",
										icon: <BarChart3 className="w-6 h-6" />,
										color: "from-yellow-600 to-orange-600",
										description: "Track performance",
									},
									{
										title: "Schedule Live",
										icon: <Video className="w-6 h-6" />,
										color: "from-pink-600 to-red-600",
										description: "Host live session",
									},
								].map((action, index) => (
									<button
										key={index}
										className="group p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:scale-105 transition-all duration-300 text-left">
										<div
											className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
											{action.icon}
										</div>
										<h3 className="font-semibold mb-2 group-hover:text-purple-300 transition-colors">
											{action.title}
										</h3>
										<p className="text-gray-400 text-sm">
											{action.description}
										</p>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EducatorDashboard;
