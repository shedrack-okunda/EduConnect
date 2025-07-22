import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface LoginFormData {
	email: string;
	password: string;
}

export const LoginForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();
	const { login, state } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState<string>("");

	const onSubmit = async (data: LoginFormData) => {
		try {
			setError("");
			await login(data.email, data.password);
			navigate("/dashboard");
		} catch (error) {
			console.error(error);
			setError("Login failed. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form
					className="mt-8 space-y-6"
					onSubmit={handleSubmit(onSubmit)}>
					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
							{error}
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<input
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
								type="email"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter your email"
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 8,
										message:
											"Password must be at least 8 characters",
									},
								})}
								type="password"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter your password"
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={state.isLoading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
							{state.isLoading ? "Signing in..." : "Sign in"}
						</button>
					</div>

					<div className="text-center">
						<Link
							to="/register"
							className="font-medium text-blue-600 hover:text-blue-500">
							Don't have an account? Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
