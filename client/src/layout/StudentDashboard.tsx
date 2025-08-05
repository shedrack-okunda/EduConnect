import React, { useEffect, useState } from "react";
import { Play, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { courseService } from "../services/course";
import type { ICourse } from "../../../shared/types";

const StudentDashboard: React.FC = () => {
	const [view, setView] = useState<"all" | "enrolled">("all");
	const [allCourses, setAllCourses] = useState<ICourse[]>([]);
	const [enrolledCourses, setEnrolledCourses] = useState<ICourse[]>([]);
	const [loading, setLoading] = useState(false);
	const { state } = useAuth();
	const { user } = state;

	// Fetch all courses
	useEffect(() => {
		const fetchCourses = async () => {
			setLoading(true);
			try {
				const data = await courseService.getCourses();
				setAllCourses(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	// Fetch enrolled courses when "My Courses" view is active
	useEffect(() => {
		const fetchEnrolledCourses = async () => {
			if (view === "enrolled") {
				setLoading(true);
				try {
					const data = await courseService.enrolledCourses();
					setEnrolledCourses(Array.isArray(data) ? data : []);
				} catch (error) {
					console.error(error);
					setEnrolledCourses([]);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchEnrolledCourses();
	}, [view]);

	const handleEnroll = async (courseId: string) => {
		try {
			await courseService.enrollInCourse(courseId);
			alert("Successfully enrolled!");
			if (view === "enrolled") {
				const updated = await courseService.enrolledCourses();
				setEnrolledCourses(Array.isArray(updated) ? updated : []);
			}
		} catch (error) {
			alert(error || "Enrollment failed");
		}
	};

	const renderCourses = (courses: ICourse[] = []) => (
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
							{typeof course.instructorId === "object"
								? course.instructorId.profile.firstName
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
								style={{ width: `0%` }}></div>
						</div>
					</div>

					{view === "all" && (
						<button
							onClick={() => handleEnroll(course._id)}
							className="flex justify-center w-full bg-purple-500 text-white px-4 py-2 rounded mt-2 hover:bg-purple-600">
							Enroll
						</button>
					)}
				</div>
			))}
		</div>
	);

	return (
		<div className="flex min-h-screen bg-gray-900 text-white">
			{/* Sidebar */}
			<aside className="w-64 bg-gray-800 p-6">
				<h2 className="text-xl font-bold mb-6">
					Welcome, {user?.profile?.firstName}
				</h2>
				<nav className="space-y-4">
					<button
						className={`w-full text-left px-4 py-2 rounded ${
							view === "all"
								? "bg-purple-600 text-white"
								: "hover:bg-gray-700"
						}`}
						onClick={() => setView("all")}>
						All Courses
					</button>
					<button
						className={`w-full text-left px-4 py-2 rounded ${
							view === "enrolled"
								? "bg-purple-600 text-white"
								: "hover:bg-gray-700"
						}`}
						onClick={() => setView("enrolled")}>
						My Courses
					</button>
				</nav>
			</aside>

			{/* Main Content */}
			<main className="flex-1 p-8">
				<h1 className="text-3xl font-bold mb-6">
					{view === "all" ? "All Courses" : "My Enrolled Courses"}
				</h1>

				{loading ? (
					<p>Loading...</p>
				) : view === "all" ? (
					renderCourses(allCourses)
				) : (
					renderCourses(enrolledCourses)
				)}
			</main>
		</div>
	);
};

export default StudentDashboard;
