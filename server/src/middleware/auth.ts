import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth";

// Extract token from Authorization header
const extractTokenFromHeader = (req: Request): string | null => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return null;
	}
	return authHeader.substring(7);
};

// Authenticate middleware
export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const token = extractTokenFromHeader(req);

		if (!token) {
			res.status(401).json({ error: "Access token required" });
			return;
		}

		const user = await verifyToken(token);
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid or expired token" });
	}
};
