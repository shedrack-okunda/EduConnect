import { AuthService } from "../services/auth";
import { ILoginDTO, IRegisterDTO } from "../types";
import { Request, Response } from "express";

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	// Register new user
	register = async (req: Request, res: Response): Promise<void> => {
		try {
			const userData: IRegisterDTO = req.body;
			const result = await this.authService.register(userData);

			res.status(201).json({
				success: true,
				message: "User registered successfully",
				data: result,
			});
		} catch (error) {
			res.status(400).json({
				success: false,
				message: error.message,
			});
		}
	};

	// Login user
	login = async (req: Request, res: Response): Promise<void> => {
		try {
			const credentials: ILoginDTO = req.body;
			const result = await this.authService.login(credentials);

			res.status(200).json({
				success: true,
				message: "Login successful",
				data: result,
			});
		} catch (error) {
			res.status(401).json({
				success: false,
				message: error.message,
			});
		}
	};

	// Refresh token
	refreshToken = async (req: Request, res: Response): Promise<void> => {
		try {
			const { refreshToken } = req.body;
			const result = await this.authService.refreshToken(refreshToken);

			res.status(200).json({
				success: true,
				message: "Token refreshed successfully",
				data: result,
			});
		} catch (error) {
			res.status(401).json({
				success: false,
				message: error.message,
			});
		}
	};

	// Get current user
	me = async (req: Request, res: Response): Promise<void> => {
		try {
			res.status(200).json({
				success: true,
				message: "User data retrieved successfully",
				data: { user: req.user },
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};
}
