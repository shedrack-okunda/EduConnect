import type { IAuthResponse, IRegisterDTO } from "../../../shared/types";
import type { IUser } from "../types";
import { apiClient } from "../utils/api";

class AuthService {
	// Login
	async login(email: string, password: string): Promise<IAuthResponse> {
		try {
			const response = await apiClient.post("/auth/login", {
				email,
				password,
			});
			return response.data.data;
		} catch (error) {
			console.error(error);

			throw new Error("Login failed");
		}
	}

	// Register
	async register(userData: IRegisterDTO): Promise<IAuthResponse> {
		try {
			const response = await apiClient.post("/auth/register", userData);
			return response.data.data;
		} catch (error) {
			console.error(error);
			throw new Error("Registration failed");
		}
	}

	// Get current user
	async getCurrentUser(): Promise<IUser> {
		try {
			const response = await apiClient.get("/auth/me");
			return response.data.data.user;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to get current user");
		}
	}

	// Refresh token
	async refreshTokens(
		refreshToken: string
	): Promise<{ token: string; refreshToken: string }> {
		try {
			const response = await apiClient.post("/auth/refresh-token", {
				refreshToken,
			});
			return response.data.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to refresh token");
		}
	}

	// Logout
	logout(): void {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
	}
}

export const authService = new AuthService();
