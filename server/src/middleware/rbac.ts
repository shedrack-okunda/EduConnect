import { UserRole } from "../types";
import { Request, Response, NextFunction } from "express";

// Core role-check middleware generator
export const requireRole = (roles: UserRole[]) => {
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
};

// Pre-configured role-based middleware
export const requireAdmin = requireRole([UserRole.ADMIN]);

export const requireEducatorOrAdmin = requireRole([
	UserRole.EDUCATOR,
	UserRole.ADMIN,
]);

export const requireAnyRole = requireRole([
	UserRole.STUDENT,
	UserRole.EDUCATOR,
	UserRole.ADMIN,
]);
