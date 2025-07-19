import { UserRole } from "../types";
import { Request, Response, NextFunction } from "express";

export class RBACMiddleware {
	// Check if user has required role
	static requireRole(roles: UserRole[]) {
		return (req: Request, res: Response, next: NextFunction): void => {
			if (!req.user) {
				res.status(401).json({ error: "Authentication required" });
				return;
			}

			if (!roles.includes(req.user.role)) {
				res.status(403).json({ error: "Insufficient permissions" });
				return;
			}

			next();
		};
	}

	// Check if user is admin
	static requireAdmin = RBACMiddleware.requireRole([UserRole.ADMIN]);

	// Check if user is educator or admin
	static requireEducatorOrAdmin = RBACMiddleware.requireRole([
		UserRole.EDUCATOR,
		UserRole.ADMIN,
	]);

	// Check if user is student, educator, or admin
	static requireAnyRole = RBACMiddleware.requireRole([
		UserRole.STUDENT,
		UserRole.EDUCATOR,
		UserRole.ADMIN,
	]);
}
