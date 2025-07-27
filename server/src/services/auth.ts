import jwt from "jsonwebtoken";
import { IAuthResponse, ILoginDTO, IRegisterDTO } from "../types";
import { IUserDocument, User } from "../models/User";

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;
console.log(JWT_SECRET);
const JWT_EXPIRES_IN = process.env
	.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const REFRESH_TOKEN_EXPIRES_IN = process.env
	.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"];

// Generate JWT Token
const generateToken = (userId: string): string => {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
// console.log(generateToken('testUserId'))
// Generate Refresh Token
const generateRefreshToken = (userId: string): string => {
	return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
		expiresIn: REFRESH_TOKEN_EXPIRES_IN,
	});
};

// Register new user
export const register = async (
	userData: IRegisterDTO
): Promise<IAuthResponse> => {
	try {
		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser)
			throw new Error("User already exists with this email");

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

		const token = generateToken(user._id.toString());
		const refreshToken = generateRefreshToken(user._id.toString());

		return {
			user: user.toJSON(),
			token,
			refreshToken,
		};
	} catch (error: any) {
		throw new Error(`Registration failed: ${error.message}`);
	}
};

// Login user
export const login = async (credentials: ILoginDTO): Promise<IAuthResponse> => {
	try {
		const user = await User.findOne({ email: credentials.email }).select(
			"+password"
		);
		if (!user) throw new Error("Invalid credentials");
		if (user.status !== "active") throw new Error("Account is not active");

		const isPasswordValid = await user.comparePassword(
			credentials.password
		);
		if (!isPasswordValid) throw new Error("Invalid credentials");

		const token = generateToken(user._id.toString());
		const refreshToken = generateRefreshToken(user._id.toString());

		return {
			user: user.toJSON(),
			token,
			refreshToken,
		};
	} catch (error: any) {
		throw new Error(`Login failed: ${error.message}`);
	}
};

// Verify token
export const verifyToken = async (token: string): Promise<IUserDocument> => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
		const user = await User.findById(decoded.userId);
		if (!user) throw new Error("User not found");
		return user;
	} catch {
		throw new Error("Invalid token");
	}
};

// Refresh token
export const refreshAuthToken = async (
	refreshToken: string
): Promise<{ token: string; refreshToken: string }> => {
	try {
		const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
			userId: string;
		};
		const user = await User.findById(decoded.userId);
		if (!user) throw new Error("User not found");

		const newToken = generateToken(user._id.toString());
		const newRefreshToken = generateRefreshToken(user._id.toString());

		return {
			token: newToken,
			refreshToken: newRefreshToken,
		};
	} catch {
		throw new Error("Invalid refresh token");
	}
};
