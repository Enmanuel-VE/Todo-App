import ButtonForm from "../atoms/ButtonForm";
import InputForm from "../atoms/InputForm";
import PasswordInputGroup from "../Molecules/PasswordInputGroup";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";
import { useFormContext, type FieldValues } from "react-hook-form";

interface AuthFormProps<T extends FieldValues> {
	type: "signin" | "signup";
	onSubmit: (data: T) => void;
}

function AuthForm<T extends FieldValues>({ type, onSubmit }: AuthFormProps<T>) {
	const IS_SIGN_UP = type === "signup";

	const { handleSubmit } = useFormContext<T>();

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4 p-4"
		>
			<InputForm
				type="email"
				name={"email"}
				options={{
					required: true,
					pattern: {
						value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
						message: "Correo inválido",
					},
				}}
				Icon={MdEmail}
				placeholder="tuCorreo@sitio.com"
			/>

			<PasswordInputGroup isRepeat={IS_SIGN_UP} />

			<ButtonForm type="submit" className="w-full">
				{IS_SIGN_UP ? "Registrarse" : "Iniciar sesión"}
			</ButtonForm>

			<p>
				{IS_SIGN_UP ? (
					<>
						Si ya tienes una cuenta puedes iniciar sesión{" "}
						<Link to="/auth/signin" className="link text-[#003391]">
							aquí.
						</Link>
					</>
				) : (
					<>
						Si no tienes cuenta eres bienvenida a registrarte{" "}
						<Link to="/auth/signup" className="link text-[#003391]">
							aquí.
						</Link>
					</>
				)}
			</p>
		</form>
	);
}

export default AuthForm;
