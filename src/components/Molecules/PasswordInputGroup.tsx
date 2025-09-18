import { MdPassword } from "react-icons/md";
import InputForm from "../atoms/InputForm";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonForm from "../atoms/ButtonForm";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";

interface PasswordInputGroupProps {
	isRepeat: boolean;
}

function PasswordInputGroup<T extends FieldValues>({
	isRepeat,
}: PasswordInputGroupProps) {
	const [isShowPassword, setIsShowPassword] = useState(false);

	return (
		<div className="flex flex-col sm:flex-row gap-4 w-full">
			<InputForm<T>
				type={isShowPassword ? "text" : "password"}
				name="password"
				options={{ required: true }}
				Icon={MdPassword}
				placeholder="Contraseña"
			/>

			{isRepeat && (
				<InputForm<T>
					type={isShowPassword ? "text" : "password"}
					name="passwordConfirmation"
					options={{ required: true }}
					Icon={MdPassword}
					placeholder="Repetir contraseña"
				/>
			)}

			<ButtonForm
				onClick={() => setIsShowPassword(!isShowPassword)}
				type="button"
			>
				{isShowPassword ? <FaEyeSlash /> : <FaEye />}
			</ButtonForm>
		</div>
	);
}

export default PasswordInputGroup;
