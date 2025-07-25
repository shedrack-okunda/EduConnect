import { useForm } from "react-hook-form";
import { UserRole } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	ArrowLeft,
	BookOpen,
	Eye,
	EyeOff,
	GraduationCap,
	Lock,
	Mail,
	User,
} from "lucide-react";

interface RegisterFormData {
	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	role: UserRole;
}

export const RegisterForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<RegisterFormData>();
	const { register: registerUser, state } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState<string>("");
	const [isVisible, setIsVisible] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const password = watch("password");

	const onSubmit = async (data: RegisterFormData) => {
		try {
			setError("");
			await registerUser({
				email: data.email,
				password: data.password,
				role: data.role,
				profile: {
					firstName: data.firstName,
					lastName: data.lastName,
				},
			});
			navigate("/dashboard");
		} catch (error) {
			console.error(error);
			setError("Failed to create account. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
			</div>

			<nav
				className={`relative z-50 flex items-center justify-between p-6 transition-all duration-1000 ${
					isVisible
						? "translate-y-0 opacity-100"
						: "-translate-y-10 opacity-0"
				}`}>
				<Link to="/">
					<button className="flex items-center space-x-3 group">
						<div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
							<ArrowLeft className="w-5 h-5" />
						</div>
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
					</button>
				</Link>

				<div className="text-sm text-gray-400">
					Already have an account?{" "}
					<a
						href="/login"
						className="text-purple-400 hover:text-purple-300 transition-colors">
						Sign In
					</a>
				</div>
			</nav>

			<div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-8">
				<div
					className={`w-full max-w-md transition-all duration-1000 delay-300 ${
						isVisible
							? "translate-y-0 opacity-100"
							: "translate-y-10 opacity-0"
					}`}>
					<div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold mb-2">
								Create Account
							</h1>
							<p className="text-gray-300">
								Start your learning adventure today
							</p>
						</div>

						<form
							className="mt-8 space-y-6"
							onSubmit={handleSubmit(onSubmit)}>
							{error && (
								<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
									{error}
								</div>
							)}

							<div className="space-y-6">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<label
											htmlFor="firstName"
											className="block text-sm font-medium text-gray-300">
											First Name
										</label>
										<div className="relative">
											<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												{...register("firstName", {
													required:
														"First name is required",
												})}
												type="text"
												className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
												placeholder="John"
											/>
										</div>

										{errors.firstName && (
											<p className="mt-1 text-sm text-red-600">
												{errors.firstName.message}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<label
											htmlFor="lastName"
											className="block text-sm font-medium text-gray-300">
											Last Name
										</label>
										<div className="relative">
											<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												{...register("lastName", {
													required:
														"Last name is required",
												})}
												type="text"
												className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
												placeholder="Doe"
											/>
										</div>

										{errors.lastName && (
											<p className="mt-1 text-sm text-red-600">
												{errors.lastName.message}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-300">
										Email address
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
										<input
											{...register("email", {
												required: "Email is required",
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													message:
														"Invalid email address",
												},
											})}
											type="email"
											className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
											placeholder="john@example.com"
										/>
									</div>

									{errors.email && (
										<p className="mt-1 text-sm text-red-600">
											{errors.email.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<label
										htmlFor="role"
										className="block text-sm font-medium text-gray-300">
										I am a
									</label>
									<div className="relative">
										<GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

										<select
											{...register("role", {
												required: "Role is required",
											})}
											className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white flex items-center justify-between">
											<option
												value=""
												className="ml-6 text-gray-400">
												Select your role
											</option>
											<option
												className="w-full text-gray-400 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 first:rounded-t-xl last:rounded-b-xl"
												value={UserRole.STUDENT}>
												Student
											</option>
											<option
												className="w-full text-gray-400 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 first:rounded-t-xl last:rounded-b-xl"
												value={UserRole.EDUCATOR}>
												Educator
											</option>
										</select>
									</div>

									{errors.role && (
										<p className="mt-1 text-sm text-red-600">
											{errors.role.message}
										</p>
									)}
								</div>

								<div className="grid grid-cols-1 gap-4">
									<div className="space-y-2">
										<label
											htmlFor="password"
											className="block text-sm font-medium text-gray-300">
											Password
										</label>
										<div className="relative">
											<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												{...register("password", {
													required:
														"Password is required",
													minLength: {
														value: 8,
														message:
															"Password must be at least 8 characters",
													},
												})}
												type={
													showPassword
														? "text"
														: "password"
												}
												className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
												placeholder="Enter your password"
											/>
											<button
												type="button"
												onClick={() =>
													setShowPassword(
														!showPassword
													)
												}
												className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
												{showPassword ? (
													<EyeOff className="w-5 h-5" />
												) : (
													<Eye className="w-5 h-5" />
												)}
											</button>
										</div>
										{errors.password && (
											<p className="mt-1 text-sm text-red-600">
												{errors.password.message}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<label
											htmlFor="confirmPassword"
											className="block text-sm font-medium text-gray-300">
											Confirm Password
										</label>
										<div className="relative">
											<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												{...register(
													"confirmPassword",
													{
														required:
															"Please confirm your password",
														validate: (value) =>
															value ===
																password ||
															"Passwords do not match",
													}
												)}
												type={
													showConfirmPassword
														? "text"
														: "password"
												}
												className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
												placeholder="Confirm your password"
											/>
											<button
												type="button"
												onClick={() =>
													setShowConfirmPassword(
														!showConfirmPassword
													)
												}
												className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
												{showConfirmPassword ? (
													<EyeOff className="w-5 h-5" />
												) : (
													<Eye className="w-5 h-5" />
												)}
											</button>
										</div>

										{errors.confirmPassword && (
											<p className="mt-1 text-sm text-red-600">
												{errors.confirmPassword.message}
											</p>
										)}
									</div>
								</div>
							</div>

							<div>
								<button
									type="submit"
									disabled={state.isLoading}
									className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
									{state.isLoading
										? "Creating account..."
										: "Create account"}
								</button>
							</div>

							{/* <div className="relative my-6">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-white/20"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-400">
										Or continue with
									</span>
								</div>
							</div>

							<button
								type="button"
								className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3">
								<div className="w-6 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
									<img
										src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23fff' d='M24 9.5c8.103 0 14.5 6.397 14.5 14.5S32.103 38.5 24 38.5 9.5 32.103 9.5 24 15.897 9.5 24 9.5z'/%3E%3Cpath fill='%234285f4' d='M46.98 24.5c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'/%3E%3Cpath fill='%2334a853' d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'/%3E%3Cpath fill='%23fbbc04' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'/%3E%3Cpath fill='%23ea4335' d='M46.98 24.5c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'/%3E%3C/svg%3E"
										alt="Google"
										className="w-4 h-4"
									/>
								</div>
								<span>Continue with Google</span>
							</button> */}

							<div className="text-center mt-8 pt-6 border-t border-white/10">
								<p className="text-gray-300">
									Already have an account?{" "}
									<a
										href="/login"
										className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
										Sign In
									</a>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
