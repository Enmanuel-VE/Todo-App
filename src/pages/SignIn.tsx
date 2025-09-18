import supabaseClient from "../lib/supabaseClient";
import { useCallback } from "react";
import AuthForm from "../components/organisms/AuthForm";
import { useForm, FormProvider } from "react-hook-form";
import type { Credentials } from "../types/Auth";

function SignIn() {
	const methods = useForm<Credentials>();

	const onSubmit = useCallback(async (dataForm: Credentials) => {
		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: dataForm.email,
			password: dataForm.password,
		});

		console.log(dataForm, data, error);
	}, []);

	return (
		<FormProvider {...methods}>
			<AuthForm type="signin" onSubmit={onSubmit} />
		</FormProvider>
	);
}

export default SignIn;
