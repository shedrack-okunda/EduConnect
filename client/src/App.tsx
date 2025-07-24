import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RegisterForm } from "./components/auth/RegisterForm";
import { LoginForm } from "./components/auth/LoginForm";
import Dashboard from "./layout/Dashboard";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { UserRole } from "./types";
import HomePage from "./pages/HomePage";
import Navbar from "./layout/Navbar";
import ProfilePage from "./layout/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import EditEducationPage from "./pages/EditEducationPage";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/login" element={<LoginForm />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute
							requiredRoles={[
								UserRole.STUDENT,
								UserRole.EDUCATOR,
								UserRole.ADMIN,
							]}>
							<Dashboard />
						</ProtectedRoute>
					}
				/>{" "}
				<Route
					path="/profile"
					element={
						<ProtectedRoute
							requiredRoles={[
								UserRole.STUDENT,
								UserRole.EDUCATOR,
								UserRole.ADMIN,
							]}>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile/edit"
					element={
						<ProtectedRoute
							requiredRoles={[
								UserRole.STUDENT,
								UserRole.EDUCATOR,
								UserRole.ADMIN,
							]}>
							<EditProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/education/edit"
					element={
						<ProtectedRoute
							requiredRoles={[
								UserRole.STUDENT,
								UserRole.EDUCATOR,
								UserRole.ADMIN,
							]}>
							<EditEducationPage />
						</ProtectedRoute>
					}
				/>
				<Route path="/unauthorized" element={<UnauthorizedPage />} />
			</Routes>
		</Router>
	);
}

export default App;
