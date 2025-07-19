import { IUserDocument } from "../models/User";
import { AuthService } from "../services/auth";
import { Request, Response, NextFunction } from "express";

// Extend Express Request interface
declare global {
	namespace Express {
		interface Request {
			user?: IUserDocument;
		}
	}
}

export class AuthMiddleware {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	// Authenticate user
	authenticate = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const token = this.extractTokenFromHeader(req);

			if (!token) {
				res.status(401).json({ error: "Access token required" });
				return;
			}

			const user = await this.authService.verifyToken(token);
			req.user = user;
			next();
		} catch (error) {
			res.status(401).json({ error: "Invalid or expired token" });
		}
	};

	// Extract token from Authorization header
	private extractTokenFromHeader(req: Request): string | null {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return null;
		}
		return authHeader.substring(7);
	}
}
