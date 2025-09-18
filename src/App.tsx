import { useEffect } from "react";
import RouterApp from "./RouterApp";
import supabaseClient from "./lib/supabaseClient";
import { router } from "./routes";

function App() {
	useEffect(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_event, session) => {
			const { pathname } = router.state.location;
			const isAuthPage = ["/auth/signin", "/auth/signup"].includes(
				pathname
			);

			if (session) {
				if (isAuthPage) {
					router.navigate("/");
				}
			} else if (!isAuthPage) {
				router.navigate("/auth/signin");
			}
		});

		return () => subscription.unsubscribe();
	}, []);
	return <RouterApp />;
}

export default App;
