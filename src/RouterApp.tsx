import { RouterProvider } from "react-router";
import { router } from "./routes";

const RouterApp = () => {
	return <RouterProvider router={router} />;
};

export default RouterApp;
