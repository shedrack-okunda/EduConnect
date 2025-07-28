import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env
	.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const REFRESH_TOKEN_EXPIRES_IN = process.env
	.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"];

// Generate JWT Token
export const generateToken = (userId: string): string => {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Generate Refresh Token
export const generateRefreshToken = (userId: string): string => {
	return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
		expiresIn: REFRESH_TOKEN_EXPIRES_IN,
	});
};
