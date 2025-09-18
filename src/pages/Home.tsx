import { type PostgrestResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import supabaseClient from "../lib/supabaseClient";
import { CgSpinner } from "react-icons/cg";

export interface TodoType {
	id: UUIDType;
	title: string;
	category: string;
	date: Date;
	is_important: boolean;
	is_completed: boolean;
	is_deleted: boolean;
	created_at: Date;
	user_id: string;
	description: string;
}

function Home() {
	const [todos, setTodos] = useState<TodoType[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [numberTasksCompleted, setNumberTasksCompleted] = useState(0);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const { data } = await supabaseClient.auth.getUser();

				if (!data.user) return;

				const {
					data: todosData,
					error: todosError,
				}: PostgrestResponse<TodoType> = await supabaseClient
					.from("todo")
					.select("*")
					.eq("user_id", data.user.id);

				if (todosError) {
					console.error("Error fetching todos:", todosError);
				} else {
					setTodos(todosData);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTodos();
	}, []);

	const currentDate = new Date();
	const formattedDate = new Intl.DateTimeFormat("es-VE", {
		day: "numeric",
		month: "long",
	}).format(currentDate);

	const Loading = () => {
		return (
			<div className="flex flex-col justify-center items-center h-full w-full">
				<div className="flex flex-col justify-center items-center gap-4">
					<CgSpinner className="animate-spin w-10 h-10 text-[#003391]" />
					<p className="text-[rgba(0,51,145,0.65)]">cargando...</p>
				</div>
			</div>
		);
	};

	return (
		<section className="flex flex-col h-full w-full">
			<header className="shrink-0 flex flex-col relative h-[calc(100dvh*1/4)] overflow-hidden">
				<div className="absolute h-full w-[65%] md:hidden bg-[#003391]"></div>
				<div className="absolute h-full w-[40%] md:hidden bg-[#003391] rounded-br-[55%] left-[60%]"></div>

				<div className="flex flex-col justify-center w-full h-full p-4 z-1">
					<div className="flex flex-col">
						<h1 className="md:text-[#003391] text-white  text-2xl md:text-[clamp(0.5rem,3dvw,2rem)] font-bold">
							Hoy: {formattedDate}
						</h1>
						<p className="md:text-[rgba(0,51,145,0.8)] text-[rgba(255,255,255,0.8)] md:max-w-[40dvw] max-w-[50dvw] text-[1rem] md:text-[clamp(0.5rem,2.5dvw,1.5rem)]">
							{numberTasksCompleted} de{" "}
							{todos ? todos.length : "0"} tareas terminadas
						</p>
					</div>
				</div>
			</header>

			<div className="flex-1 flex flex-col-reverse gap-4 p-4">
				{isLoading ? (
					<Loading />
				) : !todos ? null : todos.length === 0 ? (
					<div>No tienes todos todavía</div>
				) : (
					todos.map((todo) => (
						<TaskCard
							setNumberTasksCompleted={setNumberTasksCompleted}
							isCompleted={todo.is_completed}
							title={todo.title}
							date={todo.date}
							isImportant={todo.is_important}
							category={todo.category}
							key={todo.id}
						/>
					))
				)}
			</div>
		</section>
	);
}

export default Home;
