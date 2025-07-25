import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen } from "lucide-react";

const Navbar = () => {
	const { state, logout } = useAuth();
	const { user, isAuthenticated } = state;
	const navigate = useNavigate();

	if (!isAuthenticated || !user) return null;

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<nav className="fixed w-full top-0  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white shadow px-6 py-3 flex justify-between items-center">
			<div className="flex items-center space-x-3">
				<div className="relative">
					<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
						<BookOpen className="w-6 h-6 text-white" />
					</div>
					<div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
				</div>
				<Link
					to="/dashboard"
					className="text-xl font-bold text-blue-600">
					<span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
						EduConnect
					</span>
				</Link>
			</div>
			<div className="flex items-center space-x-4">
				<span className="text-sm text-white capitalize">
					{user.role}
				</span>

				<Link to="/profile">
					<img
						src={`https://ui-avatars.com/api/?name=${
							user.profile?.firstName || "User"
						}`}
						alt="Profile"
						className="w-8 h-8 rounded-full border-2 border-blue-500 cursor-pointer"
					/>
				</Link>

				<button
					onClick={handleLogout}
					className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-200">
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
