import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const { state, logout } = useAuth();
	const { user, isAuthenticated } = state;
	const navigate = useNavigate();

	if (!isAuthenticated || !user) return null;

	const handleLogout = () => {
		logout(); // calls the context logout
		navigate("/login"); // redirects to login
	};

	return (
		<nav className="fixed w-full top-0 bg-white shadow px-6 py-3 flex justify-between items-center">
			<Link to="/dashboard" className="text-xl font-bold text-blue-600">
				EduConnect
			</Link>

			<div className="flex items-center space-x-4">
				<span className="text-sm text-gray-600 capitalize">
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
