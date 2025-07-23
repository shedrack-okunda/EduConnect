import type React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="p-6 bg-white rounded shadow text-center">
				<h1 className="text-2xl font-bold text-red-600">
					Unauthorized
				</h1>
				<p className="text-gray-600 mt-2">
					You do not have access to this page.
				</p>
				<button
					onClick={() => navigate("/dashboard")}
					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
					Go to Dashboard
				</button>
			</div>
		</div>
	);
};

export default UnauthorizedPage;
