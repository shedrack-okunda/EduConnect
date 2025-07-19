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
			setError(error.message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create your account
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
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-gray-700">
									First Name
								</label>
								<input
									{...register("firstName", {
										required: "First name is required",
									})}
									type="text"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									placeholder="John"
								/>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-600">
										{errors.firstName.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-700">
									Last Name
								</label>
								<input
									{...register("lastName", {
										required: "Last name is required",
									})}
									type="text"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									placeholder="Doe"
								/>
								{errors.lastName && (
									<p className="mt-1 text-sm text-red-600">
										{errors.lastName.message}
									</p>
								)}
							</div>
						</div>

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
								placeholder="john@example.com"
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="role"
								className="block text-sm font-medium text-gray-700">
								Role
							</label>
							<select
								{...register("role", {
									required: "Role is required",
								})}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
								<option value="">Select a role</option>
								<option value={UserRole.STUDENT}>
									Student
								</option>
								<option value={UserRole.EDUCATOR}>
									Educator
								</option>
							</select>
							{errors.role && (
								<p className="mt-1 text-sm text-red-600">
									{errors.role.message}
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

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700">
								Confirm Password
							</label>
							<input
								{...register("confirmPassword", {
									required: "Please confirm your password",
									validate: (value) =>
										value === password ||
										"Passwords do not match",
								})}
								type="password"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Confirm your password"
							/>
							{errors.confirmPassword && (
								<p className="mt-1 text-sm text-red-600">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={state.isLoading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
							{state.isLoading
								? "Creating account..."
								: "Create account"}
						</button>
					</div>

					<div className="text-center">
						<Link
							to="/login"
							className="font-medium text-blue-600 hover:text-blue-500">
							Already have an account? Sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
