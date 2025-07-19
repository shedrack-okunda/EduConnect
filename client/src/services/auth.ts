import type { IAuthResponse, IRegisterDTO } from "../../../server/src/types";
import type { IUser } from "../types";

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
			throw new Error(error.response?.data?.message || "Login failed");
		}
	}

	// Register
	async register(userData: IRegisterDTO): Promise<IAuthResponse> {
		try {
			const response = await apiClient.post("/auth/register", userData);
			return response.data.data;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Registration failed"
			);
		}
	}

	// Get current user
	async getCurrentUser(): Promise<IUser> {
		try {
			const response = await apiClient.get("/auth/me");
			return response.data.data.user;
		} catch (error) {
			throw new Error("Failed to get current user");
		}
	}

	// Refresh token
	async refreshToken(
		refreshToken: string
	): Promise<{ token: string; refreshToken: string }> {
		try {
			const response = await apiClient.post("/auth/refresh", {
				refreshToken,
			});
			return response.data.data;
		} catch (error) {
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
