import { useState } from "react";
import { BiTrash } from "react-icons/bi";

type props = {
	setNumberTasksCompleted: React.Dispatch<React.SetStateAction<number>>;
	isImportant: boolean;
	category: string;
	title: string;
	date: Date;
	isCompleted: boolean;
};

function TaskCard(props: props) {
	const [isCompleted, setIsCompleted] = useState(props.isCompleted);

	const handleCompletedTask = () => {
		setIsCompleted(!isCompleted);
		props.setNumberTasksCompleted((prev) =>
			isCompleted ? prev - 1 : prev + 1
		);
	};

	const date = new Date(props.date);

	const formatDate = date.toLocaleDateString("es-VE", {
		day: "2-digit",
		month: "2-digit",
	});

	const formatTime = date.toLocaleTimeString("es-VE", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	return (
		<article className="flex flex-row bg-[#ffffff] border-t border-t-gray-200 shadow-lg justify-between p-4 rounded-2xl">
			<div className="flex flex-row gap-4">
				<div className="flex flex-col gap-2">
					<header>
						<h2
							className={`
								${isCompleted ? "line-through" : ""} 
								${isCompleted ? "text-gray-500" : "text-[#003491]"} 

								
								text-lg font-bold`}
						>
							{props.title}
						</h2>
						<p className="flex flex-row gap-2 text-sm text-gray-500">
							{formatDate} a las {formatTime}
						</p>
					</header>

					<div className="flex flex-row gap-2">
						<div
							className={`cursor-default font-medium rounded-2xl ${
								isCompleted
									? "bg-gray-300"
									: "bg-blue-400 text-white"
							} py-1 px-3`}
						>
							{props.category}
						</div>
						{props.isImportant ? (
							<div
								className={`cursor-default font-medium rounded-2xl ${
									isCompleted
										? "bg-gray-300"
										: "bg-error text-white"
								} py-1 px-3`}
							>
								Importante
							</div>
						) : null}
					</div>
				</div>
			</div>

			<div className="flex flex-col h-full justify-between gap-4 items-center">
				<input
					onClick={handleCompletedTask}
					id="toggleCheck"
					type="checkbox"
					className="checkbox peer"
				/>

				<label className="transition-opacity duration-150 opacity-0 pointer-events-none peer-checked:pointer-events-auto peer-checked:opacity-100">
					<button
						type="button"
						className="hover:text-red-900 cursor-pointer"
					>
						<BiTrash className="w-6 h-6" />
					</button>
				</label>
			</div>
		</article>
	);
}

export default TaskCard;
