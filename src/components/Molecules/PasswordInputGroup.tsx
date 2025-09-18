import { MdPassword } from "react-icons/md";
import InputForm from "../atoms/InputForm";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonForm from "../atoms/ButtonForm";
import { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";

interface PasswordInputGroupProps<T extends FieldValues> {
	isRepeat: boolean;
	passwordName: Path<T>;
	passwordConfirmationName?: Path<T>;
}

function PasswordInputGroup<T extends FieldValues>({
	isRepeat,
	passwordName,
	passwordConfirmationName,
}: PasswordInputGroupProps<T>) {
	const [isShowPassword, setIsShowPassword] = useState(false);

	return (
		<div className="flex flex-col sm:flex-row gap-4 w-full">
			<InputForm<T>
				type={isShowPassword ? "text" : "password"}
				name={passwordName}
				options={{ required: true }}
				Icon={MdPassword}
				placeholder="Contraseña"
			/>

			{isRepeat && passwordConfirmationName && (
				<InputForm<T>
					type={isShowPassword ? "text" : "password"}
					name={passwordConfirmationName}
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
