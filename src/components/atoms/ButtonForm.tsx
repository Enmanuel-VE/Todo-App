import type { ReactNode } from "react";

interface Props {
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type: "submit" | "reset" | "button" | undefined;
	children: ReactNode;
}

function ButtonForm({ children, ...props }: Props) {
	return (
		<button
			type={props.type}
			{...(props.onClick && { onClick: props.onClick })}
			className={`btn bg-[#003391] h-auto p-4 text-white rounded-2xl ${
				!props.className ? props.className : ""
			}`}
		>
			{children}
		</button>
	);
}

export default ButtonForm;
