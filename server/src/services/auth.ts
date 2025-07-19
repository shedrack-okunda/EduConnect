import jwt from "jsonwebtoken";
import { IAuthResponse, ILoginDTO, IRegisterDTO } from "../types";
import { IUserDocument, User } from "../models/User";

export class AuthService {
	private readonly JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
	private readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
	private readonly REFRESH_TOKEN_SECRET =
		process.env.REFRESH_TOKEN_SECRET || "your-refresh-secret";
	private readonly REFRESH_TOKEN_EXPIRES_IN =
		process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

	// Generate JWT Token
	private generateToken(userId: string): string {
		return jwt.sign({ userId }, this.JWT_SECRET, {
			expiresIn: this.JWT_EXPIRES_IN,
		});
	}

	// Generate Refresh Token
	private generateRefreshToken(userId: string): string {
		return jwt.sign({ userId }, this.REFRESH_TOKEN_SECRET, {
			expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
		});
	}

	// Register new user
	async register(userData: IRegisterDTO): Promise<IAuthResponse> {
		try {
			// Check if user already exists
			const existingUser = await User.findOne({ email: userData.email });
			if (existingUser) {
				throw new Error("User already exists with this email");
			}

			// Create new user
			const user = new User({
				email: userData.email,
				password: userData.password,
				role: userData.role,
				profile: {
					firstName: userData.profile.firstName,
					lastName: userData.profile.lastName,
					skills: [],
					interests: [],
					preferences: {
						notifications: {
							email: true,
							push: true,
							marketing: false,
						},
						privacy: {
							profileVisibility: "public",
							showEmail: false,
						},
						theme: "system",
					},
				},
			});

			await user.save();

			// Generate tokens
			const token = this.generateToken(user._id.toString());
			const refreshToken = this.generateRefreshToken(user._id.toString());

			return {
				user: user.toJSON(),
				token,
				refreshToken,
			};
		} catch (error) {
			throw new Error(`Registration failed: ${error.message}`);
		}
	}

	// Login user
	async login(credentials: ILoginDTO): Promise<IAuthResponse> {
		try {
			// Find user by email
			const user = await User.findOne({ email: credentials.email });
			if (!user) {
				throw new Error("Invalid credentials");
			}

			// Check if user is active
			if (user.status !== "active") {
				throw new Error("Account is not active");
			}

			// Compare password
			const isPasswordValid = await user.comparePassword(
				credentials.password
			);
			if (!isPasswordValid) {
				throw new Error("Invalid credentials");
			}

			// Generate tokens
			const token = this.generateToken(user._id.toString());
			const refreshToken = this.generateRefreshToken(user._id.toString());

			return {
				user: user.toJSON(),
				token,
				refreshToken,
			};
		} catch (error) {
			throw new Error(`Login failed: ${error.message}`);
		}
	}

	// Verify token
	async verifyToken(token: string): Promise<IUserDocument> {
		try {
			const decoded = jwt.verify(token, this.JWT_SECRET) as {
				userId: string;
			};
			const user = await User.findById(decoded.userId);

			if (!user) {
				throw new Error("User not found");
			}

			return user;
		} catch (error) {
			throw new Error("Invalid token");
		}
	}

	// Refresh token
	async refreshToken(
		refreshToken: string
	): Promise<{ token: string; refreshToken: string }> {
		try {
			const decoded = jwt.verify(
				refreshToken,
				this.REFRESH_TOKEN_SECRET
			) as { userId: string };
			const user = await User.findById(decoded.userId);

			if (!user) {
				throw new Error("User not found");
			}

			const newToken = this.generateToken(user._id.toString());
			const newRefreshToken = this.generateRefreshToken(
				user._id.toString()
			);

			return {
				token: newToken,
				refreshToken: newRefreshToken,
			};
		} catch (error) {
			throw new Error("Invalid refresh token");
		}
	}
}
