import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
	BookOpen,
	GraduationCap,
	LayoutDashboard,
	User,
	LogOut,
	X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavItem {
	label: string;
	path: string;
	icon: React.ReactNode;
	roles: string[];
}

interface SidebarProps {
	onClose?: () => void; // new prop to close on mobile
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
	const { state, logout } = useAuth();
	const { user } = state;
	const location = useLocation();

	if (!user) return null;

	const navItems: NavItem[] = [
		{
			label: "Dashboard",
			path: "/educator",
			icon: <LayoutDashboard className="w-5 h-5" />,
			roles: ["educator", "admin"],
		},
		{
			label: "Dashboard",
			path: "/student/all",
			icon: <LayoutDashboard className="w-5 h-5" />,
			roles: ["student"],
		},
		{
			label: "My Courses",
			path: "/student/enrolled",
			icon: <BookOpen className="w-5 h-5" />,
			roles: ["student"],
		},
		{
			label: "Finished Courses",
			path: "/student/completed",
			icon: <GraduationCap className="w-5 h-5" />,
			roles: ["student"],
		},
		{
			label: "Courses",
			path: "/educator/courses",
			icon: <GraduationCap className="w-5 h-5" />,
			roles: ["educator"],
		},
		{
			label: "Profile",
			path: "/profile",
			icon: <User className="w-5 h-5" />,
			roles: ["student", "educator", "admin"],
		},
		{
			label: "Edit Profile",
			path: "/profile/edit",
			icon: <User className="w-5 h-5" />,
			roles: ["student", "educator", "admin"],
		},
		{
			label: "My Education",
			path: "/profile#education",
			icon: <GraduationCap className="w-5 h-5" />,
			roles: ["student", "educator", "admin"],
		},
		{
			label: "My Experience",
			path: "/profile#experience",
			icon: <BookOpen className="w-5 h-5" />,
			roles: ["student", "educator", "admin"],
		},
	];

	return (
		<aside className="w-64 h-full bg-gray-800 text-white flex flex-col">
			{/* Header */}
			<div className="p-6 border-b border-gray-700 shrink-0 flex justify-between items-center">
				<h2 className="text-lg font-bold">
					Welcome, {user.profile?.firstName || "User"}
				</h2>
				{/* Close button (mobile only) */}
				<button
					className="md:hidden text-gray-300 hover:text-white"
					onClick={onClose}>
					<X className="w-6 h-6" />
				</button>
			</div>

			{/* Nav Links (scrollable) */}
			<nav className="flex-1 overflow-y-auto p-4 space-y-2">
				{navItems
					.filter((item) => item.roles.includes(user.role))
					.map((item) => {
						const isActive = location.pathname.startsWith(
							item.path
						);
						return (
							<Link
								key={item.path}
								to={item.path}
								className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
									isActive
										? "bg-purple-600 text-white"
										: "text-gray-300 hover:bg-gray-700"
								}`}>
								{item.icon}
								<span>{item.label}</span>
							</Link>
						);
					})}
			</nav>

			{/* Logout (always visible at bottom) */}
			<div className="p-4 border-t border-gray-700 shrink-0">
				<button
					onClick={logout}
					className="flex items-center gap-3 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
					<LogOut className="w-5 h-5" />
					Logout
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
