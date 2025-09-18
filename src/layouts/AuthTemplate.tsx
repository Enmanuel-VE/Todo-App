import { Outlet } from "react-router";

function AuthTemplate() {
	return (
		<section className="bg-[#F6F6F6] justify-center items-center flex h-screen">
			<Outlet />
		</section>
	);
}

export default AuthTemplate;
