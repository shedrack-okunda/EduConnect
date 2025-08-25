import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../types";

const NotFoundPage = () => {
	const navigate = useNavigate();
	const { state } = useAuth();
	const { user } = state;

	// Decide where to send the user based on their role
	const handleGoBack = () => {
		if (!user) {
			navigate("/"); // not logged in → go home
			return;
		}

		switch (user.role) {
			case UserRole.STUDENT:
				navigate("/student");
				break;
			case UserRole.EDUCATOR:
				navigate("/educator");
				break;
			case UserRole.ADMIN:
				navigate("/dashboard");
				break;
			default:
				navigate("/"); // fallback
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
			<AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
			<h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
			<p className="text-gray-400 mb-6">
				Oops! The page you are looking for doesn’t exist.
			</p>
			<button
				onClick={handleGoBack}
				className="mt-6 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
				Go Back to Dashboard
			</button>
		</div>
	);
};

export default NotFoundPage;
