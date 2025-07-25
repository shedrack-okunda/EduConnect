import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RegisterForm } from "./components/auth/RegisterForm";
import { LoginForm } from "./components/auth/LoginForm";
import Dashboard from "./layout/Dashboard";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { UserRole } from "./types";
import Navbar from "./layout/Navbar";
import ProfilePage from "./layout/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import { EducationManager } from "./components/profile/EducationManager";
import { useAuth } from "./context/AuthContext";
import { SkillsManager } from "./components/profile/SkillsManger";
import { InterestsManager } from "./components/profile/InterestManager";
import { ExperienceManager } from "./components/profile/ExperienceManger";
import EduConnectLanding from "./pages/HomePage";

function App() {
	const { state } = useAuth();
	const { user } = state;
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<EduConnectLanding />} />
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
							<EducationManager
								onEducationUpdate={() => {}}
								education={user?.profile?.education || []}
							/>{" "}
						</ProtectedRoute>
					}
				/>
				<Route
					path="/skills/edit"
					element={
						<ProtectedRoute
							requiredRoles={[
								UserRole.STUDENT,
								UserRole.EDUCATOR,
								UserRole.ADMIN,
							]}>
							<SkillsManager
								onSkillsUpdate={() => {}}
								skills={user?.profile?.skills || []}
							/>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/interests/edit"
					element={
						<ProtectedRoute
							requiredRoles={[
								UserRole.STUDENT,
								UserRole.EDUCATOR,
								UserRole.ADMIN,
							]}>
							<InterestsManager
								onInterestsUpdate={() => {}}
								interests={user?.profile?.interests || []}
							/>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/experience/edit"
					element={
						<ProtectedRoute>
							<ExperienceManager
								onExperienceUpdate={() => {}}
								experience={user?.profile?.experience || []}
							/>
						</ProtectedRoute>
					}
				/>
				<Route path="/unauthorized" element={<UnauthorizedPage />} />
			</Routes>
		</Router>
	);
}

export default App;
