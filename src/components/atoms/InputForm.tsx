import {
	useFormContext,
	type FieldValues,
	type RegisterOptions,
	type Path,
} from "react-hook-form";
import type { IconType } from "react-icons";

interface InputFormProps<T extends FieldValues> {
	type: string;
	placeholder: string;
	Icon: IconType;
	name: Path<T>;
	options?: RegisterOptions<T, Path<T>>;
}

function InputForm<T extends FieldValues>({
	type,
	placeholder,
	Icon,
	name,
	options,
}: InputFormProps<T>) {
	const { register } = useFormContext<T>();

	return (
		<label className="flex flex-row w-full input border-0 border-t border-t-gray-200 shadow-lg p-4 h-auto rounded-2xl">
			<span className="label cursor-pointer">
				<Icon />
			</span>
			<input
				type={type}
				placeholder={placeholder}
				{...register(name, options)}
			/>
		</label>
	);
}

export default InputForm;
