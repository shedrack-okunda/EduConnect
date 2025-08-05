import React, { useState, useEffect } from "react";
import { Play, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { courseService } from "../services/course";
import type { ICourse } from "../../../shared/types";

const StudentDashboard: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [courses, setCourses] = useState<ICourse[]>([]);
	const { state } = useAuth();
	const { user } = state;

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const data = await courseService.getCourses();
				setCourses(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchCourses();
		setIsVisible(true);
	}, []);

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
								{courses.map((course) => (
									<div
										key={course._id}
										className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
										<div className="relative">
											<img
												src={
													course.language ||
													"https://via.placeholder.com/400x200"
												}
												alt={course.title}
												className="w-full h-40 object-cover"
											/>
											<div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												<div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
													<Play className="w-6 h-6 ml-1" />
												</div>
											</div>
											<div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
												{course.duration || "N/A"}
											</div>
										</div>

										<div className="p-4">
											<h3 className="font-semibold mb-2 group-hover:text-purple-300 transition-colors">
												{course.title}
											</h3>
											<p className="text-gray-400 text-sm mb-3">
												by{" "}
												{typeof course.instructorId ===
												"object"
													? course.instructorId
															.profile.firstName
													: "Unknown"}
											</p>

											<div className="flex items-center justify-between mb-3">
												<div className="flex items-center space-x-1">
													<Star className="w-4 h-4 text-yellow-400 fill-current" />
													<span className="text-sm">
														{course.rating || "N/A"}
													</span>
												</div>
												<span className="text-sm text-gray-400">
													0% complete
												</span>
											</div>

											<div className="w-full bg-gray-700 rounded-full h-2">
												<div
													className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
													style={{
														width: `0%`,
													}}></div>
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
