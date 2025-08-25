import type React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-purple-700">
			<div className="p-8 bg-purple-600/20 border border-purple-400/30 rounded-2xl shadow-lg text-center max-w-md">
				<h1 className="text-3xl font-bold text-purple-100">
					Unauthorized
				</h1>
				<p className="text-purple-300 mt-3">
					You do not have access to this page.
				</p>
				<button
					onClick={() => navigate("/")}
					className="mt-6 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
					Go to Home
				</button>
			</div>
		</div>
	);
};

export default UnauthorizedPage;
