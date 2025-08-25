// Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const closeSidebar = () => setSidebarOpen(false);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
			{/* Navbar fixed on top */}
			<Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

			{/* Dark overlay when sidebar is open (mobile only) */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/40 z-30 md:hidden"
					onClick={closeSidebar}
				/>
			)}

			{/* Sidebar (fixed under navbar) */}
			<div
				className={`
          fixed top-20 left-0 h-[calc(100vh-5rem)] z-40 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-64
        `}>
				<Sidebar onClose={closeSidebar} />
			</div>

			{/* Main content (scrollable) */}
			<main
				className="pt-20 md:ml-64 min-h-screen overflow-y-auto"
				onClick={() => {
					if (sidebarOpen) closeSidebar(); // click main closes sidebar
				}}>
				<div className="p-4">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Layout;
