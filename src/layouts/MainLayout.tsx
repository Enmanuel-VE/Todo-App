import { Outlet } from "react-router";
import Dock from "../components/Molecules/Dock";

function MainLayout() {
	return (
		<div id="main-layout" className="flex flex-col h-screen bg-[#F6F6F6]">
			<main className="flex flex-col flex-1 overflow-auto ">
				<Outlet />
			</main>
			<Dock />
		</div>
	);
}

export default MainLayout;
