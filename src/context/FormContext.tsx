import { createContext, useContext } from "react";
import type { UseFormReturn } from "react-hook-form";

export const FormContext = createContext<UseFormReturn | null>(null);

export const useFormContext = () => {
	const ctx = useContext(FormContext);
	if (!ctx) throw new Error("FormContext not found");
	return ctx;
};
