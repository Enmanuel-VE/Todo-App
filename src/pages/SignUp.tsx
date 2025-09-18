import supabaseClient from "../lib/supabaseClient";
import { useCallback } from "react";
import AuthForm from "../components/organisms/AuthForm";
import { FormProvider, useForm } from "react-hook-form";
import type { SignUpCredentials } from "../types/Auth";

function SignUp() {
	const methods = useForm<SignUpCredentials>();

	const onSubmit = useCallback(async (dataForm: SignUpCredentials) => {
		await supabaseClient.auth.signUp({
			email: dataForm.email,
			password: dataForm.password,
		});
	}, []);

	return (
		<FormProvider {...methods}>
			<AuthForm type="signup" onSubmit={onSubmit} />
		</FormProvider>
	);
}

export default SignUp;
