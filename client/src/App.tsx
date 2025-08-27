import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RegisterForm } from "./components/auth/RegisterForm";
import { LoginForm } from "./components/auth/LoginForm";
import Dashboard from "./layout/Dashboard";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { UserRole } from "./types";
import ProfilePage from "./layout/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import { useAuth } from "./context/AuthContext";
import { SkillsManager } from "./components/profile/SkillsManger";
import { InterestsManager } from "./components/profile/InterestManager";
import { ExperienceManager } from "./components/profile/ExperienceManger";
import EduConnectLanding from "./pages/HomePage";
import StudentDashboard from "./layout/StudentDashboard";
import EducatorDashboard from "./layout/EducatorDashboard";
import Layout from "./layout/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import { CourseDashboard } from "./components/course/CourseDashboard";
import { EducationManager } from "./components/profile/EducationManager";

function App() {
	const { state } = useAuth();
	const { user } = state;

	return (
		<Router>
			<Routes>
				{/* public routes */}
				<Route path="/" element={<EduConnectLanding />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/unauthorized" element={<UnauthorizedPage />} />

				{/* protected routes */}
				<Route
					element={
						<ProtectedRoute
							requiredRoles={[
								UserRole.STUDENT,
								UserRole.EDUCATOR,
								UserRole.ADMIN,
							]}>
							<Layout />
						</ProtectedRoute>
					}>
					<Route path="/dashboard" element={<Dashboard />} />

					<Route path="/student" element={<StudentDashboard />} />
					<Route path="/student/all" element={<StudentDashboard />} />
					<Route
						path="/student/enrolled"
						element={<StudentDashboard />}
					/>
					<Route
						path="/student/completed"
						element={<StudentDashboard />}
					/>

					<Route path="/educator" element={<EducatorDashboard />} />
					<Route
						path="/educator/courses"
						element={<CourseDashboard />}
					/>
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/profile/edit" element={<EditProfilePage />} />

					<Route
						path="/education/edit"
						element={
							<EducationManager
								onEducationUpdate={() => {}}
								education={user?.profile?.education || []}
							/>
						}
					/>

					<Route
						path="/skills/edit"
						element={
							<SkillsManager
								onSkillsUpdate={() => {}}
								skills={user?.profile?.skills || []}
							/>
						}
					/>

					<Route
						path="/interests/edit"
						element={
							<InterestsManager
								onInterestsUpdate={() => {}}
								interests={user?.profile?.interests || []}
							/>
						}
					/>

					<Route
						path="/experience/edit"
						element={
							<ExperienceManager
								onExperienceUpdate={() => {}}
								experience={user?.profile?.experience || []}
							/>
						}
					/>
				</Route>

				{/* catch-all for unknown routes */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}

export default App;
