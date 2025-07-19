interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	requiredRoles = [],
}) => {
	const { state } = useAuth();
	const location = useLocation();

	// Show loading while checking authentication
	if (state.isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	// Redirect to login if not authenticated
	if (!state.isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	// Check role permissions
	if (requiredRoles.length > 0 && state.user) {
		if (!requiredRoles.includes(state.user.role)) {
			return <Navigate to="/unauthorized" replace />;
		}
	}

	return <>{children}</>;
};
