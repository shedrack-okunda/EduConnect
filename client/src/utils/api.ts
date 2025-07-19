import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.VITE_API || "http://localhost:5000/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				if (refreshToken) {
					const response = await axios.post("/auth/refresh", {
						refreshToken,
					});
					const { token: newToken, refreshToken: newRefreshToken } =
						response.data.data;

					localStorage.setItem("token", newToken);
					localStorage.setItem("refreshToken", newRefreshToken);

					originalRequest.headers.Authorization = `Bearer ${newToken}`;
					return apiClient(originalRequest);
				}
			} catch (refreshError) {
				localStorage.removeItem("token");
				localStorage.removeItem("refreshToken");
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	}
);

export { apiClient };
