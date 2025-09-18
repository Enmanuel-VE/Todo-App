import supabaseClient from "../lib/supabaseClient";

function Settings() {
	const handleSignOut = async () => {
		await supabaseClient.auth.signOut();
	};
	return (
		<section className="h-full w-full flex flex-col">
			<header className="flex flex-row justify-center items-center h-[calc(100dvh*1/4)]">
				<h1 className="text-[#003391] text-[clamp(1.5rem,4dvw,2rem)] font-bold">
					Configuración
				</h1>
			</header>
			<div className="flex-1 flex justify-center items-center">
				<button
					onClick={handleSignOut}
					type="button"
					className="btn hover:bg-error text-white bg-[#003491] rounded-2xl transform hover:scale-[115%] hover:shadow-2xl"
				>
					Cerrar sesión
				</button>
			</div>
		</section>
	);
}

export default Settings;
