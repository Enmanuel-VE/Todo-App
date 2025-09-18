import MainLayout from "./layouts/MainLayout";

import NotFoundPage from "./pages/NotFoundPage";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Create from "./pages/Create";
import Home from "./pages/Home";
import { createBrowserRouter } from "react-router";
import AuthTemplate from "./layouts/AuthTemplate";

export const routes = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "create",
				element: <Create />,
			},
			{
				path: "settings",
				element: <Settings />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthTemplate />,
		children: [
			{ path: "signin", element: <SignIn /> },
			{ path: "signup", element: <SignUp /> },
		],
	},
];

export const router = createBrowserRouter(routes);
