// src/pages/HomePage.tsx
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
			<div className="max-w-xl text-center">
				<h1 className="text-4xl font-bold text-blue-700 mb-4">
					Welcome to EduConnect
				</h1>
				<p className="text-gray-700 mb-6">
					Empowering students and educators to connect, grow, and
					showcase their skills.
				</p>

				<div className="space-x-4">
					<Link
						to="/login"
						className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
						Login
					</Link>
					<Link
						to="/register"
						className="inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition">
						Register
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
