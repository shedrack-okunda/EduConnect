import React, {
	createContext,
	useContext,
	useEffect,
	useReducer,
	type ReactNode,
} from "react";
import type { IUser } from "../types";
import type { IAuthResponse } from "../../../server/src/types";

// Auth State Interface
interface AuthState {
	user: IUser | null;
	token: string | null;
	isLoading: boolean;
	isAuthenticated: boolean;
}

// Auth Actions
type AuthAction =
	| { type: "SET_LOADING"; payload: boolean }
	| { type: "SET_USER"; payload: IUser }
	| { type: "SET_TOKEN"; payload: string }
	| { type: "LOGIN_SUCCESS"; payload: IAuthResponse }
	| { type: "LOGOUT" }
	| { type: "UPDATE_USER"; payload: Partial<IUser> };

// Auth Context Interface
interface AuthContextType {
	state: AuthState;
	login: (email: string, password: string) => Promise<void>;
	register: (userData: any) => Promise<void>;
	logout: () => void;
	updateUser: (userData: Partial<IUser>) => void;
}

// Initial State
const initialState: AuthState = {
	user: null,
	token: null,
	isLoading: false,
	isAuthenticated: false,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, isLoading: action.payload };
		case "SET_USER":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "SET_TOKEN":
			return { ...state, token: action.payload };
		case "LOGIN_SUCCESS":
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("refreshToken", action.payload.refreshToken);
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				isAuthenticated: true,
				isLoading: false,
			};
		case "LOGOUT":
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
			return {
				...state,
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false,
			};
		case "UPDATE_USER":
			return {
				...state,
				user: state.user ? { ...state.user, ...action.payload } : null,
			};
		default:
			return state;
	}
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Initialize auth state
	useEffect(() => {
		const initializeAuth = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					dispatch({ type: "SET_LOADING", payload: true });
					const user = await authService.getCurrentUser();
					dispatch({ type: "SET_USER", payload: user });
					dispatch({ type: "SET_TOKEN", payload: token });
				} catch (error) {
					localStorage.removeItem("token");
					localStorage.removeItem("refreshToken");
				} finally {
					dispatch({ type: "SET_LOADING", payload: false });
				}
			}
		};

		initializeAuth();
	}, []);

	// Login function
	const login = async (email: string, password: string): Promise<void> => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			const response = await authService.login(email, password);
			dispatch({ type: "LOGIN_SUCCESS", payload: response });
		} catch (error) {
			dispatch({ type: "SET_LOADING", payload: false });
			throw error;
		}
	};

	// Register function
	const register = async (userData: any): Promise<void> => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			const response = await authService.register(userData);
			dispatch({ type: "LOGIN_SUCCESS", payload: response });
		} catch (error) {
			dispatch({ type: "SET_LOADING", payload: false });
			throw error;
		}
	};

	// Logout function
	const logout = (): void => {
		dispatch({ type: "LOGOUT" });
	};

	// Update user function
	const updateUser = (userData: Partial<IUser>): void => {
		dispatch({ type: "UPDATE_USER", payload: userData });
	};

	const contextValue: AuthContextType = {
		state,
		login,
		register,
		logout,
		updateUser,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
