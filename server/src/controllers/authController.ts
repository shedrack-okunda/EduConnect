import { login, refreshAuthToken, register } from "../services/auth";
import { ILoginDTO, IRegisterDTO } from "../types";
import { Request, Response } from "express";

// Register new user
export const registerUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const userData: IRegisterDTO = req.body;
		const result = await register(userData);

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: result,
		});
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const credentials: ILoginDTO = req.body;
		const result = await login(credentials);

		res.status(200).json({
			success: true,
			message: "Login successful",
			data: result,
		});
	} catch (error: any) {
		res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

// Refresh token
export const refreshToken = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { refreshToken: token } = req.body;
		const result = await refreshAuthToken(token);

		res.status(200).json({
			success: true,
			message: "Token refreshed successfully",
			data: result,
		});
	} catch (error: any) {
		res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

// Get current user
export const me = async (req: Request, res: Response): Promise<void> => {
	try {
		res.status(200).json({
			success: true,
			message: "User data retrieved successfully",
			data: { user: req.user },
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
