import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
			<Navbar />
			<div className="pt-20 px-4">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
