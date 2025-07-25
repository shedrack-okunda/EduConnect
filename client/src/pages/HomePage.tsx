import React, { useState, useEffect } from "react";
import { BookOpen, Users, Award, ArrowRight, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const EduConnectLanding: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [activeFeature, setActiveFeature] = useState(0);

	useEffect(() => {
		setIsVisible(true);
		const interval = setInterval(() => {
			setActiveFeature((prev) => (prev + 1) % 3);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const features = [
		{
			icon: <BookOpen className="w-8 h-8" />,
			title: "Interactive Learning",
			description:
				"Engage with dynamic content, quizzes, and hands-on projects",
		},
		{
			icon: <Users className="w-8 h-8" />,
			title: "Collaborative Environment",
			description:
				"Connect with peers, join study groups, and learn together",
		},
		{
			icon: <Award className="w-8 h-8" />,
			title: "Certified Courses",
			description: "Earn recognized certificates and advance your career",
		},
	];

	const stats = [
		{ number: "50K+", label: "Active Students" },
		{ number: "500+", label: "Expert Instructors" },
		{ number: "98%", label: "Success Rate" },
		{ number: "1M+", label: "Lessons Completed" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
			</div>

			{/* Navigation */}
			<nav
				className={`relative z-50 flex items-center justify-between p-6 transition-all duration-1000 ${
					isVisible
						? "translate-y-0 opacity-100"
						: "-translate-y-10 opacity-0"
				}`}>
				<div className="flex items-center space-x-3">
					<div className="relative">
						<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
							<BookOpen className="w-6 h-6 text-white" />
						</div>
						<div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
					</div>
					<span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
						EduConnect
					</span>
				</div>

				<div className="flex items-center space-x-4">
					<Link to="/login">
						<button className="px-6 py-2 text-gray-300 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-lg">
							Login
						</button>
					</Link>

					<Link to="/register">
						<button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
							Sign Up
						</button>
					</Link>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-32">
				<div className="text-center">
					<div
						className={`transition-all duration-1000 delay-300 ${
							isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}>
						<div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
							<Zap className="w-4 h-4 text-yellow-400" />
							<span className="text-sm">
								Revolutionizing Online Education
							</span>
						</div>

						<h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
							Learn Without
							<span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
								Limits
							</span>
						</h1>

						<p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
							Join thousands of learners advancing their careers
							with interactive courses, expert instructors, and a
							supportive community that grows with you.
						</p>
					</div>

					<div
						className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 transition-all duration-1000 delay-500 ${
							isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}>
						<Link to="/login">
							<button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 flex items-center space-x-2">
								<span>Start Learning Today</span>
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</button>
						</Link>

						{/* <button className="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2">
							<div className="w-10 h-10 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
								<img
									src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23fff' d='M24 9.5c8.103 0 14.5 6.397 14.5 14.5S32.103 38.5 24 38.5 9.5 32.103 9.5 24 15.897 9.5 24 9.5z'/%3E%3Cpath fill='%234285f4' d='M46.98 24.5c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'/%3E%3Cpath fill='%2334a853' d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'/%3E%3Cpath fill='%23fbbc04' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'/%3E%3Cpath fill='%23ea4335' d='M46.98 24.5c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'/%3E%3C/svg%3E"
									alt="Google"
									className="w-5 h-5"
								/>
							</div>
							<span>Continue with Google</span>
						</button> */}
					</div>

					{/* Stats */}
					<div
						className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${
							isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}>
						{stats.map((stat, index) => (
							<div key={index} className="text-center group">
								<div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
									{stat.number}
								</div>
								<div className="text-gray-400 text-sm md:text-base">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Why Choose{" "}
						<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
							EduConnect?
						</span>
					</h2>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Experience learning like never before with our
						cutting-edge platform designed for modern education
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className={`group p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 cursor-pointer transform hover:scale-105 ${
								activeFeature === index
									? "bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20"
									: "bg-white/5 border border-white/10 hover:bg-white/10"
							}`}
							onMouseEnter={() => setActiveFeature(index)}>
							<div
								className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
									activeFeature === index
										? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
										: "bg-white/10 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500"
								}`}>
								{feature.icon}
							</div>
							<h3 className="text-xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
								{feature.title}
							</h3>
							<p className="text-gray-300 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
				<div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12">
					<div className="flex justify-center mb-6">
						<div className="flex -space-x-2">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white/20 flex items-center justify-center">
									<Star className="w-6 h-6 text-white fill-current" />
								</div>
							))}
						</div>
					</div>

					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to Transform Your Future?
					</h2>
					<p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
						Join our community of learners and unlock your potential
						with personalized learning paths
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
						<Link to="/register">
							<button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50">
								Get Started Free
							</button>
						</Link>
						{/* <button className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg transition-all duration-300">
							View Demo
						</button> */}
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div className="flex items-center space-x-3 mb-4 md:mb-0">
							<div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
								<BookOpen className="w-5 h-5 text-white" />
							</div>
							<span className="text-xl font-bold">
								EduConnect
							</span>
						</div>
						<div className="text-gray-400 text-sm">
							© 2025 EduConnect. Empowering minds, one lesson at a
							time.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default EduConnectLanding;
