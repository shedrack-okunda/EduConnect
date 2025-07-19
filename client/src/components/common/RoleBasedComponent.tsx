interface RoleBasedComponentProps {
	children: React.ReactNode;
	allowedRoles: UserRole[];
	fallback?: React.ReactNode;
}

export const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
	children,
	allowedRoles,
	fallback = null,
}) => {
	const { state } = useAuth();

	if (!state.user || !allowedRoles.includes(state.user.role)) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
};
