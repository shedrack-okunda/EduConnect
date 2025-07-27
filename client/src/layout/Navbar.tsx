import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { state, logout } = useAuth();
	const { user, isAuthenticated } = state;
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsVisible(true);
	}, []);

	if (!isAuthenticated || !user) return null;

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
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
							{user?.role.charAt(0).toUpperCase() +
								user?.role.slice(1)}
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
							<Link to="/profile">
								<span className="font-medium">
									{user?.profile?.firstName || "Educator"}
								</span>
							</Link>
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
	);
};

export default Navbar;
