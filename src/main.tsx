import "./styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const ROOT = document.getElementById("root");

if (!ROOT) throw new Error("Root element not found");

createRoot(ROOT).render(
	<StrictMode>
		<App />
	</StrictMode>
);
